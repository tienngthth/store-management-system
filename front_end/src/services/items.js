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
        return { "items": response.data }
    } catch (error) {
        if (error.response) {
            return { "error": error.response.data.error };
        }
        if (error.message) {
            return { "error": error.message }
        }
        return { "error": "Failed to fetch items" }
    }
}


export const createItemApi = async (name, description, price, quantity) => {
    try {
        await axios.post(`${process.env.REACT_APP_INVENTORY_SERVICE}`, {
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
        if (error.response) {
            return error.response.data.error
        } else if (error.message) {
            return error.message
        }
        return "Failed to create item"
    }
}

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${process.env.REACT_APP_INVENTORY_SERVICE}${id}/`, {},
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
        return "Failed to delete item"
    }
}

export const updateItem = async (id, name, description, price, quantity) => {
    try {
        await axios.put(`${process.env.REACT_APP_INVENTORY_SERVICE}${id}/`, {
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
        if (error.response) {
            return error.response.data.error
        } else if (error.message) {
            return error.message
        }
        return "Failed to update item"
    }
}
