import React, {
    useState,
    useEffect
} from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Tooltip
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getPickMode } from '@/reducks/pickSchedules/selectors';
import { fetchSchedules } from '@/reducks/schedules/operations';
import { AddIcon } from '@/components/UIkit';
import { SchedulesState } from '@/reducks/schedules/types';
import { State } from '@/reducks/stores/types';
import { getSchedules } from '@/reducks/schedules/selectors';
import { push } from 'connected-react-router';
import { addPickScheduleAction, removePickScheduleAction } from '@/reducks/pickSchedules/actions';

const useStyles = makeStyles({
    listText: {
        borderBottom: '1px solid gray',
        width: '100%'
    },
    listItem: {
        display: 'flex',
        height: 60,
    },
    checkBtn: {
        padding: 0
    },
    secondaryAction: {
        paddingBottom: 10
    },
    addIconWrap: {
        marginTop: 30,
        textAlign: 'center'
    },
})

const ScheduleList: React.FC = () => {
    const classes = useStyles();
    const selector = useSelector(state => state) as State;
    const dispatch = useDispatch();
    const isDeleteMode = getPickMode(selector);
    const schedules = getSchedules(selector)
    const [check, setCheck] = useState<{[id: string]: boolean}>({})

    useEffect(() => {
        dispatch(fetchSchedules());
    }, [])

    useEffect(() => {
        if(schedules.length > 0) {
            let newChecks = {};
            for(let s of schedules) {
                Object.assign(newChecks, {[s.id]: false});
            }
            setCheck(newChecks);
        }
    }, [schedules]);

    return (
        <>
        <List>
            {schedules.map((schedule) => (
                <div
                    className={classes.listItem}
                    key={schedule.id}
                >
                    {isDeleteMode && (
                        <IconButton
                            className={classes.checkBtn}
                        >
                            <Checkbox
                                checked={check[schedule.id]}
                                onClick={() => {
                                    const isChecked = check[schedule.id];
                                    if( ! isChecked) {
                                        dispatch(addPickScheduleAction(schedule))
                                    } else {
                                        dispatch(removePickScheduleAction(schedule))
                                    }
                                    setCheck((bef) => ({
                                        ...bef,
                                        [schedule.id]: ! isChecked
                                    }))
                                }}
                            />
                        </IconButton>
                    )}
                    <ListItem
                        button
                        className={classes.listText}
                        ContainerProps={{style: {width: '100%'}}}
                        onClick={() => dispatch(push(`/schedules/${schedule.id}`))}
                    >
                        <ListItemText primary={schedule.title}/>
                        <ListItemSecondaryAction className={classes.secondaryAction}>
                            <Tooltip title='予定の編集'>
                                <IconButton
                                    onClick={() => dispatch(push(`/schedules/edit/${schedule.id}`))}
                                    aria-label='予定の編集'
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            ))}
        </List>
        <div className={classes.addIconWrap}>
            <AddIcon onClick={() => dispatch(push('/schedules/register'))}/>
        </div>
        </>
    )
}

export default ScheduleList;