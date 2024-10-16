import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder, getOrders } from 'services/order';
import Modal from 'components/modal';

export default function Orders(
  refresh, setError
) {

  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [orders, setOrders] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState({});
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (user.role == 'customer') {
        const orders = await getOrders(user.id);
        if (orders) {
          setOrders(orders);
        }
      } else {
        const orders = await getAllOrders();
        if (orders) {
          setOrders(orders);
        }
      }
    }
    fetch();
  }, [refresh, refetch]);

  const handleCancelOrder = async (order) => {
    await updateOrderStatus(order.id, 'cancelled');
    setRefetch(!refetch);

  }

  const handleCompleteOrder = async (order) => {
    await updateOrderStatus(order.id, 'completed');
    setRefetch(!refetch);
  }

  const handleDeleteOrder = async (order) => {
    await deleteOrder(order.id);
    setRefetch(!refetch);
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
                                <button disabled={loading} onClick={() => { handleCancelOrder(order.id) }} type="submit" className="disabled:bg-gray-300 disabled:hover:bg-gray-300 py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none ">
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                </Modal>
            }
      <div className="w-full flex grid-cols-3">
        <div className="w-full flex justify-center">
          <div className='px-10 pb-5 w-full '>
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
                    Item
                  </th>
                  <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="sticky z-10 top-0 px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='align-baseline'>
                {
                  orders.map(order => <>
                    <tr id={order.id}>
                      {
                        user.role != 'customer' &&
                        <td label="id" scope="row" className="max-w-[200px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                          {order.id}
                        </td>
                      }
                      <td label="name" className="px-6 py-4 max-w-[300px] truncate">
                        {order.item_name}
                      </td>
                      <td label="price" className="px-6 py-4 max-w-[300px] truncate">
                        {order.item_price}
                      </td>
                      <td label="quantity" className="px-6 py-4 max-w-[300px] truncate">
                        {order.quantity}
                      </td>
                      <td label="status" className="px-6 py-4 max-w-[300px] truncate">
                        {order.status}
                      </td>
                      {
                        user.role == 'customer' && order.status == 'pending' &&
                        <td label="actions" className="w-80 px-6 py-4">
                          <button onClick={() => handleCancelOrder(order)} className="font-medium text-gray-600  disabled:text-gray-400 disabled:hover:no-underline hover:underline">Cancel</button>
                        </td>
                      }
                      {
                        user.role == 'admin' && order.status == 'pending' &&
                        <td label="actions" className="w-80 px-6 py-4">
                          <button onClick={() => handleCompleteOrder(order)} className="font-medium text-slate-600  hover:underline disabled:text-gray-400 disabled:hover:no-underline border-r-2 border-gray-300 pr-1">Complete</button>
                          <button onClick={() => handleCancelOrder(order)} className="font-medium text-gray-600  disabled:text-gray-400 disabled:hover:no-underline hover:underline pl-1">Cancel</button>
                        </td>
                      }
                      {
                        order.status != 'pending' &&
                        <td label="actions" className="w-80 px-6 py-4">
                            <button onClick={() => handleDeleteOrder(order)} className="font-medium text-gray-600  disabled:text-gray-400 disabled:hover:no-underline hover:underline">Delete</button>
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
    </div>
  );
}