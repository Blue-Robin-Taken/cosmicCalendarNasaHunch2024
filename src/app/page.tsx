const tempName = 'TerraChronos';
import './about/page.css';

export default function Home() {
    return (
        // https://stackoverflow.com/a/76827457/15982771
        <div className="dark:bg-darkmode mt-40 flex w-auto items-center justify-center flex-col wrapper select-none overflow-x-auto ">
            <h1 className="align-middle text-9xl font-bold font-Cinzel mb-4 text-center bg-[url('./images/cosmicYellowBackground.png')] bg-clip-text text-transparent">
                TerraChronos
            </h1>
            <h2 className="dark:text-darkmode-textlightlight mb-40 align-middle font-CinzelDecorative  justify-center text-3xl text-black">
                A Cosmic Calendar for all your Dates!
            </h2>

            {/* About section */}
            <div className="dark:bg-darkmode dark:text-darkmode-textlightlight mb-16 selection:bg-highlight-yellow">
                <div className="dark:bg-darkmode flex items-center justify-center flex-col wrapper bg-white">
                    <div className="dark:bg-darkmode-boxdarklight dark:text-darkmode-textlightlight bg-gray-200 p-8 rounded-lg shadow-lg max-w-2xl">
                        <h1 className="dark:text-darkmode-textlightlight text-4xl font-bold font-Cinzel mb-4 text-center text-theme-yellowlight">
                            {tempName}
                        </h1>
                        <h3 className="dark:text-darkmode-textlightlight text-black text-lg font-CinzelDecorative text-center mb-4">
                            Helps you keep track of time no matter where
                            you&apos;re at.
                        </h3>
                        <p className="dark:text-darkmode-textlightlight text-black mb-4 text-center">
                            By standardizing time-keeping with a single seamless
                            stream of software, {tempName} empowers
                            communication and collaboration between
                            interplanetary citizens. {tempName} synchronizes all
                            time zones between all celestial bodies, whether
                            you&apos;re on one of Earth&apos;s 24 zones, across
                            the vermillion stretches of Mars, or at the far
                            horizons of Ceres. Any starry traveler or meticulous
                            researcher will find stability by using {tempName}{' '}
                            as their timekeeper.{' '}
                        </p>
                    </div>

                    <div className="slide ml-10 mt-16">
                        <h2 className="dark:text-darkmode-textlightlight text-2xl font-bold font-Cinzel mb-4 text-theme-yellowlight">
                            Features:
                        </h2>
                        <ul className="dark:text-darkmode-textlightlight text-black list-disc">
                            <li>
                                Save all your personal settings and data with
                                our Log-in system
                            </li>
                            <li>
                                Access all your tools with a single swish and
                                click on the Navigation Bar
                            </li>
                            <li>
                                Fine tune your interstellar experience in the
                                Settings interface
                            </li>
                            <li>
                                Select your location on any planet, moon, or
                                star
                            </li>
                            <li>
                                Organize your time with the Calendar function
                                that transcends the boundaries of space
                            </li>
                            <li>
                                Discover a list of every clock you might fancy
                                with the Clock page
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
