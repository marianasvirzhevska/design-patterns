import { ParcelDto, ParcelCodes } from "./types";
import { Shipment, ShipmentCreator } from "./shipment";

export class Client {
  requestShipment(options: ParcelDto, codes?: ParcelCodes[]): string {
    const shipment = ShipmentCreator.getShipment(options, codes)

    return shipment.ship();
  }
}
