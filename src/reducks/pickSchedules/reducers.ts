import {
    ADD_PICK_SCHEDULE,
    EMPTY_PICK_SCHEDULES,
    QUIT,
    REMOVE_PICK_SCHEDULE,
    SWITCH_PICK_MODE
} from './actions'
import {
    PickSchedulesActions,
    PickSchedulesState
} from './types';
import { Reducer } from 'redux';
import initialState from '@/reducks/stores/initialState';

const modesReducer: Reducer<PickSchedulesState, PickSchedulesActions> = (
    state = initialState['pickSchedules'],
    action
) => {
    const {type, payload} = action

    switch(type) {
        case QUIT:
            return {
                ...state,
                ...payload
            };
        case SWITCH_PICK_MODE:
            return {
                ...state,
                ...payload
            }
        case ADD_PICK_SCHEDULE:
            return {
                ...state,
                schedules: [
                    ...state['schedules'],
                    payload as PickSchedulesState['schedules'][0]
                ]
            }
        case REMOVE_PICK_SCHEDULE:
            if(state['schedules'].length <= 0) {
                return state
            }
            const newSchedules = state['schedules'].filter((s) => {
                return s.id !== (payload as PickSchedulesState['schedules'][0]).id
            })
            return {
                ...state,
                schedules: newSchedules
            }
        case EMPTY_PICK_SCHEDULES:
            return {
                ...state,
                schedules: []
            }
        default:
            // const _action: never = action
            return state
    }
}

export default modesReducer;