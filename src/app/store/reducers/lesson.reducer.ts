import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as LessonActions from '../actions/lesson.actions';
import { Lesson } from '@models';
import { identifierModuleUrl } from '@angular/compiler';

export const lessonsFeatureKey = 'lessons';

export interface LessonState extends EntityState<Lesson> {
  loading: boolean;
}

function sortBySeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;
  if (compare !== 0) {
    return compare;
  } else {
    return l1.seqNo - l2.seqNo;
  }
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  // selectId: lesson => lesson.courseId + '-' + lesson.seqNo,
  sortComparer: sortBySeqNo
});

export const initialState: LessonState = adapter.getInitialState({
  loading: false
});

export const reducer = createReducer(
  initialState,
  on(LessonActions.loadLessonsRequested, state => ({ ...state, loading: true })),
  on(LessonActions.addLessons, (state, action) =>
    adapter.addMany(action.lessons, { ...state, loading: false })
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
