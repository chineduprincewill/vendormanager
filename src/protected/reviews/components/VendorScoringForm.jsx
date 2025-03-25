import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { AppContext } from '../../../context/AppContext';
import { fetchVendorScoringFormData } from '../../../apis/vendorsActions';
import LoadingBars from '../../../common/LoadingBars';

const VendorScoringForm = ({ setShowVendorScoringForm, vendor }) => {

    const { token, logout } = useContext(AppContext);
    const [formdata, setFormdata] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [openform, setOpenform] = useState(false);
    const [opendocuments, setOpendocuments] = useState(true);
    const [grr, setGrr] = useState(0);
    const [prr, setPrr] = useState(0);
    const [total, setTotal] = useState(0);
    const [fmdata, setFmdata] = useState({});

    if(formdata?.status && formdata?.status === 'Token is Expired'){
        logout();
    }

    const generateMaxLimits = (max) => {
        const numlists = [];

        for (let i = 1; i <= max; i++) {
            numlists.push(<option className='dark:bg-gray-800' key={i} value={i}>{i}</option>);
        }

        return numlists;
    }

    const setValue = (e) => {
        const {name, value} = e.target;
        setFmdata({
            ...fmdata,
            [name] : value
        })
    }

    const updateEntry = (serial) => {
        let result;

        if(serial === "10.1"){
            result = grr;
        }
        if(serial === "15"){
            result = prr;
        }
        if(serial === "16"){
            result = total;
        }

        return result;
    }

    const updateCalc = (val, serial) => {
        if(parseInt(serial) < 11){
            setGrr(parseInt(grr) + parseInt(val));
        }
        if(parseInt(serial) >= 11 && parseInt(serial) < 15){
            setPrr(parseInt(prr) + parseInt(val))
        }

        console.log(val);
        console.log(serial);

        console.log(grr);
        console.log(prr);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        console.log(fmdata);
    }

    useEffect(() => {
        fetchVendorScoringFormData(token, { email: vendor[1]}, setFormdata, setError, setFetching)
    }, [])

    useEffect(() => {
        setTotal(grr+prr);
    }, [grr, prr])
    
    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                    <div className={`w-full overflow-auto md:w-[95%] h-[90vh] rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 px-3 md:px-6 py-1`}>
                        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2 text-red-500'>
                            <span className='text-[#54c5d0] uppercase font-bold'>
                            {vendor[0]}
                            </span>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowVendorScoringForm(false)}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </span>
                        </div>
                        <div className='w-full py-2'>
                        {
                            fetching || !formdata || formdata.length === 0 ?
                                <div className='space-y-4'>
                                    <LoadingBars />
                                    <LoadingBars /> 
                                </div> : 
                                <div className='w-full py-4 grid space-y-8'>
                                    <div className='w-full'>
                                        <div 
                                            className='w-full flex justify-between items-center p-2 shadow-xl cursor-pointer'
                                            onClick={() => setOpenform(!openform)}
                                        >
                                            <h1 className='text-lg'>Scoring form</h1>
                                        {
                                            openform ?
                                                <AiOutlineMinus size={15} /> : <AiOutlinePlus size={15} />
                                        }
                                        </div>
                                        <form onSubmit={handleFormSubmit} className={`${openform ? 'grid md:flex md:flex-wrap' : 'hidden'} w-full items-baseline mt-4 gap-6 px-4`}>
                                        {
                                            formdata?.vendor_scoring_text.map(data => (
                                                <div 
                                                    key={data?.serial_no} 
                                                    className={`
                                                        w-full md:${data?.serial_no === "10.1" || data?.serial_no === "15" ||data?.serial_no === "16" ? 'w-full bg-gray-300 dark:bg-gray-700 p-3 rounded-md' : 'w-[48%]'} grid space-y-2`
                                                    }
                                                >
                                                    <span className={`text-sm ${data?.serial_no === "10.1" || data?.serial_no === "15" || data?.serial_no === "16" ? "uppercase" : ""}`}>
                                                        {data?.serial_no !== "10.1" && data?.serial_no !== "15" &&data?.serial_no !== "16" ? data?.serial_no+"." : ""} {data?.item}</span>
                                                {
                                                    data?.serial_no === "10.1" || data?.serial_no === "15" ||data?.serial_no === "16" ?
                                                        <input 
                                                            type='number'
                                                            className='w-full p-2 rounded-md border border-gray-400 bg-transparent'
                                                            value={updateEntry(data?.serial_no)}
                                                        /> :
                                                        <select 
                                                            className='w-full p-2 rounded-md border border-gray-400 bg-transparent'
                                                            name={"serial_number"+data?.serial_no}
                                                            onChange={(e) => {
                                                                updateCalc(e.target.value, data?.serial_no);
                                                                setValue(e);
                                                            }}
                                                        >
                                                            <option></option>
                                                            {generateMaxLimits(data?.maximum_marks_awarded)}
                                                        </select>
                                                }
                                                </div>
                                            ))
                                        }
                                            <button
                                                className={`w-full md:w-48 flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                                            >
                                               Submit
                                            </button>
                                        </form>
                                    </div>
                                    <div className='w-full'>
                                        <div 
                                            className='w-full flex justify-between items-center p-2 shadow-xl cursor-pointer'
                                            onClick={() => setOpendocuments(!opendocuments)}
                                        >
                                            <h1 className='text-lg'>Uploaded documents</h1>
                                        {
                                            opendocuments ?
                                                <AiOutlineMinus size={15} /> : <AiOutlinePlus size={15} />
                                        }
                                        </div>
                                        <div className={`${opendocuments ? 'grid' : 'hidden'} w-full items-baseline gap-6`}>
                                            <div className='w-full mt-4 space-y-4 px-4'>
                                            {
                                                formdata?.vendor_submitted_documents?.map(item => (
                                                    <div key={item?.id} className='flex flex-col gap-1'>
                                                        <span className='text-xs text-gray-500'>{item?.document_type}</span>
                                                        <span>{item?.document_type && 
                                                            <a href={import.meta.env.VITE_DOWNLOAD_URL+item?.file_path} download={item?.name} target='_blank'>{item?.name}</a>    
                                                        }</span>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default VendorScoringForm