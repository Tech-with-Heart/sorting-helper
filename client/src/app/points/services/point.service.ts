import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Point } from '../models/point.model';
import { PointDTO } from '../models/point.dto';
import { PointMapper } from '../mappers/point.mapper';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  constructor(private http: HttpClient) {}

  getPoints(): Observable<Point[]> {
    return this.http.get<PointDTO[]>('/api/points').pipe(
      map(dtos => dtos.map(PointMapper.fromDTO)),
      map(dtos => dtos.filter(point => !!point))
    );
  }
}
