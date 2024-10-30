import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center fixed h-screen w-screen bg-white">
      <div className="flex items-center justify-center flex-col wrapper"> 
              <h1 className="text-9xl font-bold font-Cinzel mb-4 text-center bg-[url('./images/cosmicYellowBackground.png')] bg-clip-text text-transparent">
              TerraChronos 
              </h1> 
          <h2 className="align-center font-CinzelDecorative justify-center text-3xl text-black">
          A Cosmic Calendar for all your Dates!
          </h2>
      </div>
    </div>
  );
}
