import React, { KeyboardEvent, MouseEvent, useState } from 'react';
import clsx from 'clsx';

import { Button, Drawer, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

type ScreenEdge = 'top' | 'left' | 'bottom' | 'right';

type TemporaryDrawerProps = {
    screenEdge: ScreenEdge
    items: () => JSX.Element
}

function TemporaryDrawer({screenEdge, items}: TemporaryDrawerProps) {
    const classes = useStyles();
    const [openState, setOpenState] = useState(false);

    // Wraps the items so that clicking anywhere closes the drawer
    const wrapItems = () => (
        // Set classname depending on orientation
        <div
            className={ clsx(classes.list, {
                [classes.fullList]: screenEdge === 'top' || screenEdge === 'bottom',
            }) }
            role='presentation'
            onClick={ makeClickHandler('close') }
            onKeyDown={ makeClickHandler('close') }
        >
            { items() }
        </div>
    );


    // Returns a function that when called sets open state to the given state
    const makeClickHandler = (action: 'open' | 'close') => (event: KeyboardEvent | MouseEvent) => {
        // If it's a keydown event, do nothing
        if (
            event.type === 'keydown' &&
            ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        // Otherwise update state
        setOpenState(action === 'open');
    };


    return (
        <div>
            <Button onClick={ makeClickHandler('open') }><Menu/></Button>
            { /* This anchor prop sets the actual position */ }
            <Drawer anchor={ screenEdge } open={ openState }
                    onClose={ makeClickHandler('close') }>
                { wrapItems() }
            </Drawer>
        </div>
    );
}

export default TemporaryDrawer;
