import {
    createSelector,
    Selector
} from 'reselect';
import { State } from '@/reducks/stores/types';
import { PickSchedulesState } from './types';

const modesSelector: Selector<State, PickSchedulesState> = (state) => state.pickSchedules;

export const getPickMode = createSelector(
    [modesSelector],
    (state: PickSchedulesState) => state.pickMode
)

export const getPickSchedules = createSelector(
    [modesSelector],
    (state: PickSchedulesState) => state.schedules
)