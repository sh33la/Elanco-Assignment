import axios from "axios";
import { API_END_POINTS } from "./apiEndpoints";

interface ISearchParams {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}

const BASE_URL = "http://localhost:3001";

const getCountriesList = () => {
  return axios.get(`${BASE_URL + API_END_POINTS.COUNTRIES}`);
};

const getCountryByCode = (code: string) => {
  return axios.get(`${BASE_URL + API_END_POINTS.COUNTRIES}/${code}`);
};

const getCountriesByRegion = (region: string) => {
  return axios.get(`${BASE_URL + API_END_POINTS.REGION}/${region}`);
};

const searchCountries = (params: ISearchParams) => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return axios.get(`${BASE_URL + API_END_POINTS.SEARCH}?${query}`);
};

export const countryService = {
  getCountriesList,
  getCountryByCode,
  getCountriesByRegion,
  searchCountries,
};
