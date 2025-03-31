import axios from "axios";
import { Request, Response } from "express";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1/all";

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      countryCode: country.cca3,
    }));
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries list" });
  }
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const country = response.data[0];
    res.json({
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      languages: country.languages,
      region: country.region,
      currency: country.currencies,
      timezones: country.timezones,
      maps: country.maps,
      capital: country.capital,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch country data by country code" });
  }
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  try {
    const { region } = req.params;
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.filter(
      (country: any) => country.region === region
    );
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch country data by region" });
  }
};

// Search countries
export const searchCountries = async (req: Request, res: Response) => {
  try {
    const { name, capital, region, timezone } = req.query;
    const response = await axios.get(REST_COUNTRIES_API);
    let countries = response.data;
    if (name || capital || region || timezone) {
      countries = countries?.filter(
        (country: any) =>
          (name &&
            country.name.common
              .toLowerCase()
              .includes((name as string).toLowerCase())) ||
          (capital &&
            country.capital &&
            country.capital?.[0]
              ?.toLowerCase()
              ?.includes((capital as string).toLowerCase())) ||
          (region && country.region === region) ||
          (timezone && country.timezones.includes(timezone as string))
      );
    }
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch country data search" });
  }
};
