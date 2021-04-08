#include <SoftwareSerial.h>

#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266HTTPClient.h>

const char* serverAddress = "http://192.168.1.119:8081/call";

const char* ssid     = "balu";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "16balu11";     // The password of the Wi-Fi network

// SoftwareSerial mySerial(D1, D2);

struct __attribute__((packed)) PacketFromButton
{
  int batteryLevel;
  int button;
  uint8_t deviceAddress[6];
  uint8_t gatewayAddress[6];
};

void setup() {
  pinMode(D4, OUTPUT);
  
  // blink built in led
  blinkLed();
    
  Serial.begin(115200);
  // mySerial.begin(115200);

  // Serial.println("starting");
  
  WiFi.begin(ssid, password);             // Connect to the network
  // Serial.print("Connecting to ");
  // Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    // Serial.print(++i); Serial.print(' ');
  }

  // Serial.println('\n');
  // Serial.println("Connection established!");  
  // Serial.print("IP address:\t");
  // Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer

  
}

byte serial_buffer[sizeof(PacketFromButton)];
int pos = 0;

String convertMacToString(const uint8_t mac[6])
{
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
    mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  return String(macStr);

}

void sendPostRequest(const PacketFromButton& packet)
{
  HTTPClient http;  //Declare an object of class HTTPClient

  http.begin(serverAddress);  //Specify request destination
  String payload = "{\
    \"batteryLevel\": " + String(packet.batteryLevel) + ",\
    \"button\": " + String(packet.button) + ",\
    \"deviceAddress\": \"" + convertMacToString(packet.deviceAddress) + "\",\
    \"gatewayAddress\": \"" + convertMacToString(packet.gatewayAddress) + "\"\
  }";
  
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(payload);  //Send the request

  if (httpCode > 0) { //Check the returning code
    String payload = http.getString();   //Get the request response payload
    // Serial.println(payload);             //Print the response payload
  }

  http.end();   //Close connection
}

void printDebugDataToSerial(const PacketFromButton& packet)
{
  Serial.println("data received over serial");
  Serial.print("battery  level: ");
  Serial.println(packet.batteryLevel);
  Serial.print("button num: ");
  Serial.println(packet.button);
  Serial.print("button address: ");
  for (int i = 0; i < 6; i++)
  {
    Serial.print(packet.deviceAddress[i]);  
    Serial.print(" ");
  }
  Serial.println();
  Serial.print("gateway address: ");
  for (int i = 0; i < 6; i++)
  {
    Serial.print(packet.gatewayAddress[i]);
    Serial.print(" ");
   }
  Serial.println();
}

void blinkLed()
{
  // blink built in led
  digitalWrite(D4, !digitalRead(D4));
}

void loop() {
  // if(mySerial.available() > 0)
  if(Serial.available() > 0)
  {
      // serial_buffer[pos++] = mySerial.read();
      serial_buffer[pos++] = Serial.read();
      
      if (pos == sizeof(PacketFromButton))   
      {    
        pos = 0;
        PacketFromButton* data = (PacketFromButton*) serial_buffer;
        
        blinkLed();
        sendPostRequest(*data);
        // printDebugDataToSerial(*data);
      }
  }
}
