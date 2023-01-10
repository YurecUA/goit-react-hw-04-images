import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const modalRoot = document.querySelector('#modalRoot');

export const Modal = ({ onClose, pic }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        return onClose('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);
const handleClick = (event) => {
      if (event.target === event.currentTarget) {
        return onClose('');
      }
    }
    return createPortal(
      <div className={styles.overlay} onClick={handleClick}>
        <div className={styles.modal}>
          <img src={pic} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  pic: PropTypes.string.isRequired,
};
