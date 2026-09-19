import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    APIProvider,
    AdvancedMarker,
    Map,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import ViewFooter from "./ViewFooter";
import matchaPlaces from "../data/MatchaPlaces";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ORIGIN = "Faculdade de Direito da Universidade de Lisboa";

// Opens Google Maps directions from the origin to the place.
const mapsLink = (place) =>
    `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        ORIGIN
    )}&destination=${encodeURIComponent(`${place.name} ${place.address}`)}`;

const PlaceCard = ({ place }) => {
    const geocodingLib = useMapsLibrary("geocoding");
    const [position, setPosition] = useState(place.location ?? null);
    const [failed, setFailed] = useState(false);
    const [errorCode, setErrorCode] = useState("");

    // Look up the address once the Geocoding library is ready (skipped if coordinates are given).
    useEffect(() => {
        if (position || !geocodingLib) return;
        let cancelled = false;
        new geocodingLib.Geocoder()
            .geocode({ address: place.address })
            .then(({ results }) => {
                if (cancelled) return;
                const loc = results?.[0]?.geometry.location;
                if (loc) setPosition({ lat: loc.lat(), lng: loc.lng() });
                else setFailed(true);
            })
            .catch((err) => {
                console.error("Geocoding failed for", place.address, err);
                if (cancelled) return;
                setErrorCode(err?.code ?? err?.message ?? "");
                setFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, [geocodingLib, place.address, position]);

    return (
        <div className="flex flex-col bg-white rounded-xl border-4 border-gray-300 shadow-lg overflow-hidden min-h-0">
            <div className="p-3 text-center">
                <h2 className="font-rodin font-bold text-lg md:text-xl text-green-900">
                    <a
                        href={mapsLink(place)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {place.name}
                    </a>
                </h2>
                <p className="text-sm text-gray-700 mt-1">
                    {place.hours ?? "Hours not available"}
                </p>
                <p className="text-xs text-gray-500 mt-1">{place.address}</p>
            </div>

            <div className="relative flex-1 min-h-[160px] bg-gray-200">
                {position ? (
                    <Map
                        mapId="DEMO_MAP_ID"
                        defaultCenter={position}
                        defaultZoom={16}
                        gestureHandling="cooperative"
                        disableDefaultUI
                        style={{ width: "100%", height: "100%" }}
                    >
                        <AdvancedMarker position={position} title={place.name} />
                    </Map>
                ) : (
                    <p className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 text-center px-2">
                        {failed
                            ? `Map unavailable${errorCode ? ` (${errorCode})` : ""}`
                            : "Loading map..."}
                    </p>
                )}
            </div>
        </div>
    );
};

PlaceCard.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        url: PropTypes.string,
        hours: PropTypes.string,
        location: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
    }).isRequired,
};

const OtherCard = () => (
    <div className="flex flex-col bg-white rounded-xl border-4 border-gray-300 shadow-lg overflow-hidden min-h-0">
        <div className="p-3 text-center">
            <h2 className="font-rodin font-bold text-lg md:text-xl text-green-900">
                Other
            </h2>
            <p className="text-sm text-gray-700 mt-1">
                Choose one you know and like
            </p>
        </div>
        <div className="flex-1 min-h-[160px] bg-green-50 flex items-center justify-center">
            <span className="font-rodin font-black text-8xl md:text-9xl text-green-700 select-none">
                ?
            </span>
        </div>
    </div>
);

const MatchaView = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-green-100">
            <div className="flex-1 min-h-0 px-4 pt-4 pb-48 md:pb-[calc(6.6vw+130px)] overflow-y-auto">
                <APIProvider apiKey={API_KEY}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 h-full auto-rows-[minmax(280px,1fr)]">
                        {matchaPlaces.map((place) => (
                            <PlaceCard key={place.name} place={place} />
                        ))}
                        <OtherCard />
                    </div>
                </APIProvider>
            </div>

            <ViewFooter startLabel="Schedule a date" startTo="/schedule" />
        </div>
    );
};

export default MatchaView;
