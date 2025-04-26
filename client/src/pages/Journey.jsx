import VoiceListener from '../components/VoiceListener';
import MapView from '../components/MapView';
import Sos from '../components/Sos';
import LocationFetching from '../components/LocationFetching/LocationFetching';

export default function Journey() {
    return (
        <>
    <LocationFetching/>
        <div className="relative h-screen w-full overflow-x-hidden bg-gradient-to-br from-red-300 to-[#2c5364]">
            <div className="p-6">
                <h2 className="text-white drop-shadow-md text-[2.5rem] font-extrabold mb-6 tracking-wide">
                    Journey Mode
                </h2>
                <Sos />
                <MapView />
                <VoiceListener />
            </div>
        </div>
        </>
    );
}