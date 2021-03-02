import { MyLists } from '@/types/schema';

export type MyListsState = Omit<MyLists, 'created_at' | 'updated_at'>[]

export type MyListsAction = {
    type: string;
    payload: MyListsState;
}