import { Activity } from './global-service.service';
import { Injectable } from '@angular/core';
import { LoggerServiceService } from './logger-service.service';
export interface Activity {
  id?: number;
  fecha: string;
  lugar: string;
  monitor: Monitor[];
  tipo: ActivityType;
}
export interface Monitor{
  id?: number;
  nombre: string;
  email: string;
  telefono: string;
}
export enum ActivityType {
  BodyPump = "BodyPump",
  Pilates = "Pilates",
  Spinning = "Spinning"
}
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  activitys: Activity[];
  monitors: Monitor[];
  constructor(private logger: LoggerServiceService) {
    this.monitors = [
      {
        id: 0,
        nombre: "Juan",
        email: "juan@gmail.com",
        telefono: "948128888"
      },
      {
        id: 1,
        nombre: "Maria",
        email: "juan@gmail.com",
        telefono: "948128888"
      },
      {
        id: 2,
        nombre: "Pedro",
        email: "juan@gmail.com",
        telefono: "948128888"
      }
    ]
    this.activitys = [
      {
        id: 0,
        fecha: "2021-10-01",
        lugar: "Gimnasio A",
        monitor: [this.monitors[0]],
        tipo: ActivityType.BodyPump
      },
      {
        id: 1,
        fecha: "2021-10-02",
        lugar: "Gimnasio B",
        monitor: [this.monitors[1]],
        tipo: ActivityType.Pilates
      },
      {
        id: 2,
        fecha: "2021-10-03",
        lugar: "Gimnasio C",
        monitor: [this.monitors[1], this.monitors[2]],
        tipo: ActivityType.Spinning
      }
    ];;
  }
  getActivitys(){
    this.logger.log("Recibiendo actividades");
    return this.activitys;
  }
  getMonitors(){
    this.logger.log("Recibiendo monitores");
    return this.monitors;
  }
  addActivity(activity: Activity){
    this.logger.log("Agregando actividad");
    var finalActivity: Activity = this.activitys[this.activitys.length - 1];
    if (finalActivity){
      activity.id = finalActivity.id ? finalActivity.id + 1 : 0;
    }else{
      activity.id = 0;
    }
    this.activitys = this.activitys.concat(activity);
  }
  addMonitor(monitor: Monitor){
    this.logger.log("Agregando Monitor");
    var finalMonitor: Monitor = this.monitors[this.monitors.length - 1];
    if (finalMonitor){
      monitor.id = finalMonitor.id ? finalMonitor.id + 1 : 0;
    }else{
      monitor.id = 0;
    }
    this.monitors = this.monitors.concat(monitor);
  }
}
