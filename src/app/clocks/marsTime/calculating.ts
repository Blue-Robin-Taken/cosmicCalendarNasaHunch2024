export default function calculation(e: number) {
    // Calculates time to mars time using epoch time (unix epoch time, mills starting from Jan 1st 1970 00:00 UTC)
    /*
    Steps, retrieved from https://marsclock.com/ partly because I'm lazy but also partly because it was the easiest and most accessible way to understand it:
    1. Get Epoch time (retrieved from the parameter)
    2. Divide epoch time by 8.64e+7 to get the days
    3. Add 2440587.5 to the divided epoch time to get the Julian date based of off the UTC time
    4. Add the difference of TAI - UTC which is 37 seconds
    5. Add 32.184 (TAI time difference from Terrestrial Time)
    6. The above gets you 
    */
    return e / ((8.64 * 10) ^ 7) + 2440587.5 + (32.184 + 32) / 84000;
} // Thank you James Tauber!!!!!!!!!!!!!!!!!!!!
// https://github.com/jtauber/mars-clock?tab=readme-ov-file
