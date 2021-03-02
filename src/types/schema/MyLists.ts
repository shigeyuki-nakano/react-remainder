import firebase from 'firebase/app';
import { NoticeMethod } from "@/types";

type MyLists = {
    created_at: firebase.firestore.Timestamp;
    updated_at: firebase.firestore.Timestamp;
    title: string;
    memo: string;
    place: string;
    notice_method: NoticeMethod;
    is_notice: boolean;
}

export default MyLists;