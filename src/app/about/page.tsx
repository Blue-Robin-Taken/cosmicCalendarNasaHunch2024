const tempName = "TerraChronos"

export default function About() {
    return <div className="">
        
        {/* General app description */}
        <div>
            <h1>
                {tempName}
            </h1>
            <p>
                {tempName} helps you keep track of time no matter where you're at.
                
                By standardizing time-keeping with a single seamless stream of software, {tempName} empowers communication and collaboration between interplanetary citizens. {tempName} synchronizes all time zones between all celestial bodies, whether you're on one of Earth's 24 zones, across the vermillion stretches of Mars, or at the far horizons of Ceres. 
                
                Any starry traveler or meticulous researcher will find stability by using {tempName} as their timekeeper.

            </p>
        </div>
        

        <hr>{/* guys please help we need to fix the css on here */}</hr>
        
        {/* Features */}
        <div>
            <h1>
                Starring:
            </h1>
            <ul>
                <li>Save all your personal settings and data with our Log-in system</li>
                <li>Access all your tools with a single swish and click on the Navigation Bar</li>
                <li>Fine tune your interstellar experience in the Settings interface</li>
                <ul>
                    <li>Select your location on any planet, moon, or star</li>
                </ul>
                <li>Organize your time with the Calendar function that transcends the boundaries of space</li>
                <li>Discover a list of every clock you might fancy with the Clock page</li>

            </ul>
        </div>
        
        {/*guys where did the bullets of the ul and li go help*/}
    </div>;
  }
  