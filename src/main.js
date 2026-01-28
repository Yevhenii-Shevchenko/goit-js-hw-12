import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImageByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector(`.form`);
const loadMoreButton = document.querySelector('.load-more-button');


let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const per_page = 15;


form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchInput = form.querySelector('input[name="search-text"]');
  const searchQuery = searchInput.value.trim();

  searchInput.value = '';

  
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }


  currentPage = 1;
  currentQuery = searchQuery;

  
  hideLoadMoreButton();

  
  clearGallery();

  
  showLoader();

  try {
   
    const response = await getImageByQuery(currentQuery, currentPage);
    totalHits = response.totalHits;

   
    hideLoader();

    if (!response.hits || response.hits.length === 0) {
      iziToast.info({
        title: 'info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(response.hits);

    const loadedImages = currentPage * per_page;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'info',
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: error.message || 'Failed to fetch images. Please try again.',
      position: 'topRight',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const response = await getImageByQuery(currentQuery, currentPage);

    hideLoader();

    if (!response.hits || response.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(response.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const loadedImages = currentPage * per_page;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();

    iziToast.error({
      title: 'Error',
      message: error.message || 'Failed to fetch images. Please try again.',
      position: 'topRight',
    });
  }
});