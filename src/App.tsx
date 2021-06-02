import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';

import { About, Calculator } from './pages';
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
import { Functions, Home } from '@material-ui/icons';

const MatrixToMatrixPath = '/';
const MatrixToScalarPath = '/matrix-to-scalar-calculator';
const AboutPath = '/about';


// Returns a list of items to render in the drawer
const drawerItems = () => (
    <>
        { /* Items within the top section of the drawer */ }
        <List>
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
            <ListItem button key='About' component={ Link } to={ AboutPath }>
                <ListItemIcon><Home/></ListItemIcon>
                <ListItemText primary='About'/>
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
                <TemporaryDrawer screenEdge='left' items={ drawerItems }/>
                <Route exact path={ MatrixToMatrixPath } component={ () => (
                    <Calculator scalar={ false } validOperators={ ['multiply', 'plus', 'minus'] }/>) }/>
                <Route path={ MatrixToScalarPath } component={ () => (
                    <Calculator scalar={ true } validOperators={ ['multiply', 'divide', 'plus', 'minus'] }/>) }/>
                <Route path={ AboutPath } component={ About }/>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
