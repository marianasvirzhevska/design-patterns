import { Parcel, ParcelDto } from "./types";
import { ShipperCreator } from "./shipper";

export class Shipment {
  private parcel: Parcel;
  private static idCounter = 0;

  constructor(options: ParcelDto) {
    this.parcel = {
      ...options,
      shipmentID: options.shipmentID || this.getShipmentID(),
    };
  }

  getInstance(): Parcel {
    return this.parcel;
  }

  getShipmentID(): number {
    return Shipment.idCounter++;
  }

  ship(): string {
    const { shipmentID, fromAddress, toAddress } = this.parcel;
    const shipper = ShipperCreator.createShipper(this.parcel);

    return `Shipment with the ID ${shipmentID} will be picked up from ${fromAddress} to ${toAddress} \n\n
      Cost = ${shipper.getCost(this.parcel)}`;
  }
}
