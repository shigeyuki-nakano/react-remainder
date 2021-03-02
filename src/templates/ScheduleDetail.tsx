import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { DB_TABLES } from '@/constants';
import { convDateTypes, getURLParamerter } from '@/functions';
import { Schedules as SchedulesSchema } from '@/types/schema';
import { SchedulesState } from '@/reducks/schedules/types';

const ScheduleDetail: React.FC = () => {
    const [id] = getURLParamerter('/');
    const [schedule, setSchedule] = useState<SchedulesState[0]>()

    useEffect(() => {
        db.collection(DB_TABLES.schedules).doc(id).get()
        .then((snapshot) => {
            const data = snapshot.data() as SchedulesSchema;
            const state = convDateTypes(data, 'timestampToDayjs') as SchedulesState[0]
            setSchedule(state);
        })
        .catch((e) => {
            console.error(e)
        })
    }, [])

    return (
        <div>
            {schedule && (
                <>
                <h2>{schedule['title']}</h2>
                <p>{schedule['memo']}</p>
                <p>{schedule['date']?.format('YYYY年MM月DD日')}</p>
                <p>{schedule['time']?.format('HH時mm分')}</p>
                <p>{schedule['place']}</p>
                </>
            )}
        </div>
    )
}

export default ScheduleDetail;