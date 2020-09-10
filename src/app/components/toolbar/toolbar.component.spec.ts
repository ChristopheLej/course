import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolbarComponent]
    });

    component = TestBed.inject(ToolbarComponent);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('raises the menu event when clicked', () => {
    spyOn(component.menuClick, 'emit');
    component.onMenuClick();
    expect(component.menuClick.emit).toHaveBeenCalled();
  });
});
