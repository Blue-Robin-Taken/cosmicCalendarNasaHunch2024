export default function calculation(e: Number) {
    // Calculates time to mars time using epoch time (unix epoch time, mills starting from Jan 1st 1970 00:00 UTC)
    /*
    Steps, retrieved from https://marsclock.com/ partly because I'm lazy but also partly because it was the easiest and most accessible way to understand it:
    1. Get Epoch time (retrieved from the parameter)
    2. Divide epoch time by 8.64e+7 to get the days
    3. Add 2440587.5 to the divided epoch time to get the Julian date based of off the UTC time
    4. Calculate for leap seconds (TAI time difference) 
    */
    return ;
} // Thank you James Tauber!!!!!!!!!!!!!!!!!!!!
// https://github.com/jtauber/mars-clock?tab=readme-ov-file
