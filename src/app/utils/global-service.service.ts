import { Injectable } from '@angular/core';
import { LoggerServiceService } from './logger-service.service';
export interface Actividad {
  id: number;
  fecha: string;
  lugar: string;
  monitor: Monitor[];
  tipo: TipoActividad;
}
export interface Monitor{
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}
export enum TipoActividad {
  BodyPump = "BodyPump",
  Pilates = "Pilates",
  Spinning = "Spinning"
}
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  actividades: Actividad[];
  monitores: Monitor[];
  constructor(private logger: LoggerServiceService) {
    this.monitores = [
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
    this.actividades = [
      {
        id: 0,
        fecha: "2021-10-01",
        lugar: "Gimnasio A",
        monitor: [this.monitores[0]],
        tipo: TipoActividad.BodyPump
      },
      {
        id: 1,
        fecha: "2021-10-02",
        lugar: "Gimnasio B",
        monitor: [this.monitores[1]],
        tipo: TipoActividad.Pilates
      },
      {
        id: 2,
        fecha: "2021-10-03",
        lugar: "Gimnasio C",
        monitor: [this.monitores[1], this.monitores[2]],
        tipo: TipoActividad.Spinning
      }
    ];;
  }
  getActivitys(){
    this.logger.log("Recibiendo actividades");
    return this.actividades;
  }
  getMonitors(){
    this.logger.log("Recibiendo monitores");
    return this.monitores;
  }
}
