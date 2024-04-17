import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Airport, mapTripRawToTrip, SearchTripsForm, Trip } from "./trip";
import {
  searchTrips as apiSearchTrips,
  findAirports as apiFindAirports,
} from "./api";
import { AxiosError } from "axios";

export const TRIPS_STORAGE_KEY = "trips" as const;

export interface TripAPI {
  trips: Trip[];

  searchTrips: (searchTripsForm: SearchTripsForm) => Promise<void | AxiosError>;

  findAirports: (searchTerms: string) => Promise<Airport[]>;
}

export const TripContext = createContext<TripAPI | null>(null);

export function ProvideTrip({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (trips.length === 0) {
      const trips = localStorage.getItem(TRIPS_STORAGE_KEY);
      setTrips(trips ? JSON.parse(trips).map(mapTripRawToTrip) : []);
    }
  }, [trips.length]);

  const searchTrips: TripAPI["searchTrips"] = useCallback(
    (searchTripsForm) =>
      apiSearchTrips(searchTripsForm).then((res) => {
        setTrips(res.data.map(mapTripRawToTrip));
        localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(res.data));
      }),
    [],
  );

  const findAirports: TripAPI["findAirports"] = useCallback(
    (searchTerms) => apiFindAirports(searchTerms).then(({ data }) => data),
    [],
  );

  return (
    <TripContext.Provider value={{ trips, searchTrips, findAirports }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip(): TripAPI {
  return useContext(TripContext) as TripAPI;
}
