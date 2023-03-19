import { Client } from "./Client";

const client = new Client();

client.requestShipment({
  weight: 21,
  fromAddress: '12292 4th Ave SE, Bellevue, Wa',
  fromZipCode: '92021',
  toAddress: '1313 Mockingbird Lane, Tulsa, OK',
  toZipCode: '67721',
});
