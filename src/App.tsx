import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import { ArithmeticCalculator, Splash } from './pages';
import { TemporaryDrawer } from './components';
import {
    Container,
    createMuiTheme,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import FunctionsIcon from '@material-ui/icons/Functions';
import SettingsIcon from '@material-ui/icons/Settings';


// Returns a list of items to render in the drawer
const drawerItems = () => (
    <>
        { /* Items within the top section of the drawer */ }
        <List>
            <ListItem button key='Home' component={ Link } to='/'>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary='Home'/>
            </ListItem>
            <ListItem button key='Calculator' component={ Link } to='/arithmetic-calculator'>
                <ListItemIcon><FunctionsIcon/></ListItemIcon>
                <ListItemText primary='Calculator'/>
            </ListItem>
        </List>
        <Divider/>
        { /* Items within the bottom section of the drawer */ }
        <List>
            <ListItem button key='Settings'>
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary='Settings'/>
            </ListItem>
        </List>
    </>
);

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

function App() {
    return (
        <ThemeProvider theme={ theme }>
            { /* More consistent CSS*/ }
            <CssBaseline/>
            { /* Multiple pages */ }
            <HashRouter>
                <Container style={ {padding: 'unset', display: 'flex', justifyContent: 'flex-start'} }>
                    <TemporaryDrawer screenEdge='left' items={ drawerItems }/>
                </Container>
                <Container>
                    <Route exact path='/' component={ Splash }/>
                    <Route path='/arithmetic-calculator' component={ () => (<ArithmeticCalculator dimension={ 3 }/>) }/>
                </Container>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
