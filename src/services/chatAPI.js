import Axios from 'axios';

const api = Axios.create(
    {
        baseURL: '/api/',

    }
)

const chatAPI = {
    getMessage: (groupID) => {
        console.log('get message');
        return api.get(`messages/${groupID}`);

    },
    sendMessage: (username, text) => {
        return api.post(`send`, { sender: username, content: text });
    }
}
export default chatAPI;