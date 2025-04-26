import { useEffect, useState } from "react";

const  LocationFetching = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Permission denied or location unavailable.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Welcome! 🌍</h1>

        {!location && !error && (
          <p className="text-gray-600">Requesting your location...</p>
        )}

        {location && (
          <div>
            <p className="text-green-600 font-semibold">Location access granted!</p>
            <p className="text-sm mt-2">
              Latitude: <span className="font-mono">{location.latitude}</span>
              <br />
              Longitude: <span className="font-mono">{location.longitude}</span>
            </p>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default LocationFetching ;