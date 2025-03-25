import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { MdOutlineAppRegistration, MdOutlineHomeRepairService, MdOutlineRateReview } from 'react-icons/md';

const Navlinks2 = () => {

    const locatn = useLocation();

    const navlinks = [
        {
            id: 1,
            title: "Dashboard",
            url: "/dashboard",
            icon: <TbLayoutDashboardFilled size={17} />
        },
        {
            id: 2,
            title: "Registrations",
            url: "/registrations",
            icon: <MdOutlineAppRegistration size={17} />
        },
        {
            id: 3,
            title: "Reviews",
            url: "/reviews",
            icon: <MdOutlineRateReview size={17} />
        },
        {
            id: 4,
            title: "Vendors",
            url: "/vendors",
            icon: <MdOutlineHomeRepairService size={17} />
        },
    ]

    return (
        <ul className='w-full mt-2 space-y-1'>
            {
                (navlinks !== null) && navlinks.map(nav => {
                    return (
                        <li key={nav.id} className={`px-3 py-1.5 md:py-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${nav.url === locatn.pathname && 'bg-gray-200 dark:bg-gray-700'}`}>
                            <Link to={nav.url} key={nav.id} className='flex justify-start items-center space-x-3 my-1 hover:text-[#a6ce39]'>
                                {nav.icon}
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Navlinks2
