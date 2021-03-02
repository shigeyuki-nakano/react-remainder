import React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.grey['100'],
        minHeight: '100vh'
    },
    container: {
        position: 'relative',
        background: 'white',
        minHeight: 'inherit',
        width: 450,
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    }
}))

interface Props {
    children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.wrap}>
            <div className={classes.container}>
                {children}
            </div>
        </div>
    )
}

export default Wrapper;