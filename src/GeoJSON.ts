export class GeoJSON implements IType {
  type: string;
  features: GeoFeature[]
}

export class GeoFeature implements IType {
  geometry: Geometry[];
  properties: {
    childNum: number;
    cp: GeoPosition;
    id: string;
    size: string;
  }
  type: string;
}

export class Geometry implements IType {
  type: string;
  coordinates: GeoArea[]
}

export type GeoArea = GeoPosition[] // 区域
export type GeoPosition = [number, number]  // 经纬度坐标

interface IType {
  type: string;
}