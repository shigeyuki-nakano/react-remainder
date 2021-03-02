import React, { useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs'
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import {
    // DatePicker,
    TimePicker,
    Calendar
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/styles';
import { Accordion } from '@/components/UIkit';
import { saveSchedule } from '@/reducks/schedules/operations';
import { dateTranslater } from '@/functions';

const useStyles = makeStyles({
    buttonWrap: {
        textAlign: 'center'
    },
    form: {
        paddingBottom: 50
    }
})

const PlanRegister: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
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

    return (
        <form className={classes.form}>
            <TextField
                fullWidth
                label='タイトル'
                type='text'
                name='title'
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
                onBlur={onBlur}
            />
            <div className='module-spacer'/>
            <Accordion
                name='date'
                label='日付'
                isChecked={resultValues['date'] !== undefined}
                onCheck={() => changeState({date: dayjs()})}
                onUnCheck={() => {
                    const value = resultValues['time'] !== undefined
                        ?{date: undefined, time: undefined}
                        :{date: undefined}
                    changeState(value)
                }}
                displayValue={resultValues['date'] && dateTranslater(resultValues['date'])}
            >
                <Calendar
                    date={resultValues['date'] || dayjs()}
                    onChange={(date) => changeState({date: date as Dayjs})}
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
                displayValue={(resultValues['time'] as Dayjs)?.format('H時 m分')}
            >
                <TimePicker
                    autoOk
                    fullWidth
                    label='時間'
                    format='H時 m分'
                    name='time'
                    value={resultValues['time']}
                    onChange={(date) => changeState({time: date as Dayjs})}
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
                    onBlur={onBlur}
                />
            </Accordion>
            <div className='module-spacer'/>
            <div className={classes.buttonWrap}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onRegister}
                >登録する</Button>
            </div>
        </form>
    )
}

export default PlanRegister;