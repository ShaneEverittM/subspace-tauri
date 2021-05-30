import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';

import { Calculator, Splash } from './pages';
import { TemporaryDrawer } from './components';

import {
    Container,
    createMuiTheme,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider
} from '@material-ui/core';
import { Functions, Home, Settings } from '@material-ui/icons';


// Returns a list of items to render in the drawer
const drawerItems = () => (
    <>
        { /* Items within the top section of the drawer */ }
            <List>
                <ListItem button key='Home' component={ Link } to='/'>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary='Home'/>
                </ListItem>
                <ListItem button key='Matrix-to-Matrix Calculator' component={ Link } to='/mtmcalculator'>
                    <ListItemIcon><Functions/></ListItemIcon>
                    <ListItemText primary='Matrix-to-Matrix Calculator'/>
                </ListItem>
                <ListItem button key='Matrix-to-Scalar Calculator' component={ Link } to='/mtscalculator'>
                    <ListItemIcon><Functions/></ListItemIcon>
                    <ListItemText primary='Matrix-to-Scalar Calculator'/>
                </ListItem>
            </List>
        <Divider/>
        { /* Items within the bottom section of the drawer */ }
        <List>
            <ListItem button key='Settings'>
                <ListItemIcon><Settings/></ListItemIcon>
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
                    <Route path='/mtmcalculator' component={ () => (
                        <Calculator scalar={ false } operators={ ['multiply', 'plus', 'minus'] } dimension={ 3 }/>) }/>
                    <Route path='/mtscalculator' component={ () => (
                        <Calculator scalar={ true } operators={ ['multiply', 'divide', 'plus', 'minus'] }
                                    dimension={ 3 }/>) }/>
                </Container>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
