import { Parcel } from "./types";

abstract class Shipper {
  protected priceModifier: number;

  getCost(parcel: Parcel): number {
    return parcel.weight * this.priceModifier;
  }
}

class AirEastShipper extends Shipper {
  protected priceModifier = 0.39;
}

class PacificParcelShipper extends Shipper {
  protected priceModifier = 0.51;
}

class ChicagoSprintShipper extends Shipper {
  protected priceModifier = 0.42;
}

export class ShipperCreator {
  static createShipper(parcel: Parcel) {
    const code = parseFloat(parcel.fromZipCode[0]);

    if ([4, 5, 6].includes(code)) {
      return new ChicagoSprintShipper();
    }

    if ([7, 8, 9].includes(code)) {
      return new PacificParcelShipper();
    }

    return new AirEastShipper();
  }
}

