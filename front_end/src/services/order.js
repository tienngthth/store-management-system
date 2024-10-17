import axios from 'axios'

export const createOrder = async (user_id, item, quantity) => {
    try {
        await axios.post(`${process.env.REACT_APP_ORDER_SERVICE}`, {
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
        if (error.response) {
            return error.response.data.error
        } else if (error.message) {
            return error.message
        }
        return "Failed to create order"
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
        return { "orders": response.data }
    } catch (error) {
        if (error.response) {
            return { "error": error.response.data.error }
        }
        if (error.message) {
            return { "error": error.message }
        }
        return { "error": "Failed to fetch orders"}
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
        return { "orders": response.data }
    } catch (error) {
        if (error.response) {
            return { "error": error.response.data.error };
        }
        if (error.message) {
            return { "error": error.message }
        }
        return { "error": "Failed to fetch orders" }
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        await axios.put(`${process.env.REACT_APP_ORDER_SERVICE}${id}/`, {
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
        if (error.response) {
            return error.response.data.error
        } else if (error.message) {
            return error.message
        }
        return "Failed to update order"
    }
}

export const deleteOrder = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_ORDER_SERVICE}${id}/`, {},
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json",
                    "Access-Control-Allow-Headers": "*"
                }
            })
    } catch (error) {
        if (error.response) {
            return error.response.data.error
        } else if (error.message) {
            return error.message
        }
        return "Failed to delete order"
    }
}
