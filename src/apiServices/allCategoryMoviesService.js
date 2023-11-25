import axios from "axios";

const url = 'https://run.mocky.io/v3/66612929-a517-4135-b4e1-79bd33967e38'

const allCategoryMoviesService = {

    getAllCategories() {
        return axios.get(url)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    },

    getCategoryMovies(id) {
        return axios.get(url + `/${id}/movies`)
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

}

export default allCategoryMoviesService