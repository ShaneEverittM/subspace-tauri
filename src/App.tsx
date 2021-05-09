import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { ArithmeticCalculator, Splash } from './pages';
import { TemporaryDrawer } from './components';
import { Container, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


// Returns a list of items to render in the drawer
const drawerItems = () => (
    <>
        { /* Items within the top section of the drawer */ }
        <List>
            { ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={ text }>
                    <ListItemIcon>{ index % 2 === 0 ? <InboxIcon/> : <MailIcon/> }</ListItemIcon>
                    <ListItemText primary={ text }/>
                </ListItem>
            )) }
        </List>
        <Divider/>
        { /* Items within the bottom section of the drawer */ }
        <List>
            { ['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={ text }>
                    <ListItemIcon>{ index % 2 === 0 ? <InboxIcon/> : <MailIcon/> }</ListItemIcon>
                    <ListItemText primary={ text }/>
                </ListItem>
            )) }
        </List>
    </>
);

function App() {
    return (
        <HashRouter>
            <Container>
                <TemporaryDrawer screenEdge='left' items={ drawerItems }/>
            </Container>
            <Container>
                <Route exact path='/' component={ Splash }/>
                <Route path='/arithmetic-calculator' component={ ArithmeticCalculator }/>
            </Container>
        </HashRouter>
    );
}

export default App;
