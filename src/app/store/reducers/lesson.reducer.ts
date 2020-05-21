import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as LessonActions from '../actions/lesson.actions';
import { Lesson } from '@models';

export const lessonsFeatureKey = 'lessons';

export interface State extends EntityState<Lesson> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(LessonActions.addLesson, (state, action) => adapter.addOne(action.lesson, state)),
  on(LessonActions.upsertLesson, (state, action) => adapter.upsertOne(action.lesson, state)),
  on(LessonActions.addLessons, (state, action) => adapter.addMany(action.lessons, state)),
  on(LessonActions.upsertLessons, (state, action) => adapter.upsertMany(action.lessons, state)),
  on(LessonActions.updateLesson, (state, action) => adapter.updateOne(action.lesson, state)),
  on(LessonActions.updateLessons, (state, action) => adapter.updateMany(action.lessons, state)),
  on(LessonActions.deleteLesson, (state, action) => adapter.removeOne(action.id, state)),
  on(LessonActions.deleteLessons, (state, action) => adapter.removeMany(action.ids, state)),
  on(LessonActions.loadLessons, (state, action) => adapter.setAll(action.lessons, state)),
  on(LessonActions.clearLessons, state => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
