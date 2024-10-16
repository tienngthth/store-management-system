import axios from 'axios'

export const apiCreateUser = async (email, password) => {
    try {
        await axios.post(`${process.env.REACT_APP_USER_SERVICE}`, {
            email: email,
            password: password
        },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json",
                    "Access-Control-Allow-Headers": "*"
                }
            })
    } catch (error) {
        if (error.message) {
            return error.message
        }
        return error.response.data.error;
    }
}
