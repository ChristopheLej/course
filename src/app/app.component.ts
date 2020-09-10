import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Courses';
  opened: boolean;

  constructor(private route: ActivatedRoute) {
    console.log('AppComponent', route);
  }

  onOpen() {
    this.opened = !this.opened;
  }
}
