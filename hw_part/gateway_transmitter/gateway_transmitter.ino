#include <Arduino.h>
#include <EEPROM.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>  
#include <ESP8266HTTPClient.h>

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

const char ok_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trying to connect</title>
  </head>
  <body>
    <p>Trying to connect... Wait until LED on gateway turns on</p>
  </body>
</html>)rawliteral";

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WiFi credentials</title>
    <style>
      body {
        padding: 0;
        margin: 0;
        font-size: 18px;
        font-family: Verdana;
      }

      main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }

      form {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 1rem;
        width: 365px;
      }

      input {
        line-height: 1.2rem;
        padding: 0.4rem;
        margin: 0.3rem 0;
        border-width: 0;
        border-radius: 0.4rem;
        background-color: rgba(250, 250, 250, 1);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
      }

      button {
        background-color: #007bff;
        color: white;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
      }

      label {
        font-size: 1rem;
        display: inline-block;
        margin-bottom: 0.5rem;
      }
      .form-group {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
    </style>
  </head>
  <body>
    <main>
      <form action="/wifi" method="get" class="container">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="Enter WiFi name" />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" placeholder="Enter WiFi password" />
        </div>

        <button type="submit">Save</button>
      </form>
    </main>
  </body>
</html>
)rawliteral";

void ledOn() {
  digitalWrite(D4, LOW);
}

void ledOff() {
  digitalWrite(D4, HIGH);
}

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
  EEPROM.commit();    //Store data to EEPROM
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

//bool isWifiConnected() {
////  return WiFi.status() == WL_CONNECTED;
//  return isWifiConnected;
//}

void setup() {
  EEPROM.begin(512); 
  readCredentials(ssid, password);

  pinMode(D4, OUTPUT);
  ledOff();
    
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
  int httpCode = http.POST(payload); 

//  if (httpCode > 0) { 
//    String payload = http.getString();   //Get the request response payload
//    // Serial.println(payload);             //Print the response payload
//  }

  http.end();
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

  ledOn();
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
