export enum PointType {
  Batteries = 'batteries',
  Pills = 'pills',
  General = 'general',
  Electronics = 'electronics',
  Clothes = 'clothes'
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
