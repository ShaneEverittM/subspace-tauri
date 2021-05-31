import React, { MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SvgIconComponent } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

type ButtonPairProps = {
    LeftComponent: SvgIconComponent,
    RightComponent: SvgIconComponent
    onLeftButtonClick: (e: MouseEvent<HTMLButtonElement>) => void,
    onRightButtonClick: (e: MouseEvent<HTMLButtonElement>) => void,
}

function ButtonPair({LeftComponent, onLeftButtonClick, RightComponent, onRightButtonClick}: ButtonPairProps) {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <ButtonGroup color='primary' aria-label='outlined primary button group'>
                <Button onClick={ onLeftButtonClick }>
                    <LeftComponent/>
                </Button>
                <Button onClick={ onRightButtonClick }>
                    <RightComponent/>
                </Button>
            </ButtonGroup>

        </div>
    );
}

export default ButtonPair;