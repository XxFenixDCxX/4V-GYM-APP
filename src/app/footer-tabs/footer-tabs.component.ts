import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-footer-tabs',
  standalone: true,
  imports: [],
  templateUrl: './footer-tabs.component.html',
  styleUrl: './footer-tabs.component.scss'
})
export class FooterTabsComponent {
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  selectOption(option: string): void {
    this.optionSelected.emit(option);
  }
}
