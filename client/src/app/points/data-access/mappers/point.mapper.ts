import { PointDTO } from '../models/point.dto';
import { Point, PointType } from '../../domain/models/point.model';

export class PointMapper {
  private static getPointType(pointType: string): PointType {
    if (!Object.values(PointType).includes(pointType)) {
      throw Error(`Could not parse point, no such pointType ${pointType}`);
    }

    return PointType[pointType as keyof typeof PointType];
  }

  static fromDTO(dto: PointDTO): Point | null {
    try {
      const pointType = PointMapper.getPointType(dto.pointType);

      return new Point(
        dto.address,
        dto.description,
        dto.latitude,
        dto.longitude,
        pointType
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
