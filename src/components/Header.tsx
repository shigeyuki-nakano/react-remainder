import React, { useMemo } from 'react';
import {
    IconButton,
    Link,
    Theme,
    Badge
} from '@material-ui/core';
import {
    Delete as DeleteIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { STYLES } from '@/constants';
import { State } from '@/reducks/stores/types';
import { getPickMode, getPickSchedules } from '@/reducks/pickSchedules/selectors';
import {
    emptyPickSchedulesAction,
    quitAction,
    switchPickModeAction
} from '@/reducks/pickSchedules/actions';
import { useLocation } from 'react-router-dom'
import { deleteSchedule } from '@/reducks/schedules/operations';

const useStyles = makeStyles((theme: Theme) => ({
    wrap: {
        width: '100%',
        height: STYLES.headerHeight,
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        top: 0,
        background: 'white',
        zIndex: STYLES.headerZIndex
    },
    container: {
        width: '95%',
        maxWidth: STYLES.maxWidth,
        position: 'relative',
        fontSize: 18,
        display: 'flex',
        justifyContent: 'space-between',
    },
    positionRight: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    positionLeft: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        color: theme.palette.primary.dark
    },
    delete: {
        color: 'red'
    },
    edit: {
        color: '#a1f542'
    },
    title: {
        textAlign: 'center',
        fontSize: '0.9em',
        width: '100%',
        fontWeight: 'bold'
    }
}))

const Header: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const selector = useSelector(state => state) as State;
    const isPickMode = getPickMode(selector);
    const pickSchedules = getPickSchedules(selector);
    const title = useMemo(() => {
        console.log(pathname)
        switch(true) {
            case /^\/schedules\/edit\/.+$/.test(pathname):
                return 'スケジュールの編集';
            case /^\/schedules\/register$/.test(pathname):
                return 'スケジュールの登録';
            case /^\/$/.test(pathname):
                return 'スケジュール一覧';
            case /^\/schedules\/.+$/.test(pathname):
                return '詳細';
            case /^\/calender$/.test(pathname):
                return 'カレンダー';
            case /^\/options$/.test(pathname):
                return 'オプション'
        }
    }, [pathname])

    const onDeleteClick = () => {
        if(isPickMode) {
            if(pickSchedules.length !== 0) {
                const result = confirm(`${pickSchedules.length}個削除します。よろしいですか？`);
                if(result) {
                    const ids = pickSchedules.map((s) => s.id);
                    // タスクの削除処理
                    dispatch(deleteSchedule(ids));
                } else {
                    dispatch(emptyPickSchedulesAction())
                }
            }
            
            dispatch(quitAction());
        } else {
            dispatch(switchPickModeAction());
        }
    }

    const onCancelClick = () => {
        dispatch(quitAction());
    }

    return (
        <header className={classes.wrap}>
            <div className={classes.container}>
                {pathname === '/' && (
                    <>
                    {isPickMode && (
                        <div className={classes.positionLeft}>
                            <Link
                                href="#"
                                onClick={onCancelClick}
                            >キャンセル</Link>
                        </div>
                    )}
                    </>
                )}
                <div className={classes.title}>{title}</div>
                {pathname === '/' && (
                    <>
                    <div className={classes.positionRight}>
                        <IconButton
                            onClick={onDeleteClick}
                        >
                            <Badge badgeContent={pickSchedules.length}>
                                <DeleteIcon
                                    className={isPickMode ? classes.delete : ''}
                                />
                            </Badge>
                        </IconButton>
                    </div>
                    </>
                )}   
            </div>
        </header>
    )
}

export default Header;