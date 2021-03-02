import { fetchSchedulesAction } from './actions';
import { db, FirebaseTimestamp } from '@/firebase';
import { SchedulesState } from '@/reducks/schedules/types';
import { Dispatch } from 'redux';
import { DB_TABLES } from '@/constants';
import { Schedules as SchedulesSchema } from '@/types/schema';
import { push } from 'connected-react-router';
import { convDateTypes } from '@/functions'
import dayjs from 'dayjs'
import { State } from '@/reducks/stores/types';

/************ グローバル定数領域 ***************/
const schedulesRef = db.collection(DB_TABLES.schedules)
/************ グローバル定数領域 ***************/

/**
 * スケジュール一覧を取得する関数
 */
export const fetchSchedules = () => {
    return async(dispatch: Dispatch) => {
        await schedulesRef.orderBy('updated_at', 'desc').get()
            .then((snapshots) => {
                const schedules: SchedulesState = [];

                snapshots.forEach((snapshot) => {
                    const schedule = snapshot.data() as SchedulesSchema;
                    const scheduleState = convDateTypes(schedule, 'timestampToDayjs') as SchedulesState[0];
                    schedules.push(scheduleState);
                })
                dispatch(fetchSchedulesAction(schedules))
            })
    }
}


type AddScheduleArgument = Omit<SchedulesState[0], 'id'>;
/**
 * schedulesテーブルにデータを保存する関数
 * @param schedule 保存するデータ
 * @param id 保存するデータのID。データを新規作成でなく更新する場合指定する
 */
export const saveSchedule = (schedule: AddScheduleArgument, id?: SchedulesState[0]['id']) => {
    return async(dispatch: Dispatch) => {
        const timestamp = FirebaseTimestamp.now();
        const convertedSchedule = convDateTypes(schedule, 'dayjsToTimestamp') as Omit<SchedulesSchema, 'id' | 'created_at' | 'updated_at'>;
        const data: Partial<SchedulesSchema> = {
            ...convertedSchedule,
            updated_at: timestamp
        }
        
        // 更新する際の処理
        if( ! id) {
            const ref = schedulesRef.doc();
            data.id = ref.id;
            id = ref.id
            data.created_at = timestamp;
        }

        return schedulesRef.doc(id).set(data, { merge: true })
            .then(() => {
                dispatch(push('/'));
            })
            .catch((e) => {
                alert('スケジュールの登録に失敗しました');
                console.error(e);
            })
    }
}

export const deleteSchedule = (ids: SchedulesState[0]['id'][]) => {
    return async(dispatch: Dispatch, getState: () => State) => {
        ids.map((id) => {
            schedulesRef.doc(id).delete()
                .then(() => {
                    const schedules = getState().schedules;
                    const newSchedules = schedules.filter((s) => s.id !== id);
                    dispatch(fetchSchedulesAction(newSchedules));
                })
                .catch((e) => {
                    alert('申し訳ございません、スケジュールの削除に失敗しました');
                    console.error(e)
                })
        })
    }
}