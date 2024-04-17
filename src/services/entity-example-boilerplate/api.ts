import { AxiosPromise } from "axios";
import baseAPI from "../auth/api";
import { Airport, SearchTripsForm, TripRaw } from "./trip";

export function searchTrips(
  searchTripsForm: SearchTripsForm,
): AxiosPromise<TripRaw[]> {
  return baseAPI.post(`/cities/searchTrips`, searchTripsForm, {
    timeout: 30000,
  });
}

export function findAirports(searchTerms: string): AxiosPromise<Airport[]> {
  return baseAPI.get(`/airports`, {
    params: { query: searchTerms },
  });
}
