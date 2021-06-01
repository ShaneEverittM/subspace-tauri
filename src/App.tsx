import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';

import { Calculator, Splash } from './pages';
import { TemporaryDrawer } from './components';

import {
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

const MatrixToMatrixPath = '/matrix-to-matrix-calculator';
const MatrixToScalarPath = '/matrix-to-scalar-calculator';


// Returns a list of items to render in the drawer
const drawerItems = () => (
    <>
        { /* Items within the top section of the drawer */ }
        <List>
            <ListItem button key='Home' component={ Link } to='/'>
                <ListItemIcon><Home/></ListItemIcon>
                <ListItemText primary='Home'/>
            </ListItem>
            <ListItem button key='Matrix-to-Matrix Calculator' component={ Link } to={ MatrixToMatrixPath }>
                <ListItemIcon><Functions/></ListItemIcon>
                <ListItemText primary='Matrix-to-Matrix Calculator'/>
            </ListItem>
            <ListItem button key='Matrix-to-Scalar Calculator' component={ Link } to={ MatrixToScalarPath }>
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
                {/*<Container style={ {padding: 'unset', display: 'flex', justifyContent: 'flex-start'} }>*/ }
                <TemporaryDrawer screenEdge='left' items={ drawerItems }/>
                {/*</Container>*/ }
                <Route exact path='/' component={ Splash }/>
                <Route path={ MatrixToMatrixPath } component={ () => (
                    <Calculator scalar={ false } validOperators={ ['multiply', 'plus', 'minus'] }/>) }/>
                <Route path={ MatrixToScalarPath } component={ () => (
                    <Calculator scalar={ true } validOperators={ ['multiply', 'divide', 'plus', 'minus'] }/>) }/>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
