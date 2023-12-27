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
  date: Date | null = new Date();
}