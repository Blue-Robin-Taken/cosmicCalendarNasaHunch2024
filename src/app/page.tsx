import Image from "next/image";
import '../app/page.css'

export default function Home() {
  return (
    <div className="flex justify-center fixed h-screen w-screen text-image bg-gradient-to-b from-gray-900 to-transparent">
      <div className="flex items-center justify-center flex-col wrapper"> 
            <div className="p-8 rounded-lg shadow-lg max-w-9xl "> 
                <h1 className="text-9xl font-bold mb-4 text-center text-blue-400">
                TerraChronos 
                </h1> 
            </div>   
          <h2 className="align-center justify-center text-3xl">
          A Cosmic Calendar for all your Dates!
      </h2>
      </div>
    </div>
  );
}
