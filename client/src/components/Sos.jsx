import { useState, useEffect } from 'react';

// Function to simulate sending SOS alert to the server (or mock API)
function sendEmergencyAlert(location) {
    console.log("🚨 Sending emergency alert... Location:", location);

    // Simulate sending to backend (replace with actual API call)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1,
            location,
            timestamp: new Date().toISOString(),
            alertType: "SOS",
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("✅ Emergency alert sent successfully:", data);
        })
        .catch((err) => console.error("❌ Failed to send SOS alert:", err));
}

export default function Sos() {
    const [position, setPosition] = useState(null);

    // Get user location on component mount
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const newPos = [pos.coords.latitude, pos.coords.longitude];
                setPosition(newPos);
            },
            (err) => {
                console.error('Error getting position:', err);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const handleSosAlert = () => {
        if (position) {
            sendEmergencyAlert(position); // Send alert with the current location
        } else {
            alert("Unable to get your location, please try again.");
        }
    };

    return (
        <button
            onClick={handleSosAlert}
            className="px-8 py-4 bg-red-600 text-white text-2xl font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 cursor-pointer active:scale-95 hover:scale-105 transition-all duration-500"
        >
            🚨 Send SOS Alert
        </button>
    );
}