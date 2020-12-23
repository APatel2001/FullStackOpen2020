import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const gettAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const addItem = (item) => {
    return axios.post(baseUrl, item).then(response => response.data)
}

const deleteItem = (id) => {
    return axios.delete(baseUrl + `/${id}`)
}

const updateItem = (id, object) => {
    return axios.put(baseUrl + `/${id}`, object).then(response => response.data)
}




export default {gettAll, addItem, deleteItem, updateItem}
