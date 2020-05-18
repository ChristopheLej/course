import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent, CoursesCardListComponent } from '@courses/index';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CoursesComponent, CoursesCardListComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CoursesComponent]
})
export class CoursesModule {}
