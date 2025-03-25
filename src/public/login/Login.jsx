import React, { useState } from 'react'
import ThemeToggle from '../../common/ThemeToggle'
import { PiKeyholeLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const Login = () => {

    const [activeAuth, setActiveAuth] = useState('sign-in');

    return (
        <div className='w-full h-screen overflow-hidden bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white'>
            <div className='fixed top-0 right-0 p-4'>
                <ThemeToggle />
            </div>
            <div className='w-full md:h-full grid md:grid-cols-2'>
                <div className='flex justify-center col-span-1 items-center bg-[url("/assets/vm-bg.jpg")] max-h-max md:bg-cover'>
                    <div className="w-full md:h-screen justify-center bg-black bg-opacity-80">
                        <div className='flex flex-wrap gap-2 items-center p-4 md:p-12 mt-6 md:mt-20'>
                            <img src='/assets/vm-logo2.png' alt='app brand' width="100px" className='mx-auto md:mx-0' />
                            <div className='hidden md:block text-4xl md:text-8xl text-[#54c5d0]'>Vendor</div>
                            <div className='hidden md:block text-4xl md:text-9xl text-[#a8d13a]'>Manager</div>
                            <div className='w-full my-2 md:mt-8 md:mb-4'>
                                <button
                                    className='py-3 px-12 rounded-full border border-[#a8d13a] text-[#a8d13a] hover:bg-[#a8d13a] hover:text-black text-xl'
                                    onClick={() => {
                                        activeAuth === 'sign-in' ? setActiveAuth('sign-up') : setActiveAuth('sign-in')
                                    }}
                                >
                                    {activeAuth === 'sign-in' ? 'Create account' : 'Login'}
                                </button>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='md:text-xl text-[#54c5d0]'>&copy;</span>
                                <span className='md:text-xl text-[#54c5d0]'>APIN Public Health Initiatives.</span>
                            </div>
                        </div>
                    </div>
                </div>
                {activeAuth === 'sign-in' ? 
                    <SignIn setActiveAuth={setActiveAuth} /> : 
                    <SignUp setActiveAuth={setActiveAuth} />
                }
            </div>
        </div>
    )
}

export default Login