import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalServiceService, Monitor } from '../utils/global-service.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss'
})
export class MonitorsComponent implements OnInit {
  monitors: Monitor[] = [];
  constructor(private globalService: GlobalServiceService) {}
  ngOnInit(): void {
    this.monitors = this.globalService.getMonitors();
  }

  removeMonitor(monitorId: number | undefined): void {
    if (monitorId !== undefined) {
      // Llama al método removeMonitor del servicio GlobalServiceService
      this.globalService.removeMonitor(monitorId);
      // Actualiza la lista de monitores después de la eliminación
      this.monitors = this.globalService.getMonitors();
    }
  }
}
