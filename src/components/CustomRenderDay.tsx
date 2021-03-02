import React, { useEffect } from 'react';
import { IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { Dayjs } from 'dayjs'
import { SchedulesState } from '@/reducks/schedules/types';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        fontSize: '0.75rem',
        width: 36,
        height: 36,
        margin: '0 2px',
        padding: 0,
        fontWeight: 500,
        color: (props: StyleProps) => props.color(),
        position: 'relative',
        backgroundColor: (props: StyleProps) => props.bgColor(theme.palette.primary.main),
        '&:hover': {
            backgroundColor: (props: StyleProps) => props.bgColor(theme.palette.primary.light, 'rgba(0, 0, 0, 0.04)')
        }
    },
    badge: {
        width: '5px',
        position: 'absolute',
        height: '5px',
        bottom: 5,
        backgroundColor: 'red',
        borderRadius: '50%'
    }
}))

interface StyleProps {
    color: (dispayColor?: string, elseColor?: string) => string;
    bgColor: (dispayColor: string, elseColor?: string) => string;
}

interface Props {
    day: Dayjs,
    selectedDate: Dayjs,
    dayInCurrentMonth: boolean
    scheduleDate?: Dayjs,
    today: Dayjs;
}

const CustomRenderDay: React.FC<Props> = ({
    day,
    selectedDate,
    dayInCurrentMonth,
    scheduleDate,
    today,
}) => {
    const format = 'YYYY/MM/DD'
    const displayDate = dayInCurrentMonth ? day.get('date') : undefined
    const color = (dispayColor = "rgba(60, 60, 60, 0.87)", elseColor = 'rgba(0, 0, 0, 0.87)') => {
        if(today.format(format) === day.format(format)){
            return dispayColor
        } else {
            return elseColor
        }
    }

    const bgColor = (displayColor: string, elseColor: string = 'inherit') => {
        if(selectedDate.format(format) === day.format(format)){
            return displayColor
        } else {
            return elseColor;
        }
    }
    const isDisplayBadge = scheduleDate && scheduleDate.format(format) === day.format(format)
    
    const classes = useStyles({
        color: color,
        bgColor: bgColor
    });

    return (
        <IconButton
            className={classes.icon}
            disabled={displayDate === undefined}
        >
            {displayDate}
            {isDisplayBadge && (
                <span
                    className={classes.badge}
                />
            )}
        </IconButton>
    )
}

export default CustomRenderDay;