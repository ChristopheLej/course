import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '@models';
import { AppTheme } from 'src/app/models/layout.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() themes: Theme[];
  @Output() themeSelected = new EventEmitter<AppTheme>();

  constructor() {}

  ngOnInit(): void {}

  selectTheme(theme: AppTheme) {
    this.themeSelected.emit(theme);
  }
}
