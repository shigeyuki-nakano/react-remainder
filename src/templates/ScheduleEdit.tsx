import React, { useState, useCallback, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs'
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import {
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/styles';
import {
    DateRange as DateRangeIcon,
    QueryBuilder as QueryBuilderIcon,
    StarRateRounded,
} from '@material-ui/icons';
import { Accordion } from '@/components/UIkit';
import { saveSchedule } from '@/reducks/schedules/operations';
import { convDateTypes, getURLParamerter, nullToUndefined } from '@/functions';
import { DB_TABLES } from '@/constants';
import { Schedules as SchedulesSchema } from '@/types/schema';
import { SchedulesState } from '@/reducks/schedules/types';
import { db } from '@/firebase';

const useStyles = makeStyles({
    buttonWrap: {
        textAlign: 'center'
    }
})

const PlanRegister: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [id] = getURLParamerter('/');
    const [resultValues, setResultValues] = useState<{[key: string]: any}>({})

    const onRegister = () => {
        const {title, memo, place, date, time} = resultValues;
        if( ! title) {
            alert('タイトルを記載してから登録してください');
            return;
        }

        dispatch(saveSchedule({
            title: title,
            memo:  memo || null,
            place: place || null,
            date: date || null,
            time: time || null,
            flag: false,
            is_notice: (date) ? true : false 
        }))
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setResultValues((bef) => {
            return {
                ...bef,
                [name]: value
            }
        })
    }

    const changeState = useCallback((values: typeof resultValues) => {
        setResultValues((bef) => ({
            ...bef,
            ...values
        }))
    }, [setResultValues])

    useEffect(() => {
        db.collection(DB_TABLES.schedules).doc(id).get()
        .then((snapshot) => {
            const data = snapshot.data() as SchedulesSchema;
            const state = convDateTypes(data, 'timestampToDayjs') as SchedulesState[0]
            
            changeState(nullToUndefined(state))
        })
    }, [])

    return (
        <form>
            <TextField
                fullWidth
                label='タイトル'
                type='text'
                name='title'
                focused={resultValues['title'] !== undefined}
                onChange={(e) => changeState({title: e.target.value})}
                value={resultValues['title']}
                onBlur={onBlur}
            />
            <div className='module-spacer'/>
            <TextField
                fullWidth
                label='メモ'
                rows={3}
                multiline
                type='text'
                name='memo'
                focused={resultValues['memo'] !== undefined}
                onChange={(e) => changeState({memo: e.target.value})}
                value={resultValues['memo']}
                onBlur={onBlur}
            />
            <div className='module-spacer'/>
            <Accordion
                name='date'
                label='日付'
                isChecked={resultValues['date'] !== undefined}
                onCheck={() => changeState({date: dayjs()})}
                onUnCheck={() => changeState({date: undefined})}
            >
                <KeyboardDatePicker
                    keyboardIcon={<DateRangeIcon/>}
                    label='日付'
                    format='YYYY年 M月 D日'
                    value={resultValues['date']}
                    onChange={(date) => changeState({date: date || undefined})}
                    fullWidth
                    name='date'
                />
            </Accordion>
            <div className='module-spacer'/>
            <Accordion
                name='time'
                label='時間'
                isChecked={resultValues['time'] !== undefined}
                onCheck={() => {
                    const day = dayjs()
                    const value = resultValues['date'] === undefined
                        ?{date: day, time: day}
                        :{time: day}

                    changeState(value)
                }}
                onUnCheck={() => changeState({time: undefined})}
            >
                <KeyboardTimePicker
                    fullWidth
                    label='時間'
                    // format='H時 m分'
                    name='time'
                    value={resultValues['time']}
                    onChange={(date) => changeState({time: date || undefined})}
                    keyboardIcon={<QueryBuilderIcon/>}
                    // defaultValue={initialDate}
                />
            </Accordion>
            <div className='module-spacer'/>
            <Accordion
                name='place'
                label='場所'
                isChecked={resultValues['place'] !== undefined}
                onUnCheck={() => changeState({place: undefined})}
            >
                <TextField
                    fullWidth
                    label='場所'
                    type='text'
                    name='place'
                    focused={resultValues['place'] !== undefined}
                    onChange={(e) => changeState({place: e.target.value})}
                    value={resultValues['place']}
                    onBlur={onBlur}
                />
            </Accordion>
            <div className='module-spacer'/>
            <div className={classes.buttonWrap}>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={onRegister}
                >更新する</Button>
            </div>
        </form>
    )
}

export default PlanRegister;