import { Component, OnInit, signal } from '@angular/core';
import { PointMapper } from './mappers/point.mapper';

@Component({
  selector: 'app-points',
  imports: [],
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss',
})
export class PointsComponent implements OnInit {
  selectedPoint = signal(
    PointMapper.fromDTO({
      _id: '',
      address: 'Wodna 2, Poznań',
      description: 'Carrefour market',
      latitude: 0,
      longitude: 0,
      pointType: 'batteries',
    })
  );

  ngOnInit() {
    console.log('test', this.selectedPoint());
  }
}
