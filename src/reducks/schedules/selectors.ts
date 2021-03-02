import { Selector, createSelector } from 'reselect';
import { State } from '@/reducks/stores/types';
import { SchedulesState } from './types';

const schedulesSelector: Selector<State, SchedulesState> = state => state.schedules;

export const getSchedules = createSelector(
    [schedulesSelector],
    (state: SchedulesState) => state
)

export const getScheduleLength = createSelector(
    [schedulesSelector],
    (state: SchedulesState) => state.length
)