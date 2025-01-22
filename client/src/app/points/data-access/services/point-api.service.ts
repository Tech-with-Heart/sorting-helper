import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Point } from '../../domain/models/point.model';
import { PointDTO } from '../models/point.dto';
import { PointMapper } from '../mappers/point.mapper';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointApiService {
  constructor(private http: HttpClient) {}

  getAllPoints(): Observable<Point[]> {
    return this.http.get<PointDTO[]>(`${environment.pointApiUrl}/point`).pipe(
      map(dtos => dtos.map(PointMapper.fromDTO)),
      map(dtos => dtos.filter(point => !!point))
    );
  }
}
