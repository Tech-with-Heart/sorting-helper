export enum PointType {
  'batteries',
  'pills',
  'general',
  'electronics',
  'clothes'
}

export class Point {
  constructor(
    // todo: change accessors
    public address: string,
    public description: string,
    public latitude: number,
    public longitude: number,
    public pointType: PointType
  ) {}
}
