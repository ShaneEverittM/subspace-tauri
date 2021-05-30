import { Container, Typography } from '@material-ui/core';
import { ReactComponent as SubspaceLogo } from '../resources/logo.svg';

function Splash() {
    return (
        <Container>
            <SubspaceLogo height={ 150 }/>
            <Typography> Welcome! </Typography>
        </Container>
    );
}

export default Splash;