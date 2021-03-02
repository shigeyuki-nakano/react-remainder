import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { AddIcon } from '@/components/UIkit';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
    wrap: {
        position: 'fixed',
        bottom: 100,
        right: 20,
        boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.4)',
        borderRadius: '50%',
        background: 'white'
    }
});

const FloatingBtn: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onBtnClick = () => {
        dispatch(push('/schedules/register'));
    }

    return (
        <div className={classes.wrap}>
            <AddIcon onClick={onBtnClick}/>
        </div>
    )
}

export default FloatingBtn;