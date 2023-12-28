import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalServiceService, ActivityType, Monitor, Activity } from '../utils/global-service.service';

@Component({
  selector: 'app-activitys',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule, NgClass, CommonModule, FormsModule],
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent {
  activitys: Activity[] = [];
  activityTypes: ActivityType[] = [ActivityType.BodyPump, ActivityType.Pilates, ActivityType.Spinning];
  date: Date = new Date();
  newActivity: Activity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
  activity1: Activity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
  activity2: Activity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
  activity3: Activity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
  stringContent2: string = 'Ninguno Seleccionado';
  hour1: string = '10:00';
  hour2: string = '13:30';
  hour3: string = '17:30';
  modifingHour: string = '';
  cont1: boolean = false;
  cont2: boolean = false;
  cont3: boolean = false;
  isModalOpen: boolean = false;
  monitors: Monitor[];
  idMonitor1: number = -1;
  idMonitor2: number = -1;

  constructor(private globalService: GlobalServiceService) {
    this.monitors = this.globalService.getMonitors();
  }

  closeModal(): void {
    this.newActivity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
    this.isModalOpen = false;
  }

  openModal(hour: string): void {
    this.monitors = this.globalService.getMonitors();
    this.isModalOpen = true;
    this.date = this.setHour(hour);
    this.newActivity.fecha = this.date.toLocaleString();
  }

  onDateChange(): void {
    this.cont1 = false;
    this.cont2 = false;
    this.cont3 = false;
    // Actualizar el texto cuando cambie la fecha seleccionada
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const month = new Intl.DateTimeFormat('es-ES', options).format(this.date);
    this.stringContent2 = this.date.getDate() + ' ' + month.charAt(0).toUpperCase() + month.slice(1) + " " + this.date.getFullYear();
    this.activitys = this.globalService.getActivitys();
    var date1 = this.setHour(this.hour1);
    var date2 = this.setHour(this.hour2);
    var date3 = this.setHour(this.hour3);

    this.activitys.forEach((activity) => {
      if (activity.fecha == date1.toLocaleString()) {
        this.activity1 = activity;
        this.cont1 = true;
      } else if (activity.fecha == date2.toLocaleString()) {
        this.activity2 = activity;
        this.cont2 = true;
      } else if (activity.fecha == date3.toLocaleString()) {
        this.activity3 = activity;
        this.cont3 = true;
      }
    });
  }

  nextDay(): void {
    if (this.stringContent2 != 'Ninguno Seleccionado') {
      // Crear una nueva instancia de Date en lugar de modificar la existente
      const newDate = new Date(this.date);
      newDate.setDate(newDate.getDate() + 1);
      this.date = newDate;
      this.onDateChange();
    }
  }

  prevDay(): void {
    if (this.stringContent2 != 'Ninguno Seleccionado') {
      // Crear una nueva instancia de Date en lugar de modificar la existente
      const newDate = new Date(this.date);
      newDate.setDate(newDate.getDate() - 1);
      this.date = newDate;

      this.onDateChange();
    }
  }

  addActivity(): void {
    if (this.idMonitor1 !== -1) {
      const selectedMonitor1: Monitor = this.monitors[this.idMonitor1];
      this.newActivity.monitor = [];
      if (this.idMonitor2 !== -1 && this.monitors[this.idMonitor2]) {
        const selectedMonitor2: Monitor = this.monitors[this.idMonitor2];
        this.newActivity.monitor = [...this.newActivity.monitor, selectedMonitor1, selectedMonitor2];
      } else {
        this.newActivity.monitor = [...this.newActivity.monitor, selectedMonitor1];
      }
  
      // Check if an activity with the same id already exists
      const existingActivity = this.globalService.getActivitys().find(activity => activity.id === this.newActivity.id);
  
      if (existingActivity) {
        // Update the existing activity
        Object.assign(existingActivity, this.newActivity);
      } else {
        // Add a new activity
        this.globalService.addActivity(this.newActivity);
      }
      
      this.onDateChange();
      this.closeModal();
      this.newActivity = { fecha: '', monitor: [], tipo: ActivityType.BodyPump };
      console.log(this.globalService.getActivitys());
    } else {
      console.error('Debe seleccionar al menos un monitor válido');
    }
  }
  

  setHour(hour: string): Date {
    const [startHourHours, startHourMinutes] = hour.split(':');
    const newDate = new Date(this.date);
    newDate.setHours(Number(startHourHours), Number(startHourMinutes), 0);
    return newDate;
  }
  deleteActivity(activity: Activity): void {
    this.globalService.removeActivity(activity.id ? activity.id : 0);
    this.onDateChange();
  }
  loadMonitor(Activity: Activity, hour: string): void {
    // Asigna los valores del monitor al modelo
    this.newActivity = { ...Activity };
    // Abre el modal
    this.openModal(hour);
  }
}
