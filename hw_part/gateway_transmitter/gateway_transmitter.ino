#include <Arduino.h>
#include <EEPROM.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>  
#include <ESP8266HTTPClient.h>
#include "websites.h"

const char* serverAddress = "http://192.168.1.102:8081/api/request";
volatile bool tryConnectFlag = false;
bool isWifiConnected = false;

struct __attribute__((packed)) PacketFromButton {
  int batteryLevel;
  int button;
  uint8_t deviceAddress[6];
  uint8_t gatewayAddress[6];
};

AsyncWebServer server(80);

String ssid = "";
String password = "";

byte serial_buffer[sizeof(PacketFromButton)];
int pos = 0;

void notFound(AsyncWebServerRequest *request) {
  request->send(404, "text/plain", "Not found");
}

void blinkLed() {
  digitalWrite(D4, !digitalRead(D4));
}

void saveCredentials(const String& name, const String& password) {
  int addr = 0;
  for (int i = 0; i < name.length(); i++) {
    EEPROM.write((addr++) % 512, name[i]);
  }
  EEPROM.write((addr++) % 512, '\0');
  
  for (int i = 0; i < password.length(); i++) {
    EEPROM.write((addr++) % 512, password[i]);
  }
  EEPROM.write((addr++) % 512, '\0');
  EEPROM.commit();    
}

void readCredentials(String& name, String& password) {
  int addr = 0;
 
  char temp = char(EEPROM.read(addr++));
  while (temp != '\0') {
    name += temp;
    temp = char(EEPROM.read(addr++));
  }
  temp = char(EEPROM.read(addr++));
  while (temp != '\0') {
    password += temp;
    temp = char(EEPROM.read(addr++));
  }
}

bool connectToWiFi(const String& ssid, const String& password) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  isWifiConnected = WiFi.waitForConnectResult() == WL_CONNECTED;
  return isWifiConnected;
}

// If Wifi does not exist or entered password is wrong, 
// AP is created. It can be used to set Wifi credentials
void startServer() {
  WiFi.mode(WIFI_AP_STA); 
  IPAddress ip(192, 168, 1, 1);
  IPAddress gateway(192, 168, 1, 1);
  IPAddress subnet(255, 255, 255, 0);
  WiFi.softAPConfig(ip, gateway, subnet);
  WiFi.softAP("gateway", "password");
  
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html);
  });

  server.on("/wifi", HTTP_GET, [] (AsyncWebServerRequest *request) {
    if (!request->hasParam("password") || !request->hasParam("name")) {
      request->redirect("/error");
      return;
    }
    
    String name = request->getParam("name")->value();
    String password = request->getParam("password")->value();

    saveCredentials(name, password);
    
    tryConnectFlag = true;
    
    request->send_P(200, "text/html", ok_html);
  });
  
  server.onNotFound(notFound);
  server.begin();
}

String convertMacToString(const uint8_t mac[6]) {
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
    mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  return String(macStr);

}

void sendPostRequest(const PacketFromButton& packet) {
  HTTPClient http; 

  http.begin(serverAddress); 
  String payload = "{\
    \"batteryLevel\": " + String(packet.batteryLevel) + ",\
    \"button\": " + String(packet.button) + ",\
    \"deviceAddress\": \"" + convertMacToString(packet.deviceAddress) + "\",\
    \"gatewayAddress\": \"" + convertMacToString(packet.gatewayAddress) + "\"\
  }";
  
  http.addHeader("Content-Type", "application/json");
  http.POST(payload); 

  http.end();
}

void setup() {
  EEPROM.begin(512); 
  readCredentials(ssid, password);

  pinMode(D4, OUTPUT);
    
  Serial.begin(115200);
  
  if (ssid.length() == 0 || password.length() == 0) {
    startServer();
    return;
  }

  if (!connectToWiFi(ssid, password)) {
    startServer();
    return;
  }
}

void loop() {
  if (!isWifiConnected) {
    if (!tryConnectFlag) {
      return;
    }
    delay(1);
    tryConnectFlag = false;
    readCredentials(ssid, password);
    connectToWiFi(ssid, password);
  }

  WiFi.softAPdisconnect(true);
  server.end();

  while (true) {
    if(Serial.available() > 0) {
      serial_buffer[pos++] = Serial.read();
      
      if (pos == sizeof(PacketFromButton)) {    
        pos = 0;
        PacketFromButton* data = (PacketFromButton*) serial_buffer;
        
        blinkLed();
        sendPostRequest(*data);
      }
    }
  }
}
