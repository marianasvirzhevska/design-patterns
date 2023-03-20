import { Parcel, ParcelDto, ParcelCodes } from "./types";
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
    return Shipment.idCounter + 1;
  }

  ship(): string {
    const { shipmentID, fromAddress, toAddress } = this.parcel;
    const shipper = ShipperCreator.createShipper(this.parcel);

    return `Shipment with the ID ${shipmentID} will be picked up from ${fromAddress} to ${toAddress}\nCost = ${shipper.getCost(this.parcel)}`;
  }
};

abstract class ShipmentDecorator {
  protected shipment: Shipment;

  constructor(shipment: Shipment) {
    this.shipment = shipment;
  }

  public ship() {
    return this.shipment.ship();
  };
}

class FragileShipment extends ShipmentDecorator {
  public ship() {
    return this.shipment.ship() + `\n**${ParcelCodes.Fragile.toLocaleUpperCase()}**`;
  };
}

class DoNotLeaveShipment extends ShipmentDecorator {
  public ship() {
    return this.shipment.ship() + `\n**${ParcelCodes.DoNotLeave.toLocaleUpperCase()}**`;
  };
}

class ReturnReceiptRequestedShipment extends ShipmentDecorator {
  public ship() {
    return this.shipment.ship() + `\n**${ParcelCodes.ReturnReceiptRequested.toLocaleUpperCase()}**`;
  };
}

export class ShipmentCreator {
  static getShipment(options: ParcelDto, codes?: ParcelCodes[]) {
    const simpleShipment = new Shipment(options);

    if (!codes) return simpleShipment;

    return codes.reduce((acc: any, curr: ParcelCodes) => {
      switch (curr) {
        case ParcelCodes.Fragile:
          return new FragileShipment(acc);
        case ParcelCodes.DoNotLeave:
          return new DoNotLeaveShipment(acc);
        case ParcelCodes.ReturnReceiptRequested:
          return new ReturnReceiptRequestedShipment(acc);
        default:
          return acc;
      }
    }, simpleShipment);
  }
}
