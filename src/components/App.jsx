import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';


export default class App extends Component {
  state = {
    URL: 'https://pixabay.com/api/',
    API_KEY: '25766392-01b12b6ed5ab34bc2910d9c3e',
    pictures: [],
    error: '',
    status: 'idle',
    page: 1,
    query: '',
    totalHits: null,
    largeImgURL: '',
  };

  fetchImg = () => {
    return fetch(
      `${this.state.URL}?q=${this.state.query}&page=${this.state.page}&key=${this.state.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...pictures.hits],
            status: 'resolved',
            totalHits: pictures.total,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query || prevState.page !== this.state.page) {
      this.setState({ status: 'pending'});
      this.fetchImg();
    }
    // if (
    //   this.state.query === prevState.query &&
    //   this.state.page !== prevState.page
    // ) {
    //   this.setState({ status: 'pending' });
    //   this.fetchImg();
    // }
  }

  processSubmit = query => {
    this.setState({ query, page: 1, pictures: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  setLargeImgURL = (largeImgURL) => {
  this.setState({largeImgURL})
  }

  render() {
    const { pictures, status, totalHits } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.processSubmit} />
        {pictures.length > 0 && <ImageGallery images={pictures} setLargeImgURL = {this.setLargeImgURL} />}
        {totalHits > pictures.length && (
          <Button onClick={this.handleLoadMore} />
        )}
        {status === 'pending' && <Loader />}
        {this.state.largeImgURL && <Modal onClose={this.setLargeImgURL} pic={this.state.largeImgURL} />}
        <ToastContainer autoClose={5000} />
      </>
    );
  }
}
