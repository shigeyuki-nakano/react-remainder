import { SchedulesState } from "../schedules/types"
import {
    SWITCH_PICK_MODE,
    QUIT,
    ADD_PICK_SCHEDULE,
    REMOVE_PICK_SCHEDULE,
    EMPTY_PICK_SCHEDULES
} from './actions';

export type PickSchedulesState = {
    pickMode: boolean;
    schedules: SchedulesState
}

export type PickSchedulesActions = SwitchPickModeAction | QuitAction | AddPickScheduleAction | RemovePickScheduleAction | EmptyPickSchedulesAction

export type SwitchPickModeAction = {
    type: typeof SWITCH_PICK_MODE,
    payload: {
        pickMode: boolean
    }
}

export type QuitAction = {
    type: typeof QUIT;
    payload: {
        pickMode: boolean;
    }
}

export type AddPickScheduleAction = {
    type: typeof ADD_PICK_SCHEDULE;
    payload: PickSchedulesState['schedules'][0]
}

export type RemovePickScheduleAction = {
    type: typeof REMOVE_PICK_SCHEDULE;
    payload: PickSchedulesState['schedules'][0]
}

export type EmptyPickSchedulesAction = {
    type: typeof EMPTY_PICK_SCHEDULES;
    payload: []
}