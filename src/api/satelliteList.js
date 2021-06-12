import axios from "axios";

const URL_ENDPOINT = "http://tle.ivanstanojevic.me/api/tle";

export const getSatelliteList = async () => {
    const response = axios.get(URL_ENDPOINT, {
        headers:{
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(e => console.log(e));
        console.log(response);
};

export const getSatelliteInfo = async (satelliteId) => {
    const response = axios.get(URL_ENDPOINT, {
        params: satelliteId
    }).catch(e => console.log(e));
    console.log(response);
};