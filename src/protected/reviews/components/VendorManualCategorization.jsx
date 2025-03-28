import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { CiEdit } from 'react-icons/ci';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const VendorManualCategorization = ({ vendordata }) => {

    const { user } = useContext(AppContext);

    const [categorization, setCategorization] = useState();
    const [threshold, setThreshold] = useState();
    const [remarks, setRemarks] = useState();
    const [submitting, setSubmitting] = useState(false);

    return (
        <div className='w-full md:w-[49%] p-4 my-6 rounded-md shadow-xl border border-gray-300 dark:border-gray-700'>
            <div className='flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-gray-700'>
                <CiEdit size={20} />
                <span className='capitalize'>vendor manual categorization</span>
            </div>
            <form className='w-full my-4 grid space-y-6 md:space-y-4'>
                <select
                    className='w-full p-2 rounded-md border dark:border-gray-500 bg-transparent'
                    onChange={(e) => setCategorization(e.target.value)}
                    required
                >
                    <option className='dark:bg-gray-800' value="">Select category</option>
                    <option className='dark:bg-gray-800' value="Category A (Major Vendor)">Category A (Major Vendor)</option>
                    <option className='dark:bg-gray-800' value="Category B (Mid Vendor)">Category B (Mid Vendor)</option>
                    <option className='dark:bg-gray-800' value="Category C (Minor Vendor)">Category C (Minor Vendor)</option>
                    <option className='dark:bg-gray-800' value="Rejected, Not categorized">Rejected, Not categorized</option>
                </select>
                <select
                    className='w-full p-2 rounded-md border dark:border-gray-500 bg-transparent'
                    onChange={(e) => setThreshold(e.target.value)}
                    required
                >
                    <option className='dark:bg-gray-800' value="">Select threshold</option>
                    <option className='dark:bg-gray-800' value="Unlimited">Unlimited</option>
                    <option className='dark:bg-gray-800' value="Limited to 25 Million & Below">Limited to 25 Million & Below</option>
                    <option className='dark:bg-gray-800' value="Limited to 5 million and below (including direct purchases)">Limited to 5 million and below (including direct purchases)</option>
                    <option className='dark:bg-gray-800' value="N/A">N/A</option>
                </select>
                <textarea
                    className='w-full p-2 rounded-md border dark:border-gray-500 bg-transparent'
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder='Enter remark'
                    cols="3"
                ></textarea>
                <button
                    className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                >
                    {
                        submitting ? 
                            <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Submit Categorization'
                    }
                </button>
            </form>
        </div>
    )
}

export default VendorManualCategorization