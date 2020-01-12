import axios from 'axios';

// axios.defaults.baseUrl = "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev";
const apiBaseUrl = "https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev";

export default class PostService{
    getAllPosts() {
        return axios.get(`${apiBaseUrl}/posts`);
    }
    getPost(number) {
        return axios.get(`${apiBaseUrl}/posts/${number}`);
    }
    writePost(post) {
        if(post.id){
            return axios.put(`${apiBaseUrl}/post/${post.id}`, post)
        }else{
            return axios.post(`${apiBaseUrl}/post`, post);
        }
    }
    dltPost(id) {
        return axios.delete(`${apiBaseUrl}/post/${id}`);
    }
}