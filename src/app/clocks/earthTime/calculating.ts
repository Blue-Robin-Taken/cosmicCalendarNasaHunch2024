/*
The below are functions that are for earth calculations relating to time
*/

export function getJulianDate(epochTime: number) {
    // Returns the Julian Date in days "since noon Universal Time on January 1, 4713 BC" (https://aa.usno.navy.mil/data/JulianDate)
    // Steps:
    // 1. Number of seconds in a day is ((8.64 * 10) ^ 7), use that to get the number of days since the unix epoch
    // 2. Add the difference in epoch from the Julian Date and the Unix epoch.
    return (epochTime / ((8.64 * 10) ^ 7)) + 2440587.5;
}

export function getJulianDateTerrestrialTime(epochTime: number){
    // Returns the Julian Date in terms of Terrestrial Time (time that refers to the surface of the planet)
    // Steps:
    // 1. Get the Julian Date (function outlined earlier)
    // 2. Get TAI time in reference to the Julian Date by adding the difference from UTC which is 37 seconds
    // 3. Get the Terrestrial Time by adding the difference between terrestrial time and TAI time which is 32.184 seconds
    const julianDate: number = getJulianDate(epochTime);  // Epoch here is still in unix time
    const TAItime: number = julianDate/
    
}