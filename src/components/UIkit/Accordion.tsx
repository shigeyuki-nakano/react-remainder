import React, { useState, useEffect } from 'react';
import {
    Switch,
    TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    switchForm: {
        width: '100%',

    },
    check: {
        marginLeft: 'auto'
    },
    checkWrap: {
        marginLeft: 'auto'
    },
    accordion: {
        width: '100%',
        boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        padding: '0 5px'
    },
    summary: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    label: {},
    displayValue: {
        // position: 'absolute',
        // bottom: 0,
        // left: 3,
        position: 'relative',
        top: -9,
        fontSize: 12,
        color: '#aaa'
    }
})

interface Props {
    name: string;
    label: string;
    isChecked?: boolean;
    onCheck?: () => void;
    onUnCheck?: () => void;
    children: React.ReactNode;
    displayValue?: string;
}

const Accordion: React.FC<Props> = ({
    name,
    label,
    isChecked,
    onCheck,
    onUnCheck,
    children,
    displayValue
}) => {
    const classes = useStyles();
    const [check, setCheck] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const onSwitchChange = () => {
        setCheck( ! check)
        setOpen( ! check);
    }

    useEffect(() => {
        if(isChecked !== undefined) {
            setCheck(isChecked)
        }
    }, [isChecked]);

    useEffect(() => {
        if(onCheck !== undefined) {
            check && onCheck()
        }
        if(onUnCheck !== undefined) {
            if( ! check) {
                onUnCheck();
                open && setOpen(false)
            }
        }
    }, [check])

    return (
        <div className={classes.accordion}>
            <div
                className={classes.summary}
                onClick={() => check && setOpen( ! open)}
            >
                <div className={classes.label}>{label}</div>
                <div className={classes.checkWrap}>
                    <Switch
                        checked={check}
                        onChange={onSwitchChange}
                        className={classes.check}
                        name={name}
                    />
                </div>
            </div>
            <div className={classes.displayValue}>{displayValue}</div>
            <div style={{height: open? 'auto': 0}}>
                {children}
            </div>
        </div>
    )
}

export default Accordion;