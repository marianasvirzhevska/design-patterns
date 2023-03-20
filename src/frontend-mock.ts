import { ParcelCodes } from "./types";
import { Client } from "./client";

const client = new Client();

const codes1 = [ParcelCodes.Fragile];
const codes2 = [ParcelCodes.Fragile, ParcelCodes.DoNotLeave];
const codes3 = [ParcelCodes.Fragile, ParcelCodes.DoNotLeave, ParcelCodes.ReturnReceiptRequested];

const simpleShipment = client.requestShipment({
  weight: 21,
  fromAddress: '12292 4th Ave SE, Bellevue, Wa',
  fromZipCode: '92021',
  toAddress: '1313 Mockingbird Lane, Tulsa, OK',
  toZipCode: '67721',
});

const shipment1 = client.requestShipment({
  shipmentID: 12245,
  weight: 4,
  fromAddress: '12292 4th Ave SE, Bellevue, Wa',
  fromZipCode: '12021',
  toAddress: '1313 Mockingbird Lane, Tulsa, OK',
  toZipCode: '67721',
  }, codes1);

const shipment2 = client.requestShipment({
  shipmentID: 92985,
  weight: 14,
  fromAddress: '42292 4th Ave SE, Bellevue, Wa',
  fromZipCode: '12021',
  toAddress: '1313 Mockingbird Lane, Tulsa, OK',
  toZipCode: '67721',
  }, codes2);

const shipment3 = client.requestShipment({
  shipmentID: 54345,
  weight: 40,
  fromAddress: '52292 4th Ave SE, Bellevue, Wa',
  fromZipCode: '12021',
  toAddress: '1313 Mockingbird Lane, Tulsa, OK',
  toZipCode: '67721',
  }, codes3);

console.log('Results', {simpleShipment, shipment1, shipment2, shipment3});
