export const uniqueKey = '37376459-60d6298d1e87a90b85928e997';

export function searchImages(searchQuery, page) {
    const apiUrl = `https://pixabay.com/api/?key=${uniqueKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => console.log(error));
    }