import { getAutoSuggestions, getMapToken } from "../services/map.services.js";

const getSuggestions = async(req, res)=>{
    
    let {address} = req.query;
    console.log(address);
    try{
        const token = await getMapToken(req, res);
        const response = await getAutoSuggestions({address, token});
        res.json(response);
    }catch(error){
        console.log(error.message);
    }
};

export default {getSuggestions};