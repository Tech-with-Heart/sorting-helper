import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PointType } from '../../domain/models/point.model';

@Component({
  selector: 'app-search-panel',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
})
export class SearchPanelComponent {
  private readonly optionsInput: { [k in PointType | '']: string } = {
    '': 'Wszystkie kategorie',
    'general': 'PSZOK',
    'batteries': 'Baterie',
    'pills': 'Leki',
    'clothes': 'Ubrania',
    'electronics': 'Urządzenia elektroniczne',
  }

  readonly options = Object.entries(this.optionsInput);
  readonly select = new FormControl<PointType | ''>('', []);

  @Output() selectChange = new EventEmitter<PointType | ''>();

  onSelectChange() {
    this.selectChange.emit(this.select.value || '');
  }
}
