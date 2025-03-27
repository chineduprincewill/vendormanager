import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReviewsFilter from './components/ReviewsFilter'
import ReviewsLabel from './components/ReviewsLabel';
import { AppContext } from '../../context/AppContext';
import { fetchAllVendors } from '../../apis/registrationsActions';
import LoadingBars from '../../common/LoadingBars';
import ReviewsRecords from './components/ReviewsRecords';
import VendorScoringForm from './components/VendorScoringForm';

const Reviews = () => {

    const { token, record, logout } = useContext(AppContext);
    const [filter, setFilter] = useState("");
    const [vendors, setVendors] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [filteredData, setFilteredData] = useState();
    const [showVendorScoringForm, setShowVendorScoringForm] = useState(false);
    const [vendor, setVendor] = useState();

    const columns = [
        {
            name: "Company",
            selector: (row) => row?.company_name,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='grid space-y-1 font-extralight py-2 cursor-pointer'>
                    <span className='capitalize'>{row?.company_name.toLowerCase()}</span>
                    <span className='text-xs dark:text-[#54c5d0] font-semibold dark:font-normal'>{row?.email}</span>
                </div>
            )
        },
        {
            name: "Score",
            selector: (row) => row?.score ? row?.score : row?.vendor_score,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full'>
                    {row?.score ? row?.score : row?.vendor_score}
                </div>
            )
        },
        {
            name: "Last action",
            selector: (row) => row?.doc_count,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full'>
                {
                    row?.reviewed_by !== "" && row?.reviewed_by && row?.reviewed_by !== null ? 
                        <span className='font-extralight'>Reviewed by <span className='font-normal'>{row?.reviewed_by}</span></span> : 
                        (row?.completed_by !== "" && row?.completed_by && row?.completed_by !== null ? 
                            <span className='font-extralight'>Scored by <span className='font-normal'>{row?.completed_by}</span></span> :
                            <span className='font-extralight'>Completed registration</span>
                    ) 
                }
                </div>
            )
        },
        {
            name: "Status",
            selector: (row) => row?.vendor_application_status,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='w-full flex items-center justify-between'>
                    {
                       row?.vendor_score === "" || !row?.vendor_score || row?.vendor_score === null ? 
                            <div className='grid space-y-2 py-2'>
                                <span className='capitalize font-extralight'>awaiting scoring</span>
                                <button 
                                    className='max-w-max hover:bg-gray-200 dark:hover:bg-gray-950 px-2 py-1 border shadow-xl text-xs rounded-full'
                                    onClick={() => openVendorScoreFormDialog(row?.company_name, row?.email)}
                                >
                                    Score
                                </button>
                            </div> : 
                            (row?.reviewed_by === "" || !row?.reviewed_by || row?.reviewed_by === null) ? 
                                <div className='grid space-y-2 py-2'>
                                    <span className='capitalize font-extralight text-[#a8d13a]'>awaiting review</span>
                                    <button className='max-w-max hover:bg-gray-200 dark:hover:bg-gray-950 px-2 py-1 border shadow-xl text-xs rounded-full'>review</button>
                                </div> :
                                (row?.vendor_application_status === 'REGISTERED' ? 
                                    <span className='text-[#54c5d0]'>APPROVED</span> : 
                                    (row?.vendor_application_status === "REJECTED" && 
                                        <span className='text-red-500 uppercase'>{row?.vendor_application_status.toLowerCase()}</span>
                                )
                            )
                    }
                </div>
            )
        },
    ];

    if(vendors?.status && vendors?.status === 'Token is Expired'){
        logout();
    }

    const openVendorScoreFormDialog = (vendorName, vendorEmail) => {
        setVendor([vendorName, vendorEmail]);
        setShowVendorScoringForm(true)
    }

    const ftData = useMemo(() => {
        let updatedData;

        updatedData = vendors !== null && vendors?.vendors.filter(vendor => (
            vendor?.reg_count >= 60 && vendor?.doc_count >= 4
        ))
        
        setFilteredData(updatedData);

    }, [vendors])

    useEffect(() => {
        fetchAllVendors(token, setVendors, setError, setFetching);
    }, [record])

    return (
        <div className='w-full m-0'>
            <ReviewsFilter setFilter={setFilter} />
            <ReviewsLabel filter={filter} />
            <div className='w-full my-4 px-4'>
            {
                fetching || !filteredData || filteredData.length === 0 ?
                    <LoadingBars /> : 
                    <ReviewsRecords columns={columns} data={filteredData} filter={filter} />
            }
            </div>
            {
                showVendorScoringForm && 
                    <VendorScoringForm setShowVendorScoringForm={setShowVendorScoringForm} vendor={vendor} />
            }
        </div>
    )
}

export default Reviews