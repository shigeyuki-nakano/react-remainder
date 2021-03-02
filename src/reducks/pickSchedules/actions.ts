import {
    SwitchPickModeAction,
    QuitAction,
    PickSchedulesState,
    AddPickScheduleAction
} from "./types";

export const SWITCH_PICK_MODE = 'SWITCH_PICK_MODE';
export const switchPickModeAction = (): SwitchPickModeAction => {
    return {
        type: SWITCH_PICK_MODE,
        payload: {
            pickMode: true
        }
    }
}

export const QUIT = 'QUIT';
export const quitAction = (): QuitAction => {
    return {
        type: QUIT,
        payload: {
            pickMode: false
        }
    }
}

export const ADD_PICK_SCHEDULE = 'ADD_PICK_SCHEDULE'
export const addPickScheduleAction = (payload: PickSchedulesState['schedules'][0]): AddPickScheduleAction => {
    return {
        type: ADD_PICK_SCHEDULE,
        payload: payload
    }
}

export const REMOVE_PICK_SCHEDULE = 'REMOVE_PICK_SCHEDULE';
export const removePickScheduleAction = (payload: PickSchedulesState['schedules'][0]) => {
    return {
        type: REMOVE_PICK_SCHEDULE,
        payload: payload
    }
}

export const EMPTY_PICK_SCHEDULES = 'EMPTY_PICK_SCHEDULES'
export const emptyPickSchedulesAction = () => {
    return {
        type: EMPTY_PICK_SCHEDULES,
        payload: []
    }
}