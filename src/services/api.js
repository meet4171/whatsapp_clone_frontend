import axios from "axios";


export const addUser = async (userInfo) => {

    try {
        const response = await axios.post('/user', userInfo);
        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const addMessage = async (conversation) => {
    try {
        await axios.post('/message', conversation);
        return '200';

    } catch (error) {
        console.log(error);
        return '500'
    }
}
export const uploadFile = async (formData) => {
    try {
        const response = await axios.post('/file/upload', formData);
        if (response.status === 200) {
            return { fileUrl: response.data.fileUrl, status: 200 }
        }
        else {
            return response.data.error

        }

    } catch (error) {
        console.log(error);
        return error.message
    }

}