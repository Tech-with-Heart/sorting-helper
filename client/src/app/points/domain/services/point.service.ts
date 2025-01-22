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
      console.log("from store")
      return of(this.pointsStore.getPoints());
    }

    console.log("from api")
    return this.pointsApiService.getAllPoints().pipe(
      tap((points) => this.pointsStore.setPoints(points))
    );
  }

  getFilteredPoints(type: PointType): Observable<Point[]> {
    console.log(type)
    return this.getPoints().pipe(
      map(points => points.filter(point => point.pointType === type))
    );
  }
}