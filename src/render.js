import { galleryContainer } from './index.js';

function renderGallery(photos) {
const markup = photos
    .map(
        ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) => {
            return `  
            <div class="card">
            <a href="${largeImageURL}" data-lightbox="gallery">
            <img src="${webformatURL}" alt="${tags}">
            </a>
            <p>Likes: ${likes}</p>
            <p>Views: ${views}</p>
            <p>Comments: ${comments}</p>
            <p>Downloads: ${downloads}</p>
            </div>
            `;
        })
    .join('');
galleryContainer.insertAdjacentHTML('beforeend', markup);
}

export { renderGallery };