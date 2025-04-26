import { useEffect, useRef, useState } from 'react';

export default function VoiceListener() {
    const recognitionRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setMessage("Sorry, your browser doesn't support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => setMessage('Listening...');
        recognition.onend = () => setMessage('Stopped listening.');
        recognition.onerror = (e) => setMessage(`Error: ${e.error}`);

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log('Heard:', transcript);
            if (transcript.includes('help') || transcript.includes('stop')) {
                alert("⚠️ Distress word detected: " + transcript);
            }
        };

        recognitionRef.current = recognition;
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (listening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setListening(!listening);
    };

    return (
        <div className="mt-6 text-center">
            <button
                onClick={toggleListening}
                className={`px-6 py-2 rounded-xl shadow text-white ${listening ? 'bg-red-600' : 'bg-green-600'} hover:opacity-90 cursor-pointer transition-all duration-500 active:scale-95`}
            >
                {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <p className="mt-3 text-gray-700">{message}</p>
        </div>
    );
}