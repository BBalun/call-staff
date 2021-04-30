#include <ESP8266WiFi.h>
#include <espnow.h>

// EC:FA:BC:0E:AB:DD

#define MY_ROLE ESP_NOW_ROLE_CONTROLLER  // set the role of this device: CONTROLLER, SLAVE, COMBO
#define RECEIVER_ROLE ESP_NOW_ROLE_SLAVE // set the role of the receiver
#define WIFI_CHANNEL 1

#define BUTTON_PIN1 D2 // D0 does not have pull up resistor, it has pull down resistor instead
#define BUTTON_PIN2 D5
#define MOSFET_PIN D1
#define LED D4

#define BATTERY_MAX_VOLTAGE 4.2
#define BATTERY_MIN_VOLTAGE 3.6

// EC:FA:BC:0E:88:FF
// {0xEC, 0xFA, 0xBC, 0x0E, 0x88, 0xFF}
uint8_t receiverAddress[] = {0xEC, 0xFA, 0xBC, 0x0E, 0xA2, 0xFF}; // please update this with the MAC address of the receiver

struct __attribute__((packed)) dataPacket
{
  int batteryLevel;
  int button;
};

bool wait = true;

void transmissionComplete(uint8_t *receiver_mac, uint8_t transmissionStatus)
{
  if (transmissionStatus == 0)
  {
    
  }

  wait = false;
}

void setup()
{
  pinMode(MOSFET_PIN, OUTPUT);
  digitalWrite(MOSFET_PIN, LOW); // turns mosfet on

  pinMode(BUTTON_PIN1, INPUT_PULLUP);
  pinMode(BUTTON_PIN2, INPUT_PULLUP);

  int button = -1;
  if (digitalRead(BUTTON_PIN1) == LOW)
  {
    button = 1;
  } else if (digitalRead(BUTTON_PIN2) == LOW)
  {
    button = 2;
  }

  pinMode(LED, OUTPUT); // TODO remove
  digitalWrite(LED, LOW);
  pinMode(A0, INPUT);

  auto rawVoltage = analogRead(A0) / 1023.0;
  auto realVoltage = rawVoltage * 5.3;
  int batteryLevel = ((realVoltage - BATTERY_MIN_VOLTAGE) / (BATTERY_MAX_VOLTAGE - BATTERY_MIN_VOLTAGE)) * 100;

  dataPacket packet = { batteryLevel, button };
   
  // WiFi.setOutputPower(10); // sets output power in mW
  WiFi.mode(WIFI_STA);
  WiFi.disconnect(); // we do not want to connect to a WiFi network

  if (esp_now_init() != 0)
  {
    ESP.restart();
  }

  esp_now_set_self_role(MY_ROLE);
  esp_now_register_send_cb(transmissionComplete); // this function will get called once all data is sent
  esp_now_add_peer(receiverAddress, RECEIVER_ROLE, WIFI_CHANNEL, NULL, 0);  

  int ress = esp_now_send(receiverAddress, (uint8_t *)&packet, sizeof(packet));

//  if (ress == 0)
//  {
//    Serial.println("esp now send ok");
//  }
//  else
//  {
//    Serial.println("transmission failed");
//  }
  

    while (wait) 
    {
      yield();
    }
    
    ESP.deepSleep(0); // turn off mosfet
}


void loop() {}

