import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {
    Calendar
} from '@material-ui/pickers';
import {
    List,
    ListItem,
    ListItemText
} from '@material-ui/core'
import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux';
import CustomRenderDay from '@/components/CustomRenderDay';
import { getSchedules } from '@/reducks/schedules/selectors'
import { fetchSchedules } from '@/reducks/schedules/operations';
import { State } from '@/reducks/stores/types';
import dayjs, { Dayjs } from 'dayjs'
import { SchedulesState } from '@/reducks/schedules/types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    listItem: {
        height: 50,
    },
    listColor: {
        height: '100%',
        width: 5,
        marginRight: 5,
        backgroundColor: (props: StyleProps) => props.listColor,
    },
    list: {
        width: '90%',
        margin: '0 auto'
    }
})

interface StyleProps {
    listColor: string;
}

const Calender: React.FC = () => {
    const today = dayjs()
    const classes = useStyles({
        listColor: 'red'
    });
    const selector = useSelector(state => state) as State;
    const dispatch = useDispatch()
    const schedules = getSchedules(selector);
    const [date, setDate] = useState<Dayjs>(today),
          [currentMonthSchedules, setCurrentMonthSchedules] = useState<SchedulesState>([]),
          [currentDateSchedules, setCurrentDateSchedules] = useState<SchedulesState>([]);

    const getCurrentMonthSchedules = useCallback((changedMonth?: Dayjs) => {
        const currentMonth = changedMonth || date
        const newCurrentMonthSchedules = schedules.filter((s) => {
            if(s.date && s.date.format('YYYY/MM') === currentMonth.format('YYYY/MM')) {
                return s
            }
        })
        setCurrentMonthSchedules(newCurrentMonthSchedules);
    }, [schedules, date, setCurrentMonthSchedules])

    useEffect(() => {
        dispatch(fetchSchedules());
    }, [])

    useEffect(() => {
        if(schedules.length > 0) {
            getCurrentMonthSchedules()
        }
    }, [schedules]);

    useEffect(() => {
        if(currentMonthSchedules.length > 0) {
            const newCurrentDateSchedules = currentMonthSchedules.filter((s) => {
                if(date.format('YYYY/MM/DD') === s['date']?.format('YYYY/MM/DD')) {
                    return s
                }
            })
            setCurrentDateSchedules(newCurrentDateSchedules)
        }
    }, [date, currentMonthSchedules]);
   
    return (
        <div>
            <Calendar
                date={date}
                onChange={(date) => setDate(date as Dayjs)}
                renderDay={(day, selectedDate, dayInCurrentMonth) => {
                    const scheduleDate = (() => {
                        if(currentMonthSchedules.length > 0) {
                            for(let s of currentMonthSchedules) {
                                if(s.date && s.date.format('YYYY/MM/DD') === day?.format('YYYY/MM/DD')) {
                                    return s.date;
                                }
                            }
                        }
                    })();
                    return (
                        <CustomRenderDay
                            today={today}
                            day={day as Dayjs}
                            selectedDate={selectedDate as Dayjs}
                            dayInCurrentMonth={dayInCurrentMonth}
                            scheduleDate={scheduleDate}
                        />
                    )
                }}
                onMonthChange={(date) => {
                    getCurrentMonthSchedules(date || undefined)
                    setCurrentDateSchedules([])
                }}
            />
            {currentDateSchedules.length > 0 && (
                <List className={classes.list}>
                    {currentDateSchedules.map((schedule) => (
                        <ListItem
                            className={classes.listItem}
                            key={schedule.id}
                            onClick={() => dispatch(push(`/schedules/${schedule['id']}`))}
                            button
                        >
                            <span className={classes.listColor}/>
                            <ListItemText>{schedule.title}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    )
}

export default Calender;