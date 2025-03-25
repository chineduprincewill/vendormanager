import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import TimerComponent from '../../common/TimerComponent';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { MdOutlineCreditScore } from 'react-icons/md';
import { TbCreditCardOff } from 'react-icons/tb';
import { fetchAdminDashboardStatistics } from '../../apis/dashboardActions';
import VendorSummary from './components/VendorSummary';

const Dashboard = () => {

    const { token, logout } = useContext(AppContext);

    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);

    if(statistics?.status && statistics?.status === 'Token is Expired'){
        logout();
    }


    useEffect(() => {
        fetchAdminDashboardStatistics(token, setStatistics, setError, setFetching);
    }, [])


    return (
        <div className='w-full m-0'>
            
            <div className='w-full grid lg:grid-cols-3 gap-4 p-4'>
                <div className='w-full'>
                    <div className={`flex flex-col gap-3 p-4 bg-gray-200 dark:bg-gray-700`}>
                        <span>All Vendors</span>
                        <div className={`w-full flex justify-between items-baseline`}>
                            <HiOutlineBriefcase size={20} />
                            <span className='text-5xl'>
                                {fetching ? <span className="text-gray-300 dark:text-gray-800 animate-pulse">000</span> : statistics?.vendor_total?.vendor_total}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className={`flex flex-col gap-3 p-4 bg-gray-200 dark:bg-gray-700`}>
                        <span className='text-[#54c5d0]'>Fully Registered</span>
                        <div className={`w-full flex justify-between items-baseline`}>
                            <MdOutlineCreditScore size={20} />
                            <span className='text-5xl text-[#54c5d0]'>
                                {fetching ? <span className="text-gray-300 dark:text-gray-800 animate-pulse">000</span> : statistics?.fully_registered?.fully_registered}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className={`flex flex-col gap-3 p-4 bg-gray-200 dark:bg-gray-700`}>
                        <span className='text-[#a8d13a]'>Partly Registered</span>
                        <div className={`w-full flex justify-between items-baseline`}>
                            <TbCreditCardOff size={20} />
                            <span className='text-5xl text-[#a8d13a]'>
                                {fetching ? <span className="text-gray-300 dark:text-gray-800 animate-pulse">000</span> : statistics?.partly_registered?.partly_registered}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <VendorSummary />
        </div>
    )
}

export default Dashboard