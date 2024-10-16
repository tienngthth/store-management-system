import axios from 'axios'

export const fetchItems = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_INVENTORY_SERVICE}`, {},
            {
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


export const createItemApi = async (name, description, price, quantity) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_INVENTORY_SERVICE}`, {
            name: name,
            description: description,
            price: price,
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

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_INVENTORY_SERVICE}${id}/`, {},
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

export const updateItem = async (id, name, description, price, quantity) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_INVENTORY_SERVICE}${id}/`, {
            name: name,
            description: description,
            price: price,
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
