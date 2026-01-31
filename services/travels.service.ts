import { getTravelsApi, getTravelApi } from "../src/api/travels.api";

export const fetchTravels = async () => {
  const res = await getTravelsApi();
  return res.data.data;
};

export const fetchTravel = async (id: number | string) => {
  const res = await getTravelApi(id);
  return res.data.data;
};