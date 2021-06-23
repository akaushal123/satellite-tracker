import axios from "axios";

const PROXY = "https://cors-anywhere.herokuapp.com/";
const URL_ENDPOINT = "http://tle.ivanstanojevic.me/api/tle";

let satelliteDetails= [];

export const getSatelliteList = async () => {
    const response = await axios.get(`${PROXY}${URL_ENDPOINT}`, {
        headers:{
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(e => console.log(e));

    satelliteDetails = response.data.member;

    return response.data.member.map(obj => ({
        satelliteId: obj.satelliteId,
        satelliteName: obj.name
    }));
};

export const getSatelliteInfo = async (satelliteId) => {

    if (satelliteDetails.length === 0){
        const response = await axios.get(`${PROXY}${URL_ENDPOINT}`, {
            params: satelliteId
        }).catch(e => console.log(e));
        satelliteDetails = response.data.member;
    }

    return satelliteDetails.find(satellite => satellite.satelliteId === parseInt(satelliteId));
};