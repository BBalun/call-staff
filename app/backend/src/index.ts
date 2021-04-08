import express from "express";
import cors from "cors";
import { prisma } from "./db/prisma";
import { delay } from "./utils/delay";

const PORT = 8081;

let new_unknown_device_flag = false;
let new_unknown_device_address: string | null = null;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("index");
});

app.get("/devices", async (req, res) => {
  const devices = await prisma.device.findMany();
  res.json(devices);
});

app.get("/device/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ status: "error", msg: "parameter id is missing" });
  }

  const device = await prisma.device.findUnique({
    where: {
      id,
    },
  });

  res.json(device);
});

// create new device
app.post("/device", async (req, res) => {
  const { name } = req.body;
  const timeout = 10;
  new_unknown_device_flag = true;

  for (let i = 0; i < timeout; i++) {
    await delay(1000);

    if (new_unknown_device_address) {
      await prisma.device.create({
        data: {
          mac_address: new_unknown_device_address,
          name,
        },
      });
      new_unknown_device_address = null;
      new_unknown_device_flag = false;
      return res.status(201).json({ status: "ok" });
    }
  }

  new_unknown_device_address = null;
  new_unknown_device_flag = false;
  return res.json({ status: "error", msg: "device was not found" });
});

app.get("/calls", async (req, res) => {
  const calls = await prisma.call.findMany();
  return res.json(calls);
});

app.post("/call", async (req, res) => {
  // console.log(req.body);
  const { batteryLevel, button, deviceAddress, gatewayAddress } = req.body; // TODO validation

  const device = await prisma.device.findUnique({
    select: {
      id: true,
    },
    where: {
      mac_address: deviceAddress,
    },
  });

  if (!device && new_unknown_device_flag) {
    new_unknown_device_address = deviceAddress;
    return res.status(200).end();
  }

  if (!device) {
    return res.status(401).end();
  }

  await prisma.call.create({
    data: {
      battery_level: batteryLevel,
      button,
      device_id: device.id,
    },
  });

  res.status(201).end();
});

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

process.on("exit", (code) => {
  prisma.$disconnect();
});
