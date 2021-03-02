import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { STYLES } from '@/constants';

const useStyles = makeStyles({
    main: {
        padding: `${STYLES.headerHeight}px 10px ${STYLES.footerHeight}px`,
    }
})

interface Props {
    children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
    const classes = useStyles();
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
}

export default Main