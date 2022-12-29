import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={styles.galleryItem} onClick={() => {this.props.setLargeImgURL(this.props.largeImgURL)}}>
        <img src={this.props.smallImgURL} alt={this.props.id} />
      </li>
    );
  }
}


ImageGalleryItem.propTypes = {
  smallImgURL: PropTypes.string.isRequired,
};
