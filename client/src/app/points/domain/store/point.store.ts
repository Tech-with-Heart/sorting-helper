import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Point } from '../models/point.model';

@Injectable({
  providedIn: 'root',
})
export class PointsStore {
  private pointsSubject = new BehaviorSubject<Point[]>([]);

  setPoints(points: Point[]): void {
    this.pointsSubject.next(points);
  }

  getPoints(): Point[] {
    return this.pointsSubject.getValue();
  }

  hasPoints(): boolean {
    return this.pointsSubject.getValue().length > 0;
  }
}