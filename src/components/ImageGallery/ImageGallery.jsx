import React, { Component } from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, setLargeImgURL }) => {
  return <ul className={styles.gallery} >
          {images.map(img => {
            return (
              <ImageGalleryItem
                key={img.tags}
                smallImgURL={img.webformatURL}
                largeImgURL={img.largeImageURL}
                setLargeImgURL={setLargeImgURL}
              />
            );
          })}
        </ul>
}



ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
