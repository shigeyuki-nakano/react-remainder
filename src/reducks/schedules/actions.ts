import {
    SchedulesState,
    SchedulesAction
} from './types';

export const FETCH_SCHEDULES = 'FETCH_SCHEDULES';
export const fetchSchedulesAction = (payload: SchedulesState): SchedulesAction => {
    return {
        type: FETCH_SCHEDULES,
        payload: payload
    }
}