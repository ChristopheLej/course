import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Courses';
  opened: boolean;

  onOpen() {
    this.opened = !this.opened;
  }
}
