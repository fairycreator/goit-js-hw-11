const uniqueKey = '37376459-60d6298d1e87a90b85928e997'

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let searchQuery = '';
let page = 1;
let gallery = document.querySelector('.gallery');
let loadMoreBtn = document.querySelector('.load-more');
let backToTopBtn = document.querySelector('.back-to-top');
let searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    searchQuery = event.target.searchInput.value;
    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    searchImages();
});

function searchImages() {
let apiUrl = `https://pixabay.com/api/?key=${uniqueKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true`;

fetch(apiUrl)
    .then(response => response.json())
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

    gallery.innerHTML += imageCards.join('');

        if (page === 1) {
            let totalHits = data.totalHits; // total number of images
            Notiflix.Notify.success = `Ура! Знайдено ${totalHits} зображень.`;
        }

        loadMoreBtn.style.display = 'block'; // Show the Load More button
        page++; // Increment the page number for the next request

        let lightbox = new SimpleLightbox('.gallery a'); // Initialize the simple lightbox
        } else {
        let message = document.createElement('div');
        message.classList.add('message');
        message.textContent = 'На жаль, зображень не знайдено.';
        gallery.appendChild(message);
        }

              // Check if there are more images available for pagination
        if (page <= data.total / 40) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
            let message = document.createElement('div');
            message.classList.add('message');
            message.textContent = "We're sorry, but you've reached the end of search results.";
            gallery.appendChild(message);
        }
    })
    .catch(error => console.log(error));
}

loadMoreBtn.addEventListener('click', function() {
    searchImages();
});

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
