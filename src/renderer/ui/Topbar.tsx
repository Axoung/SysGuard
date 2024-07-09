import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWindowMinimize,
  faWindowMaximize,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import '../style.css';
import icon from '../../../assets/icon.png';

export const Topbar = () => {
  useEffect(() => {
    const minButton = document.getElementById('min-btn');
    const maxButton = document.getElementById('max-btn');
    const closeButton = document.getElementById('close-btn');

    const minimize = () => {
      window.electron.ipcRenderer.minimize();
    };

    const maximize = () => {
      window.electron.ipcRenderer.maximize();
    };

    const close = () => {
      window.electron.ipcRenderer.close();
    };

    if (minButton) {
      minButton.addEventListener('click', minimize);
    }

    if (maxButton) {
      maxButton.addEventListener('click', maximize);
    }

    if (closeButton) {
      closeButton.addEventListener('click', close);
    }

    return () => {
      minButton?.removeEventListener('click', minimize);
      maxButton?.removeEventListener('click', maximize);
      closeButton?.removeEventListener('click', close);
    };
  }, []);

  return (
    <div
      id="title-bar"
      className="flex items-center justify-between h-full mx-4 draggable"
    >
      <div
        id="title"
        className="flex items-center h-full space-x-2 not-draggable"
      >
        <img src={icon} alt="My App" className="h-full p-[2px]" />
        <h1>SysGuard</h1>
      </div>
      <div id="title-bar-btns" className="flex space-x-4 not-draggable">
        <button type="button" id="min-btn" aria-label="Minimize">
          <FontAwesomeIcon icon={faWindowMinimize} />
        </button>
        <button type="button" id="max-btn" aria-label="Maximize">
          <FontAwesomeIcon icon={faWindowMaximize} />
        </button>
        <button type="button" id="close-btn" aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};
