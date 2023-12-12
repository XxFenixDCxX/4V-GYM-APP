import { Injectable } from '@angular/core';
import { LoggerServiceService } from './logger-service.service';
export interface Actividad {
  fecha: string;
  lugar: string;
  monitor: string;
  tipo: TipoActividad;
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
  constructor(private logger: LoggerServiceService) {
    this.actividades = [];
  }
  getActivitys(){
    this.logger.log("Recibiendo actividades");
    this.actividades = [
      {
        fecha: "2021-10-01",
        lugar: "Gimnasio A",
        monitor: "Juan",
        tipo: TipoActividad.BodyPump
      },
      {
        fecha: "2021-10-02",
        lugar: "Gimnasio B",
        monitor: "Maria",
        tipo: TipoActividad.Pilates
      },
      {
        fecha: "2021-10-03",
        lugar: "Gimnasio C",
        monitor: "Pedro",
        tipo: TipoActividad.Spinning
      }
    ];

    return this.actividades;
  }

}
