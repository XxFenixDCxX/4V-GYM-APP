import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activitys',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule, NgClass, CommonModule],
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent {
  date: Date = new Date();
  stringContenido2: string = 'Ninguno Seleccionado';
  cont1: boolean = false;
  cont2: boolean = false;
  cont3: boolean = false;

  onDateChange(): void {
    // Actualizar el texto cuando cambie la fecha seleccionada
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const month = new Intl.DateTimeFormat('es-ES', options).format(this.date);
    this.stringContenido2 = this.date.getDate() + ' ' + month.charAt(0).toUpperCase() + month.slice(1) + " " + this.date.getFullYear();
  }
  nextDay(): void {
    if (this.stringContenido2 != 'Ninguno Seleccionado') {
      // Incrementar la fecha en 1 día
      this.date.setDate(this.date.getDate() + 1);
      this.onDateChange();
    }
  }
  prevDay(): void {
    if (this.stringContenido2 != 'Ninguno Seleccionado') {
      // Decrementar la fecha en 1 día
      this.date.setDate(this.date.getDate() - 1);
      this.onDateChange();
    }
  }
}