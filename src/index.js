import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './pixaby_api.js';
import { renderGallery } from './render.js';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const guard = document.querySelector('.guard');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.addEventListener('click', handleLoadMore);
loadMoreButton.classList.add('hidden');


function handleLoadMore() {
  pageToFetch++;
  getImages(queryToFetch, pageToFetch);
}


searchForm.addEventListener('submit', handleSubmit);

let pageToFetch = 1;
let queryToFetch = '';

// infinitive scroll

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        getImages(queryToFetch, pageToFetch);
      }
    });
  },
  { rootMargin: '200px' }
);

// initiate lightbox library
const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

async function getImages(query, page) {
  try {
    const data = await fetchImages(query, page);

    // if input failure
    if (!data.totalHits) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }

    const photos = data.hits;
    renderGallery(photos);

    // first page
    if (pageToFetch === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    // last page
    const totalPagesPerSubmit = Math.ceil(data.totalHits / 40);

    if (pageToFetch === totalPagesPerSubmit) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
      observer.unobserve(guard);
      return;
    }

    pageToFetch += 1;

    observer.observe(guard);

    // refresh DOM
    gallery.refresh();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      `Ooops... Something goes wrong. Please, try again.`
    );
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const inputValue = e.target.elements.searchInput.value;

  if (!inputValue.trim() || inputValue === queryToFetch) {
    return;
  }

  queryToFetch = inputValue;
  pageToFetch = 1;
  galleryContainer.innerHTML = '';

  // delete old observer
  observer.unobserve(guard);

  getImages(queryToFetch, pageToFetch);
  searchForm.reset();
}

export { galleryContainer };