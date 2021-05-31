import React from 'react';
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
    Left: SvgIconComponent,
    Right: SvgIconComponent
    onLeft: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void,
    onRight: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void,
}

function ButtonPair({Left, onLeft, Right, onRight}: ButtonPairProps) {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <ButtonGroup color='primary' aria-label='outlined primary button group'>
                <Button onClick={ onLeft }><Left/></Button>
                <Button onClick={ onRight }><Right/></Button>
            </ButtonGroup>

        </div>
    );
}

export default ButtonPair;