import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '37376459-60d6298d1e87a90b85928e997';
axios.defaults.baseURL = 'https://pixabay.com/api/';

//
async function fetchImages(q, page) {
    try {
        const { data } = await axios({
            params: {
            key: API_KEY,
            q,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: 40,
        },
    });
    return data;
} catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure(
        `Ooops... Something goes wrong. Please, try again.`
        );
    }
}

export { fetchImages };