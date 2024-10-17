import axios from 'axios'

export const loginWithEmail = async (email, password) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE}login`, {
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
        const data = res.data;
        if (data) {
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('access_token', data.access_token)
        }
        return data
    } catch (error) {
        console.log(error)
        if (error.response) {
            return error.response.data.error
        } else if (error.message) {
            return error.message
        }
        return "Failed to login"
    }
}
