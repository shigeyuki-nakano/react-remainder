import React from 'react';
import { makeStyles } from '@material-ui/styles'
import {
    Theme,
    IconButton,
    Tooltip,
    Badge
} from '@material-ui/core';
import {
    EventNote as EventNoteIcon,
    List as ListIcon,
    Settings as SettingsIcon
} from '@material-ui/icons';import { STYLES } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { State } from '@/reducks/stores/types';
import { getScheduleLength } from '@/reducks/schedules/selectors';

const useStyles = makeStyles((theme: Theme) => ({
    wrap: {
        width: '100%',
        height: STYLES.footerHeight,
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.4)',
        background: 'white'
    },
    container: {
        width: '95%',
        fontSize: 18,
        maxWidth: STYLES.maxWidth,
        display: 'flex',
        justifyContent: 'space-around'
    },
    icon: {
        fontSize: 25
    },
    link: {
        display: 'block',
        width: '100%',
        textAlign: 'center'
    }
}))

const Footer: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state) as State;
    const scheduleLength = getScheduleLength(selector);

    return (
        <footer className={classes.wrap}>
            <div className={classes.container}>
                <a
                    className={classes.link}
                    onClick={() => dispatch(push('/calender'))}
                >
                    <Tooltip title="カレンダー">
                        <IconButton aria-label="カレンダー">
                            <EventNoteIcon className={classes.icon}/>
                        </IconButton>
                    </Tooltip>
                </a>
                <a
                    className={classes.link}
                    onClick={() => dispatch(push('/'))}
                >
                    <Tooltip title='予定リスト'>
                        <IconButton aria-label='予定リスト'>
                            <Badge badgeContent={scheduleLength} color='secondary'>
                                <ListIcon className={classes.icon}/>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </a>
                <a
                    className={classes.link}
                    onClick={() => dispatch(push('/options'))}
                >
                    <Tooltip title='オプション設定'>
                        <IconButton aria-label='オプション設定'>
                            <SettingsIcon className={classes.icon}/>
                        </IconButton>
                    </Tooltip>
                </a>
            </div>
        </footer>
    )
}

export default Footer;