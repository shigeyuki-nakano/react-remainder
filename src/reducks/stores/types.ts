import { SchedulesState } from '@/reducks/schedules/types';
import { PickSchedulesState } from "@/reducks/pickSchedules/types";

export type State = {
    pickSchedules: PickSchedulesState;
    schedules: SchedulesState
}