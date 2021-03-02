import { Schedules } from '@/types/schema';
import { Dayjs } from 'dayjs';

type PickupSchedulesSchema = Omit<
    Schedules, 
    'created_at' |
    'updated_at' |
    'time' |
    'date'
>

type  OverrideDateTypes = {
    date?: Dayjs | null;
    time?: Dayjs | null;
}

export type SchedulesState = (PickupSchedulesSchema & OverrideDateTypes)[]

export type SchedulesAction = {
    type: string;
    payload: SchedulesState[0] | SchedulesState;
}