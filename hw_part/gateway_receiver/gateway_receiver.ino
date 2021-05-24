#include <ESP8266WiFi.h>
#include <espnow.h>

uint8_t newMACAddress[] = {0xEC, 0xFA, 0xBC, 0x0E, 0xA2, 0xFF};

struct __attribute__((packed)) PacketFromButton {
  int batteryLevel;
  int button;
};

struct __attribute__((packed)) PacketToServer {
  int batteryLevel;
  int button;
  uint8_t deviceAddress[6];
  uint8_t gatewayAddress[6];
};

void blinkLed() {
  digitalWrite(D4, !digitalRead(D4));
}

void dataReceived(uint8_t *senderMac, uint8_t *data, uint8_t dataLength) {
  PacketFromButton packet;  
  memcpy(&packet, data, sizeof(packet));

  PacketToServer temp;

  temp.batteryLevel = packet.batteryLevel;
  temp.button = packet.button;
  memcpy(&temp.deviceAddress, senderMac, sizeof(temp.deviceAddress));
  memcpy(&temp.gatewayAddress, newMACAddress, sizeof(newMACAddress));

  Serial.write((byte*) &temp, sizeof(PacketToServer));
  blinkLed();
}
 
void setup() {    
  pinMode(D4, OUTPUT);
  digitalWrite(D4, HIGH);
  
  Serial.begin(115200);
  delay(5000);

  wifi_set_macaddr(STATION_IF, &newMACAddress[0]);

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();     

  if(esp_now_init() != 0) {
    ESP.restart();
    return;
  }

  esp_now_register_recv_cb(dataReceived);   
}

void loop() { }
