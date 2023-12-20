import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalServiceService, Monitor } from '../utils/global-service.service';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss'
})
export class MonitorsComponent implements OnInit {
  monitors: Monitor[] = [];
  numVisible: number = 3;
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
      this.updateVisible();
    }
  }
  
  responsiveOptions = [
    {
      breakpoint: 1024,
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: 768,
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: 560,
      numVisible: 1,
      numScroll: 1
    }
  ];
  private updateVisible(): void {
    this.numVisible = Math.min(this.responsiveOptions.find(opt => window.innerWidth <= opt.breakpoint)?.numVisible || 3, this.monitors.length);
  }
}
