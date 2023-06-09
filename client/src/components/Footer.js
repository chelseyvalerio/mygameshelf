import React from 'react';

function Footer() {
    return (
        <footer>
            <button className="btn-small" id="buttonInstall" role="button">Install App</button>
            <h4>&copy; {new Date().getFullYear()} My Game Shelf</h4>
        </footer>
    );
}

export default Footer;