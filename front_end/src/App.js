import { useState } from 'react';
import './App.css';
import LoginPage from 'login/login';
import NavBar from 'nav';
import Items from 'components/items';
import Orders from 'components/orders';
import { createItemApi } from 'services/items';

function App() {

  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access_token') ? true : false);
  const [showItems, setShowItems] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [createItem, setCreateItem] = useState(user && user.role === 'admin' ? true : false);

  const switchShowItems = () => {
    setError('');
    setShowItems(true);
    setShowOrders(false);
  }

  const switchShowOrders = () => {
    setError('');
    setShowItems(false);
    setShowOrders(true);
  }

  const handleCreateItem = async (e) => {
    if (isNaN(price) || isNaN(quantity)) {
      setError('Price and Quantity must be numbers');
    } else if (price < 0 || quantity < 0) {
      setError('Price and quantity must be positive');
    } else {
      if (name != '' && description != '' && price != '' && quantity != '') {
        const error = await createItemApi(name, description, price, quantity);
        if (error) {
          setError(error);
        } else {
          setError('');
          setName('');
          setDescription('');
          setPrice('');
          setQuantity('');
          setError('');
          setRefresh(!refresh);
        }
      } else {
        setError('All fields must be filled out');
      }
    }
  }

  if (loggedIn) {
    return (
      <div className="App h-screen">
        <NavBar setLoggedIn={setLoggedIn}></NavBar>
        <div>
          <div className="flex py-3 px-8 justify-between">
            <span className="text-2xl font-semibold whitespace-nowrap">{showItems ? "Items" : "Orders"}</span>
            <div className="flex justify-end mb-5">
              <div className="p-2">
                <button disabled={showItems} type="button" href="#shop" className="text-blue-500 disabled:text-gray-400" onClick={switchShowItems}>Shop</button>
              </div>
              <div className="p-2">
                <button disabled={showOrders} type="button" href="#shop" className="text-blue-500 disabled:text-gray-400" onClick={switchShowOrders}>Orders</button>
              </div>
            </div>
          </div>
          {
            createItem && showItems &&
            <form>
              <div className="px-10 flex">
                <div className='w-fit'>
                  <label className="w-fit block mb-2">Name</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" className="p-2 rounded-lg border border-gray-300 mr-4"></input>
                </div>
                <div className='w-fit'>
                  <label className="w-fit block mb-2">Description</label>
                  <input required value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="description" className="p-2 rounded-lg border border-gray-300 mr-4"></input>
                </div>
                <div className='w-fit'>
                  <label className="w-fit block mb-2">Price</label>
                  <input
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="price"
                    className="p-2 rounded-lg border border-gray-300 mr-4"
                    min={0}
                  >
                  </input>
                </div>
                <div className='w-fit'>
                  <label className="w-fit block mb-2">Quantity</label>
                  <input
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    placeholder="quantity"
                    className="p-2 rounded-lg border border-gray-300 mr-4"
                    min={0}
                  >
                  </input>
                </div>
                <div className='content-center'>
                  <p className='text-red-600'>{error}</p>
                </div>
              </div>
              <div className='px-10 flex'>
                <button type="button" onClick={handleCreateItem} className="mt-5 text-blue-500">Create Item</button>
              </div>
            </form>
          }
          {
            !createItem && showItems &&
            <div className='content-center'>
              <p className='text-red-600'>{error}</p>
            </div>
          }
          <div className='flex'>
            {showItems && <Items setError={setError} refresh={refresh} switchShowOrders={switchShowOrders}></Items>}
            {showOrders && <Orders setError={setError} refresh={refresh}></Orders>}
          </div>
        </div>
      </div>
    );
  }

  return <LoginPage setLoggedIn={setLoggedIn} setCreateItem={setCreateItem}></LoginPage>

}

export default App;
