import firebase from 'firebase/app';
import {
    NoticeMethod,
    PriorityLevels
} from '@/types';
import { Dayjs } from 'dayjs';

type Schedules = {
    id: string;
    title: string;
    memo?: string | null;
    category?: string | null;
    place?: string | null;
    place_coordinate?: [number, number] | null;
    flag: boolean;
    priority?: PriorityLevels | null;
    notice_method?: NoticeMethod | null;
    is_notice: boolean;
    date?: firebase.firestore.Timestamp | null;
    time?: firebase.firestore.Timestamp | null;
    created_at: firebase.firestore.Timestamp;
    updated_at: firebase.firestore.Timestamp;
}

export default Schedules;