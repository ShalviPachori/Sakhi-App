
import { Link } from 'react-router-dom';
export default function Home() {


 
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/videos/HomeBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="h-full w-full flex flex-col items-center justify-center text-white bg-black/50">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Welcome to Sakhii</h1>
        <Link to="/journey" className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 hover:scale-105 transition-all duration-500">
          Start Journey
        </Link>
      </div>
    </div>
  );
}