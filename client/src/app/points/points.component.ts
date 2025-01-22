import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {
  icon,
  Icon,
  latLng,
  Layer,
  marker,
  MarkerClusterGroup,
  MarkerClusterGroupOptions,
  tileLayer,
} from 'leaflet';
import 'leaflet.markercluster';
import { LeafletMarkerClusterModule } from '@bluehalo/ngx-leaflet-markercluster';
import { Subject, takeUntil } from 'rxjs';
import { PointService } from './domain/services/point.service';

@Component({
  selector: 'app-points',
  imports: [LeafletModule, LeafletMarkerClusterModule],
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss',
})
export class PointsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private defaultIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png',
  });

  private initLatLng = { lat: 52.394319, lng: 16.909855 }

  mapInitOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 7,
    center: latLng(this.initLatLng)
  };

  markerClusterGroup: MarkerClusterGroup = new MarkerClusterGroup();
  markerClusterData: Layer[] = [];
  markerClusterOptions: MarkerClusterGroupOptions = {};

  constructor(private pointService: PointService) {}

  ngOnInit(): void {
    this.pointService
      .getPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const markerClusterData: any[] = [];
        data.forEach(point => {
          markerClusterData.push(marker([point.latitude, point.longitude], { icon: this.defaultIcon }))
        })

        this.markerClusterData = markerClusterData;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
