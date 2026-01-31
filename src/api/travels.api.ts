import axios from "axios";

export const getTravelsApi = () => {
    return axios.get("/travels");
}

export const getTravelApi = (id: number | string) => {
    return axios.get(`/travels/${id}`);
}