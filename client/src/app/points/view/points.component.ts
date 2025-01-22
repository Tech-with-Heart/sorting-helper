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
import {
  BehaviorSubject,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { PointService } from '../domain/services/point.service';
import { PointType } from '../domain/models/point.model';

@Component({
  selector: 'app-points',
  imports: [LeafletModule, LeafletMarkerClusterModule, SearchPanelComponent],
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss',
})
export class PointsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private defaultIcon = icon({
    ...Icon.Default.prototype.options,
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png',
  });

  private readonly initLatLng = { lat: 52.394319, lng: 16.909855 };

  readonly mapInitOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 7,
    center: latLng(this.initLatLng),
  };

  markerClusterGroup: MarkerClusterGroup = new MarkerClusterGroup();
  markerClusterData: Layer[] = [];
  markerClusterOptions: MarkerClusterGroupOptions = {};

  selectedPointType$ = new BehaviorSubject<PointType | ''>('');

  constructor(private pointService: PointService) {}

  ngOnInit(): void {
    this.selectedPointType$.pipe(
      switchMap((pointType) =>
        pointType
          ? this.pointService.getFilteredPoints(pointType)
          : this.pointService.getPoints()
      ),
      takeUntil(this.destroy$),
    ).subscribe(data => {
      console.log(data)
        const markerClusterData: any[] = [];
        data.forEach((point) => {
          markerClusterData.push(
            marker([point.latitude, point.longitude], {
              icon: this.defaultIcon,
            })
          );
        });

        this.markerClusterData = markerClusterData;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectChange(value: PointType | ''): void {
    this.selectedPointType$.next(value);
  }
}
