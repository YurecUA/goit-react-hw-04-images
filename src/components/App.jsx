import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';

const API_KEY = '25766392-01b12b6ed5ab34bc2910d9c3e';
const URL = 'https://pixabay.com/api/';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [largeImgURL, setLargeImgURL] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImg = () => {
      setStatus('pending');
    return fetch(
      `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Failed to find any images'));
      })
      .then(pictures => {
        if (!pictures.total) {
          toast.error('Did find anything, mate');
        }
        setPictures((prevState) => {
          return [...prevState, ...pictures.hits];
        })
        setTotalHits(pictures.total);
        setStatus('fullfiled');
      })
      .catch(error => { setStatus('rejected'); setError(error)});
    };
    fetchImg();
  }, [query, page])

  const processSubmit = query => {
    setPictures([]);
    setPage(1);
    setQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const setImageModalURL = (largeImgURL) => {
  setLargeImgURL(largeImgURL)
  }

    return (
      <>
        <Searchbar onSubmit={processSubmit} />
        {pictures.length > 0 && <ImageGallery images={pictures} setLargeImgURL = {setImageModalURL} />}
        {totalHits > pictures.length && (
          <Button onClick={handleLoadMore} />
        )}
        {status === 'pending' && <Loader />}
        {largeImgURL && <Modal onClose={setImageModalURL} pic={largeImgURL} />}
        <ToastContainer autoClose={5000} />
      </>
    );
  }
