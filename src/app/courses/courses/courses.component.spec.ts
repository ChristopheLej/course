import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { CoursesComponent } from './courses.component';
import { ActivatedRoute } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Observable } from 'rxjs';
import { Action, MemoizedSelector } from '@ngrx/store';
import { loadCourses } from '@store/actions/course.actions';
import { ApplicationState } from '@storeConfig';
import { Course } from '@models';
import * as fromCourses from '@store/selectors/course.selector';
import { COURSES } from '@stubs/courses.stub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let store: MockStore;
  let actions$ = new Observable<Action>();
  let mockIsLoadingSelector: MemoizedSelector<ApplicationState, boolean>;
  let mockSelectCoursesSelector: MemoizedSelector<ApplicationState, Course[]>;
  let mockSelectBeginnerCoursesSelector: MemoizedSelector<ApplicationState, Course[]>;
  let mockSelectAdvancedCoursesSelector: MemoizedSelector<ApplicationState, Course[]>;
  let mockSelectIntermediateCoursesSelector: MemoizedSelector<ApplicationState, Course[]>;
  let mockSelectPromoTotalSelector: MemoizedSelector<ApplicationState, number>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent, CoursesCardListComponent],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [
        provideMockStore(),
        MatSnackBar,
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } },
        provideMockActions(() => actions$)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    store = TestBed.inject(MockStore);
    mockIsLoadingSelector = store.overrideSelector(fromCourses.isLoading, true);
    mockSelectCoursesSelector = store.overrideSelector(fromCourses.selectCourses, []);
    mockSelectBeginnerCoursesSelector = store.overrideSelector(
      fromCourses.selectBeginnerCourses,
      []
    );
    mockSelectAdvancedCoursesSelector = store.overrideSelector(
      fromCourses.selectAdvancedCourses,
      []
    );
    mockSelectIntermediateCoursesSelector = store.overrideSelector(
      fromCourses.selectIntermediateCourses,
      []
    );
    mockSelectPromoTotalSelector = store.overrideSelector(fromCourses.selectPromoTotal, 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();

    component.isLoading$.subscribe(result => expect(result).toBeTrue());
    expect(component.allCourses).toEqual([]);
    component.beginnerCourses$.subscribe(result => expect(result).toEqual([]));
    component.intermediateCourses$.subscribe(result => expect(result).toEqual([]));
    component.advancedCourses$.subscribe(result => expect(result).toEqual([]));
    component.selectPromoTotal$.subscribe(result => expect(result).toEqual(0));
  });

  it('should dispatch LoadCourses', () => {
    const expectedAction = loadCourses();
    spyOn(store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should change LoadCourses', () => {
    mockIsLoadingSelector.setResult(false);
    mockSelectCoursesSelector.setResult(COURSES);
    mockSelectBeginnerCoursesSelector.setResult([COURSES[0]]);
    mockSelectIntermediateCoursesSelector.setResult([COURSES[1]]);
    mockSelectAdvancedCoursesSelector.setResult([COURSES[2]]);
    mockSelectPromoTotalSelector.setResult(2);
    store.refreshState();
    fixture.detectChanges();

    component.isLoading$.subscribe(result => expect(result).toBeFalse());
    expect(component.allCourses).toEqual(COURSES);
    component.beginnerCourses$.subscribe(result => expect(result).toEqual([COURSES[0]]));
    component.intermediateCourses$.subscribe(result => expect(result).toEqual([COURSES[1]]));
    component.advancedCourses$.subscribe(result => expect(result).toEqual([COURSES[2]]));
    component.selectPromoTotal$.subscribe(result => expect(result).toEqual(2));
  });
});
