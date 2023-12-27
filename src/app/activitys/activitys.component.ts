import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ActivityType } from '../utils/global-service.service';

@Component({
  selector: 'app-activitys',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule, NgClass, CommonModule],
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent {
  activityTypes: ActivityType[] = [ActivityType.BodyPump, ActivityType.Pilates, ActivityType.Spinning];
  date: Date = new Date();
  stringContent2: string = 'Ninguno Seleccionado';
  hoursArray: string[] = [
    '10:00 - 11:30',
    '13:30 - 15:00',
    '17:30 - 19:00'
  ];
  cont1: boolean = false;
  cont2: boolean = false;
  cont3: boolean = false;
  isModalOpen: boolean = false;

  closeModal(): void {
    this.isModalOpen = false;
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  onDateChange(): void {
    // Actualizar el texto cuando cambie la fecha seleccionada
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const month = new Intl.DateTimeFormat('es-ES', options).format(this.date);
    this.stringContent2 = this.date.getDate() + ' ' + month.charAt(0).toUpperCase() + month.slice(1) + " " + this.date.getFullYear();
  }
  nextDay(): void {
    if (this.stringContent2 != 'Ninguno Seleccionado') {
      // Incrementar la fecha en 1 día
      this.date.setDate(this.date.getDate() + 1);
      this.onDateChange();
    }
  }
  prevDay(): void {
    if (this.stringContent2 != 'Ninguno Seleccionado') {
      // Decrementar la fecha en 1 día
      this.date.setDate(this.date.getDate() - 1);
      this.onDateChange();
    }
  }
}