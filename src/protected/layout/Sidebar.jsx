import React, { Fragment, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Navlinks from './Navlinks'
import { AppContext } from '../../context/AppContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import Navlinks2 from './Navlinks2'
import { PiUserCircleLight } from 'react-icons/pi'
import { HiLogout } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'

const Sidebar = ({ toggleSidebar, navOpen }) => {

    const { user, logout } = useContext(AppContext);
    const locatn = useLocation();
    const navigate = useNavigate();

    return (
        <Fragment>
            <div 
                className={navOpen ? 'fixed inset-0 z-50 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden' : ''}
                onClick={toggleSidebar}
            ></div>
            <div className={`absolute left-0 top-0 z-50 ${navOpen ? 'block w-[230px]' : 'hidden'} md:flex flex-col md:w-[230px] h-screen overflow-y-hidden duration-300 ease-linear bg-white dark:bg-[#19212c]`}>
                <div className='hidden md:flex md:justify-center md:items-center md:w-full bg-[#005072] px-6 md:h-[50px] space-x-2 text-white'>  
                </div>
                <div className='flex justify-end mt-2 md:hidden px-6'>
                    <AiOutlineClose size={25} className='text-[#005072] cursor-pointer' onClick={toggleSidebar} />
                </div>
                <div className='w-full py-2.5 px-4 mb-2 bg-white dark:bg-[#19212c]'>
                    <div className='w-full flex'>
                        <img src='/assets/vm-logo2.png' alt='logo' width='44px' />
                        <div className='ml-2 pl-2 grid border-l border-[#005072] text-[#005072] dark:border-white dark:text-white uppercase'>
                            <span className='text-xs'>Vendor</span>
                            <span className='font-semibold text-lg'>Manager</span>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col px-3 grow'>
                    <div className='w-full flex justify-center items-center gap-1 my-2'>
                        <PiUserCircleLight size={50} />
                        <div className='grid text-xs'>
                            <span>{JSON.parse(user)?.name}</span>
                            <span>{JSON.parse(user)?.category}</span>
                        </div>
                    </div>
                    <div className='grow'>
                        <Navlinks2 />
                    </div>
                </div>
                <div 
                    className='flex items-center gap-3 p-6 text-red-500 hover:text-red-300 cursor-pointer'
                    onClick={() => logout()}
                >
                    <FiLogOut size={17} />
                    <span>Logout</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar