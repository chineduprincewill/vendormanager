import axios from "./baseUrl";

export const loginUser = async ( data, setSuccess, setError, setLoggingIn ) => {

    setLoggingIn(true);

    try{
        const response  = await axios.post(`login`,
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setLoggingIn(false);
}