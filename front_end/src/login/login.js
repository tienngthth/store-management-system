import React from 'react'
import { apiCreateUser } from 'services/users'
import { loginWithEmail } from 'services/auth'

export default function LoginPage(
    { setLoggedIn, setCreateItem }
) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const login = async () => {
        if (email !== '' && password !== '') {
            const data = await loginWithEmail(email, password)
            if (data.user) {
                if (data.user.role === 'admin') {
                    setCreateItem(true)
                } else {
                    setCreateItem(false)
                }
                setLoggedIn(true)
            } else
                setError(error)
        }
    }

    const signUp = async () => {
        if (email !== '' && password !== '') {
            const error = await apiCreateUser(email, password)
            if (error) {
                setError(error)
            } else {
                login()
            }
        }
    }

    return (
        <div className='min-h-screen bg-slate-200 flex justify-center'>
            <div className='w-1/2 flex-col flex justify-center'>
                <div className='flex h-full items-center justify-center'>
                    <div className='flex flex-col h-full items-center justify-center'>
                        <form
                            class="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg"
                        >
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                <img src="./shop.png" className="h-8" alt="Logo" />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap">StoreHouse</span>
                            </div>
                            <label for="email" class="mb-5">
                                <span>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label for="password" class="mb-5">
                                <span>Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                            <div>
                                <button type="submit" onClick={login} className="w-1/2 text-black hover:text-blue-600/100 font-medium rounded-lg text-lg px-4 py-2">
                                    Login
                                </button>
                                <button type="submit" onClick={signUp} className="w-1/2 text-black hover:text-blue-600/100 font-medium rounded-lg text-lg px-4 py-2">
                                    Sign Up
                                </button>
                            </div>
                            <p className='text-center text-red-600 mt-5'>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}