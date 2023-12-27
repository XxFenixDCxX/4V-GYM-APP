import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';
import { ActivitysComponent } from './activitys/activitys.component';
import { MonitorsComponent } from './monitors/monitors.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterTabsComponent, ActivitysComponent, MonitorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gymApp-ArkaitzCalvo';
  selectedOption: string = 'activity';

  updateSelectedOption(option: string): void {
    this.selectedOption = option;
  }
}
