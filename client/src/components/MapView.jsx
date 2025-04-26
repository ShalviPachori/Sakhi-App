import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Recenter({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, 15);
        }
    }, [position]);
    return null;
}

// 👇 This simulates sending location to a backend
function sendLocationToServer([lat, lng]) {
    console.log("📡 Sending location to server:", { lat, lng });

    // Simulate an API call (can be replaced with your actual backend later)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1,
            location: { lat, lng },
            timestamp: new Date().toISOString(),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("✅ Server received:", data);
        })
        .catch((err) => console.error("❌ Failed to send location:", err));
}

export default function MapView() {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const newPos = [pos.coords.latitude, pos.coords.longitude];
                setPosition(newPos);
                sendLocationToServer(newPos); // Send on each update
            },
            (err) => {
                console.error('Error watching position:', err);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div className="h-130 w-130 rounded-xl overflow-hidden">
                {position && (
                    <MapContainer center={position} zoom={15} className="h-full w-full">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <Marker position={position}>
                            <Popup>You are here</Popup>
                        </Marker>
                        <Recenter position={position} />
                    </MapContainer>
                )}
            </div>
        </div>
    );
}