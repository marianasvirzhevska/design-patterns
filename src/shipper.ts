import {
  Parcel,
  ParcelType,
  AirEastPrices,
  ChicagoSprintPrices,
  PacificParcelPrices,
} from "./types";

const getParcelType = (parcel: Parcel): ParcelType => {
  if (parcel.weight <= 15) return ParcelType.letters;
  if (parcel.weight > 15 && parcel.weight <= 160) return ParcelType.packages;

  return ParcelType.oversize;
};

abstract class Shipper {
  protected priceModifier: number;

  getCost(parcel: Parcel): number {
    return parcel.weight * this.priceModifier;
  }
}

class AirEastShipper extends Shipper {
  protected priceModifier = AirEastPrices.letters;

  getCost(parcel: Parcel): number {
    const parcelType = getParcelType(parcel);

    switch (parcelType) {
      case ParcelType.letters:
        return super.getCost(parcel);
      case ParcelType.packages:
        return parcel.weight * AirEastPrices.packages;
      case ParcelType.oversize:
        return super.getCost(parcel) + AirEastPrices.oversize;
    }
  }
 };

class PacificParcelShipper extends Shipper {
  protected priceModifier = PacificParcelPrices.letters;

  getCost(parcel: Parcel): number {
    const parcelType = getParcelType(parcel);

    switch (parcelType) {
      case ParcelType.letters:
        return super.getCost(parcel);
      case ParcelType.packages:
        return parcel.weight * ChicagoSprintPrices.packages;
      case ParcelType.oversize:
        return super.getCost(parcel) + parcel.weight * ChicagoSprintPrices.oversize;
    }
  }
};

class ChicagoSprintShipper extends Shipper {
  protected priceModifier = ChicagoSprintPrices.letters;

  getCost(parcel: Parcel): number {
    const parcelType = getParcelType(parcel);

    switch (parcelType) {
      case ParcelType.letters:
        return super.getCost(parcel);
      case ParcelType.packages:
        return parcel.weight * ChicagoSprintPrices.packages;
      case ParcelType.oversize:
        return ChicagoSprintPrices.oversize;
    }
  }
};

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
