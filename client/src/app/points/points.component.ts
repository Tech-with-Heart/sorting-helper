import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {
  Icon,
  icon,
  latLng,
  Marker,
  marker,
  polygon,
  tileLayer,
  
} from 'leaflet';

@Component({
  selector: 'app-points',
  imports: [LeafletModule],
  templateUrl: './points.component.html',
  styleUrl: './points.component.scss',
})
export class PointsComponent implements OnInit {
  // selectedPoint = signal(
  //   PointMapper.fromDTO({
  //     _id: '',
  //     address: 'SKLEP ŻABKA - UMIŃSKIEGO 12',
  //     description: 'Punkt, do którego można oddawać zużyte baterie i akumulatory.',
  //     latitude: 52.394319,
  //     longitude: 16.909855,
  //     pointType: 'batteries',
  //   })
  // );

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
    zoom: 10,
    center: latLng(this.initLatLng),
  };

  mapLayers: Marker[] = [];

  ngOnInit() {
    this.mapLayers = [
      marker(this.initLatLng, {
        icon: this.defaultIcon,
      }).bindPopup('halko'),
    ];
  }
}
