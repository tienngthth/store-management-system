import axios from 'axios'

export const createOrder = async (user_id, item, quantity) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_ORDER_SERVICE}`, {
            user_id: user_id,
            item_id: item.id,
            item_name: item.name,
            item_price: item.price,
            quantity: quantity
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

export const getOrders = async (user_id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_ORDER_SERVICE}${user_id}/`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }
        })
        return response.data
    } catch (error) {
        if (error.message) {
            return error.message
        }
        return error.response.data.error;
    }
}

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_ORDER_SERVICE}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "content-type": "application/json",
                "Access-Control-Allow-Headers": "*"
            }
        })
        return response.data
    } catch (error) {
        if (error.message) {
            return error.message
        }
        return error.response.data.error;
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_ORDER_SERVICE}${id}/`, {
            status: status
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

export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_ORDER_SERVICE}${id}/`, {},
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
