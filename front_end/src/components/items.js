import React, { useState, useEffect } from 'react';
import { fetchItems, deleteItem, updateItem } from 'services/items';
import Modal from 'components/modal';
import { createOrder } from 'services/order';

export default function Items(
    { refresh, setError, switchShowOrders }
) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [items, setItems] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [edit, setEdit] = useState(-1);
    const [refetch, setRefetch] = useState(false);
    const [cart, setCart] = useState({});

    useEffect(() => {
        setCart([]);
        const fetch = async () => {
            const data = await fetchItems();
            if (!data.error) {
                const items = data.items;
                var tempCart = {};
                for (var i = 0; i < items.length; i++) {
                    tempCart[items[i].id] = 0;
                }
                setCart(tempCart);
                setItems(items);
            }
        }
        fetch();
    }, [refresh, refetch]);

    const handleDeleteItem = async (id) => {
        setLoading(true);
        await deleteItem(id);
        setLoading(false);
        setOpenDeleteModal(false);
        setRefetch(!refetch);
    }

    const handleEdit = (item) => {
        setItem(item);
        setEdit(item.id);
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setQuantity(item.quantity);
    }

    const handleEditItem = async () => {
        if (price < 0 || quantity < 0) {
            setError('Price and quantity must be positive');
        } else {
            await updateItem(item.id, name, description, price, quantity);
            setRefetch(!refetch);
            setEdit(-1);
        }
    }

    const handleAddToCart = async (item) => {
        if (cart[item.id] > item.quantity) {
            setError('Quantity exceeds available stock');
        } else if (cart[item.id] < 0) {
            setError('Quantity must be positive');
        } else {
            await createOrder(user.id, item, cart[item.id]);
            setError('');
            resetCart();
            switchShowOrders();
        }
    }

    const handleChangeCart = (event, id) => {
        var tempCart = cart;
        for (var i = 0; i < items.length; i++) {
            tempCart[items[i].id] = 0;
        }
        tempCart[id] = event.target.value;
        setCart(cart => ({ ...cart, tempCart }));
    }

    const resetCart = () => {
        var tempCart = {};
        for (var i = 0; i < items.length; i++) {
            tempCart[items[i].id] = 0;
        }
        setCart(tempCart);
    }

    return (
        <div className="w-full relative overflow-x-auto">
            {
                openDeleteModal &&
                <Modal
                    disabled={loading}
                    closeModal={() => { setOpenDeleteModal(false) }}
                    shown={openDeleteModal}
                >
                    <div className="relative p-4 text-center bg-white rounded-lg sm:p-5">
                        <button disabled={loading} onClick={() => { setOpenDeleteModal(false) }} type="button" className="disabled:hover:bg-white disabled:hover:text-gray-500 disabled:text-gray-500 text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="deleteModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                        <svg className="text-gray-400  w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        <p className="mt-2 mb-8 text-gray-500 ">Are you sure you want to delete this item?</p>
                        {loading &&
                            <div role="status" className='flex justify-center'>
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        {!loading &&
                            <div className="flex justify-center items-center space-x-4">
                                <button disabled={loading} onClick={() => { setOpenDeleteModal(false) }} type="button" className=" disabled:text-gray-500 disabled:hover:bg-white  py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 ">
                                    Cancel
                                </button>
                                <button disabled={loading} onClick={() => { handleDeleteItem(item.id) }} type="submit" className="disabled:bg-gray-300 disabled:hover:bg-gray-300  py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none ">
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                </Modal>
            }
            <div className="w-full flex justify-center">
                <div className='px-10 py-5 w-full '>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                {
                                    user.role != 'customer' &&
                                    <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                                        ID
                                    </th>
                                }
                                <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='align-baseline'>
                            {
                                items.map(item => <>
                                    <tr id={item.id}>
                                        {
                                            user.role != 'customer' &&
                                            <td label="id" scope="row" className="w-20 px-6 py-4 font-medium text-gray-900 whitespace-nowrap  truncate">
                                                {item.id}
                                            </td>
                                        }
                                        <td label="name" className="w-80 px-6 py-4 max-w-[300px] truncate">
                                            {
                                                edit != item.id ? item.name :
                                                    <input
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        type="text"
                                                        className="p-2 rounded-lg border border-gray-300 mr-4">
                                                    </input>
                                            }
                                        </td>
                                        <td label="description" className="px-6 py-4 max-w-[300px] truncate">
                                            {
                                                edit != item.id ? item.description :
                                                    <input
                                                        required
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        type="text"
                                                        className="w-80 p-2 rounded-lg border border-gray-300 mr-4">
                                                    </input>
                                            }
                                        </td>
                                        <td label="price" className="w-56 px-6 py-4 max-w-[300px] truncate">
                                            {
                                                edit != item.id ? item.price :
                                                    <input
                                                        required
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        type="number"
                                                        min={0}
                                                        className="w-24 p-2 rounded-lg border border-gray-300 mr-4">
                                                    </input>
                                            }
                                        </td>
                                        <td label="quantity" className="w-56 px-6 py-4 max-w-[300px] truncate">
                                            {
                                                edit != item.id ? item.quantity :
                                                    <input
                                                        required
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        type="number"
                                                        min={0}
                                                        className="w-24 p-2 rounded-lg border border-gray-300 mr-4">
                                                    </input>
                                            }
                                        </td>

                                        {
                                            user.role != 'customer' &&
                                            <td label="actions" className="w-48 px-6 py-4">
                                                {
                                                    edit == item.id ?
                                                        <div>
                                                            <button onClick={() => { handleEditItem(); }} className="font-medium text-cyan-600  border-r-2 border-gray-300 hover:underline pr-1">Save</button>
                                                            <button onClick={() => { setEdit(-1); }} className="font-medium text-slate-600  hover:underline pl-1">Cancel</button>
                                                        </div> :
                                                        <div>
                                                            <button disabled={edit != -1} onClick={() => { handleEdit(item) }} className="font-medium text-slate-600  hover:underline disabled:text-gray-400 disabled:hover:no-underline border-r-2 border-gray-300 pr-1">Edit</button>
                                                            <button disabled={edit != -1} onClick={() => { setItem(item, setOpenDeleteModal(true)); }} className="font-medium text-red-400  disabled:text-gray-400 disabled:hover:no-underline hover:underline pl-1">Delete</button>
                                                        </div>
                                                }
                                            </td>
                                        }
                                        {
                                            user.role == 'customer' &&
                                            <td label="actions" className="w-50 px-6 py-4">
                                                <input 
                                                    type="number" 
                                                    value={cart[item.id]} 
                                                    max={item.quantity}
                                                    min={0}
                                                    onChange={(e) => handleChangeCart(e, item.id)} 
                                                    className="w-20 p-2 rounded-lg border border-gray-300 mr-4"
                                                >
                                                </input>
                                                <button onClick={() => { handleAddToCart(item); }} className="font-medium text-slate-600  hover:underline disabled:text-gray-400 disabled:hover:no-underline">Add To Cart</button>
                                            </td>
                                        }
                                    </tr>
                                </>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
