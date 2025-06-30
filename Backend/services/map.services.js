import axios from "axios";
import jwt from "jsonwebtoken";
import Captain from "../models/captain.model.js";

export const getMapToken = async(req, res)=>{
    const {mapAccessToken} = req.cookies;

    //Returning map token if MapAccessToken exists in cookies
    if(mapAccessToken) return mapAccessToken;

    const AccessUrl = "https://outpost.mappls.com/api/security/oauth/token?";
    const reqData = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    })

    //Generating Access Token
    try{
        const response = await axios.post(AccessUrl, reqData, {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const {data} = response;
        
        //Creating Map Access Token
        const token = jwt.sign({"mapAccessToken": data.access_token},
            process.env.SECRET_KEY,
            {
               expiresIn : data.expires_in,
            }
        );

        res.cookie("mapAccessToken", token, {
            maxAge: data.expires_in,
            httpOnly: true,
            sameSite: 'Strict'
        });

        return token;

    }catch(error){
        console.log(error.message);
    }
}

export const getGeocode = async(address)=>{
    const response = await axios.get("https://api.geoapify.com/v1/geocode/search", {
        params : { 
            text : address,
            apiKey : process.env.GEOCODE_KEY
        }
    });

    const data = response.data.features[0].properties;
    const coord = {
        address,
        lat : data.lat, 
        long : data.lon
    }
    
    return coord;
}

export const getAutoSuggestions = async({address, token})=>{
    //Decoding the Access Token
    const {mapAccessToken} = jwt.verify(token, process.env.SECRET_KEY);

    //Making the Api call for Auto Suggestions
    try{
        const API = "https://atlas.mappls.com/api/places/search/json";
        const response = await axios.get(API, {
            headers: {
                Authorization : `Bearer ${mapAccessToken}`,
            },
            params: {
                query : address,
                itemCount : 7,
            }
        });

        const data = response.data;
        return data;

    }catch(error){
        console.log(error.message);
    }
}

const toRadians = (degrees)=>{
  return degrees * (Math.PI / 180);
}

// The Haversine formula to calculate distance between two point using their coordinates
export const calculateDistance = async({pickup, destination})=> {
    console.log(pickup, destination);
  const coord1 = await getGeocode(pickup);
  const coord2 = await getGeocode(destination);

  const lat1 = coord1.lat;
  const long1 = coord1.long;
  const lat2 = coord2.lat;
  const long2 = coord2.long;

  const R = 6371; 
  const dLat = toRadians(lat2 - lat1);
  const dLong = toRadians(long2 - long1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLong / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return {distance, coord : coord1};
}

export const captainInRadius = async({lat, long, radius})=>{
    try{
        const captains = await Captain.find({
            location : {
                $geoWithin: {
                    $centerSphere : [[lat, long], radius/6371]
                }
            }
        })

        return captains;
    }catch(error){
        console.log(error.message);
    }
}
