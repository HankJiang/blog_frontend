import axios from "axios";

let apiBaseUrl = "http://localhost:3000";
let config = { withCredentials: true, crossdomain: true };

export function regist(payload) {
    return axios.post(apiBaseUrl+'/register', payload, config)
}

export function login(payload) {
    return axios.post(apiBaseUrl+'/login', payload, config)
}

export function logout() {
    return axios.post(apiBaseUrl+'/logout', {}, config)
}

export function createPost(payload) {
    return axios.post(apiBaseUrl+'/posts', payload, config)
}

export function getPosts(params={}) {
    config.params = params;
    return axios.get(apiBaseUrl+'/posts', config)
}

export function getPost(id) {
    return axios.get(apiBaseUrl+`/posts/${id}`, config)
}

export function editPost(id, payload) {
    return axios.put(apiBaseUrl+`/posts/${id}`, payload, config)
}

export function deletePost(id) {
    return axios.delete(apiBaseUrl+`/posts/${id}`, config)
}
