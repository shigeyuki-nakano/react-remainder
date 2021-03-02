import { FETCH_SCHEDULES } from './actions';
import {
    SchedulesAction,
    SchedulesState
} from './types';
import { Reducer } from 'redux';
import initialState from '@/reducks/stores/initialState';

const schedulesReducer: Reducer<SchedulesState, SchedulesAction> = (
    state = initialState.schedules,
    action
) => {
    const {type, payload} = action;

    switch(type) {
        case FETCH_SCHEDULES:
            return payload as SchedulesState;
        default:
            return state
    }
}

export default schedulesReducer;