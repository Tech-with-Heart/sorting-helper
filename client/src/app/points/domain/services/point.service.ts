import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PointApiService } from '../../data-access/services/point-api.service';
import { Point, PointType } from '../models/point.model';
import { PointsStore } from '../store/point.store';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  constructor(
    private pointsApiService: PointApiService,
    private pointsStore: PointsStore
  ) {}

  getPoints(): Observable<Point[]> {
    if (this.pointsStore.hasPoints()) {
      return of(this.pointsStore.getPoints());
    }

    return this.pointsApiService.getAllPoints().pipe(
      tap((points) => this.pointsStore.setPoints(points))
    );
  }

  getFilteredPoints(type: PointType): Observable<Point[]> {
    return this.getPoints().pipe(
      map(points => points.filter(point => point.pointType === type))
    );
  }
}