import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { ReactComponent as SubspaceLogo } from '../resources/logo.svg';
import { ExternalLink } from '../components';
import shane from '../resources/shane.jpeg';
import elliott from '../resources/elliott.jpeg';

function About() {

    const link = (url: string, text: string) => <ExternalLink url={ url }>{ text }</ExternalLink>;

    return (
        <Container>
            <Box style={ {display: 'flex', flexDirection: 'column', justifyContent: 'space-between'} }>
                <Box style={ {display: 'flex', flexDirection: 'row'} }>
                    <SubspaceLogo style={ {margin: '10px'} }/>
                    <Box>
                        <Typography variant='h3' component='h1'>
                            About
                        </Typography>
                        <Typography>
                            Subspace is developed by Elliott Allison and Shane Murphy. Its purpose was to learn about
                            app development and to utilize the up and
                            coming { link('https://tauri.studio/en/', 'Tauri ') } toolkit.
                            What makes it special is its ability to be cross-platform, yet still leverage hardware
                            acceleration by using runtime cpu detection. Its lack of a need for an internet connection
                            and
                            simple
                            UI targets it towards students or educators.
                        </Typography>
                        <br/>
                        <Typography>
                            More info can be found
                            at { link('https://github.com/ShaneEverittM/subspace-tauri', 'our GitHub') }
                        </Typography>
                    </Box>
                </Box>
                <Box style={ {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingTop: '100px'
                } }>
                    <Box style={ {display: 'flex', flexDirection: 'column', alignItems: 'center'} }>
                        <img src={ shane } alt='Shane'/>
                        <br/>
                        <Typography>Shane Murphy</Typography>
                        <br/>
                        <Typography>
                            <ExternalLink url='https://github.com/ShaneEverittM'>
                                Github
                            </ExternalLink>
                        </Typography>
                    </Box>
                    <Box style={ {display: 'flex', flexDirection: 'column', alignItems: 'center'} }>
                        <img src={ elliott } alt='Elliott'/>
                        <br/>
                        <Typography>Elliott Allison</Typography>
                        <br/>
                        <Typography>
                            <ExternalLink url='https://github.com/TheyCallMeE'>
                                Github
                            </ExternalLink>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default About;