import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Modal({ onClose }) {
    return (
        <div className='modal'>
            <p>App installed!</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

function Footer() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInstallButtonClick = () => {
        setIsModalOpen(true);
    };

    return (
        <footer>
            <button onClick={handleInstallButtonClick} className="btn-small" id="buttonInstall" role="button">Install App</button>
            <h4>&copy; {new Date().getFullYear()} My Game Shelf</h4>
            {isModalOpen && ReactDOM.createPortal(<Modal onClose={() => setIsModalOpen(false)} />, document.getElementById('modal-root'))}
        </footer>
    );
}

export default Footer;