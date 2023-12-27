import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-activitys',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent {
  date: Date = new Date();
  stringContenido2: string = 'Ninguno Seleccionado';
  onDateChange(): void {
    // Actualizar el texto cuando cambie la fecha seleccionada
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const month = new Intl.DateTimeFormat('es-ES', options).format(this.date);
    this.stringContenido2 = this.date.getDate() + ' ' + month.charAt(0).toUpperCase() + month.slice(1) + " " + this.date.getFullYear();
  }
  nextDay(): void {
    // Incrementar la fecha en 1 día
    this.date.setDate(this.date.getDate() + 1);
  }
  prevDay(): void {
    // Decrementar la fecha en 1 día
    this.date.setDate(this.date.getDate() - 1);
  }
}