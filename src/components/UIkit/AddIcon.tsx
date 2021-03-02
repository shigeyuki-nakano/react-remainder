import React from 'react';
import {
    IconButton,
    Theme,
    Tooltip
} from '@material-ui/core'
import {
    Edit as EditIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        color: theme.palette.primary.main,
        position: 'relative',
        top: 4,
        left: 4
    },
    iconButton: {
        position: 'relative'
    },
    plusIcon: {
        width: 12,
        height: 3,
        background: theme.palette.primary.main,
        position: 'absolute',
        display: 'inline-block',
        top: 18,
        left: 14,
        borderRadius: 4
    },
    plusIconTate: {
        transform: 'rotate(-90deg)',
    }
}));

interface Props {
    onClick: () => void;
}

/**
 * 予定を追加するときのアイコンボタン
 * @param onClick
 */

const AddIcon: React.FC<Props> = ({onClick}) => {
    const classes = useStyles();
    return (
        <Tooltip title='予定を追加'>
            <IconButton
                className={classes.iconButton}
                onClick={onClick}
                aria-label='予定を追加'
            >
                <span className={classes.plusIcon}/>
                <span className={`${classes.plusIcon} ${classes.plusIconTate}`}/>
                <EditIcon className={classes.icon}/>
            </IconButton>
        </Tooltip>
    )
}

export default AddIcon