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
      address: 'SKLEP ŻABKA - UMIŃSKIEGO 12',
      description: 'Punkt, do którego można oddawać zużyte baterie i akumulatory.',
      latitude: 52.394319,
      longitude: 16.909855,
      pointType: 'batteries',
    })
  );

  ngOnInit() {
    console.log('test', this.selectedPoint());
  }
}
