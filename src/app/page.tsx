import Image from "next/image";

export default function Home() {
  return (
    // https://stackoverflow.com/a/76827457/15982771
    <div className="-z-10 flex flex-grow align-middle h-screen w-screen top-0 left-0 fixed items-center justify-center flex-col wrapper">
      <h1 className="align-middle text-9xl font-bold font-Cinzel mb-4 text-center bg-[url('./images/cosmicYellowBackground.png')] bg-clip-text text-transparent">
        TerraChronos
      </h1>
      <h2 className="align-middle font-CinzelDecorative justify-center text-3xl text-black">
        A Cosmic Calendar for all your Dates!
      </h2>
    </div>
  );
}
