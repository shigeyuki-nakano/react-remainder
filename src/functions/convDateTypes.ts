import { SchedulesState } from "@/reducks/schedules/types";
import { Schedules as SchedulesSchema } from '@/types/schema';
import dayjs from 'dayjs';
import { FirebaseTimestamp } from '@/firebase';

type ReturnSchedulesSchema = Omit<SchedulesSchema, 'id' | 'created_at' | 'updated_at'>
/**
 * schedulesの日付データを変換する
 * @param mode 
 */
const convDateTypes = (
    data: SchedulesSchema | Omit<SchedulesState[0], 'id'>,
    mode: 'timestampToDayjs' | 'dayjsToTimestamp'
): ReturnSchedulesSchema | Omit<SchedulesState[0], 'id'> => {
    let result: ReturnSchedulesSchema | Omit<SchedulesState[0], 'id'>;

    switch(mode) {
        case 'timestampToDayjs': {
            data = data as SchedulesSchema
            result = {
                ...data,
                date: data['date'] && dayjs(data['date']!.toDate()),
                time: data['time'] && dayjs(data['time']!.toDate()),
            } as Omit<SchedulesState[0], 'id'>
            return result;
        }
        case 'dayjsToTimestamp': {
            data = data as Omit<SchedulesState[0], 'id'>
            result = {
                ...data,
                date: data['date'] && FirebaseTimestamp.fromDate(data['date']!.toDate()),
                time: data['time'] && FirebaseTimestamp.fromDate(data['time']!.toDate())
            } as ReturnSchedulesSchema
            return result;
        }
    }
}

export default convDateTypes;