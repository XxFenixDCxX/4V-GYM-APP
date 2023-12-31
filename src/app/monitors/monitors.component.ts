import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalServiceService, Monitor } from '../utils/global-service.service';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.scss'
})
export class MonitorsComponent implements OnInit {
  monitors: Monitor[] = [];
  numVisible: number = 3;
  newMonitor: Monitor = { nombre: '', email: '', telefono: '' };
  isModalOpen: boolean = false;
  searchTerm: string = '';
  filteredMonitors: Monitor[] = [];
  constructor(private globalService: GlobalServiceService) {}
  ngOnInit(): void {
    this.updateVisible();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newMonitor = { nombre: '', email: '', telefono: '' };
  }
  loadMonitor(monitor: Monitor): void {
    // Asigna los valores del monitor al modelo
    this.newMonitor = { ...monitor };
    // Abre el modal
    this.openModal();
  }    
  addMonitor(): void {
    const existingMonitor = this.monitors.find(m => m.id === this.newMonitor.id);
  
    if (existingMonitor) {
      // Actualiza el monitor existente
      Object.assign(existingMonitor, this.newMonitor);
    } else {
      // Agrega un nuevo monitor
      this.globalService.addMonitor(this.newMonitor);
      this.updateVisible();
    }
  
    // Restablece el formulario y cierra el modal
    this.newMonitor = { nombre: '', email: '', telefono: '' };
    this.closeModal();
  }  
  removeMonitor(monitorId: number | undefined): void {
    if (monitorId !== undefined) {
      // Llama al método removeMonitor del servicio GlobalServiceService
      this.globalService.removeMonitor(monitorId);
      // Actualiza la lista de monitores después de la eliminación
      this.updateVisible();
    }
  }
  
  responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1
    }
  ];
  updateVisible(): void {
    this.monitors = this.globalService.getMonitors();
    if (this.searchTerm) {
      this.filteredMonitors = this.monitors.filter(monitor => monitor.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }else{
      this.filteredMonitors = this.monitors;
    }
    this.numVisible = Math.min(this.responsiveOptions.find(opt => window.innerWidth <= Number(opt.breakpoint))?.numVisible || 3, this.filteredMonitors.length);
  }
}
