import { ParcelDto } from "./types";
import { Shipment } from "./Shipment";

export class Client {
  requestShipment(options: ParcelDto): string {
    const shipment = new Shipment(options);

    return shipment.ship();
  }
}