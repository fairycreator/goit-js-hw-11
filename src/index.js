import { uniqueKey } from './pixaby_api.js'; 
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { searchImages } from './pixaby_api.js';

let searchQuery = '';
let page = 1;
let gallery = document.querySelector('.gallery');
let loadMoreBtn = document.querySelector('.load-more');
let backToTopBtn = document.querySelector('.back-to-top');
let searchForm = document.querySelector('.search-form');

loadMoreBtn.style.display = 'none';

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  searchQuery = event.target.searchInput.value;
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  doSearch();
});

loadMoreBtn.addEventListener('click', function() {
  page++;
  doSearch();
});

function doSearch() {
  searchImages(searchQuery, page)
    .then(data => {
      let images = data.hits; // array of images from the response

      if (images.length > 0) {
        let imageCards = images.map(image => {
          return `
            <div class="card">
              <a href="${image.largeImageURL}" data-lightbox="gallery">
                <img src="${image.webformatURL}" alt="${image.tags}">
              </a>
              <p>Likes: ${image.likes}</p>
              <p>Views: ${image.views}</p>
              <p>Comments: ${image.comments}</p>
              <p>Downloads: ${image.downloads}</p>
            </div>
          `;
        });

        gallery.insertAdjacentHTML('beforeend', imageCards.join(''));

        if (page === 1) {
          let totalHits = data.totalHits; // total number of images
          Notiflix.Notify.success(`Ура! Знайдено ${totalHits} зображень.`);
        }

        let lightbox = new SimpleLightbox('.gallery a'); // Initialize lightbox
        

        // Check pagination
        let showBtn = page < Math.ceil(data.totalHits / 12);
        if (showBtn) {
          loadMoreBtn.style.display = 'block'; // Show LM
        } else {
          loadMoreBtn.style.display = 'none'; // Hide LM
        let message = document.createElement('div');
          message.classList.add('message');
          message.textContent = "We're sorry, but you've reached the end of search results.";
          gallery.appendChild(message);
        }
      } else {
        let message = document.createElement('div');
          message.classList.add('message');
          message.textContent = "На жаль, зображень не знайдено.";
          loadMoreBtn.style.display = 'none'; // Hide LM
      }
    })
    .catch(error => console.log(error));
}

backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
  
window.addEventListener('scroll', function() {
  if (window.scrollY > 500) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
