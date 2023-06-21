export const uniqueKey = '37376459-60d6298d1e87a90b85928e997';

export function searchImages(searchQuery, page, perPage) {
    const apiUrl = `https://pixabay.com/api/?key=${uniqueKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => console.log(error));
    }