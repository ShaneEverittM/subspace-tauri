import { Link } from '@material-ui/core';
import { open } from '@tauri-apps/api/shell';
import React, { FunctionComponent } from 'react';

type ExternalLinkProps = {
    url: string,
}

const ExternalLink: FunctionComponent<ExternalLinkProps> = ({url, children}) => {
    return (
        <Link component='button' variant='body1' onClick={ async () => await open(url) }>
            { children }
        </Link>
    );
};

export default ExternalLink;