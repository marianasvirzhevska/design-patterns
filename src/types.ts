export interface ParcelDto {
  shipmentID?: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
};

export interface Parcel {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
};

export enum ParcelType {
  letters = 'Letters',
  packages = 'Packages',
  oversize = 'Oversize'
};

export enum AirEastPrices {
  letters = 0.39,
  packages = 0.25,
  oversize = 10
};

export enum ChicagoSprintPrices {
  letters = 0.42,
  packages = 0.20,
  oversize = 0
};

export enum PacificParcelPrices {
  letters = 0.51,
  packages = 0.19,
  oversize = 0.02
}