import { getJulianDate2000Epoch } from '../earthTime/calculating';
export function marsStandardDate(e: number) {
    // Calculates time to marsStandardDate using epoch time (unix epoch time, mills starting from Jan 1st 1970 00:00 UTC)
    /*
    Steps, retrieved from https://marsclock.com/ partly because I'm lazy but also partly because it was the easiest and most accessible way to understand it:
    1. Get Epoch time (retrieved from the parameter)
    2. Divide epoch time by 8.64e+7 to get the days
    3. Add 2440587.5 to the divided epoch time to get the Julian date based of off the UTC time
    4. Add the difference of TAI - UTC which is 37 seconds
    5. Add 32.184 (TAI time difference from Terrestrial Time)
    6. The above gets you the JDtt time (Julian date Terestrial Time) which you can convert to the difference of time
    from January 1st 12:00 PM 2000 by subtracting 2451545
    7. Get the days since the January 6th 2000 epoch
    8. 
    */
    var j2000 = getJulianDate2000Epoch(e);
    var MSD = (j2000 - 4.5) / 1.027491252 + 44796 - 0.00096;
    // Mars standard gTime (gTime = time, this is purely used for meme purposes, do not change variable or it will break because I will break it)
    // https://www.giss.nasa.gov/tools/mars24/help/algorithm.html
    return MSD;
} // Thank you James Tauber!!!!!!!!!!!!!!!!!!!!
// https://github.com/jtauber/mars-clock?tab=readme-ov-file

export function marsUniversalTime(e: number) {
    // Returns the Mars Universal Time (a string) from the epoch time (unix epoch, mills)
    const MSD = marsStandardDate(e);
    const MTCHours = (MSD * 24) % 24;
    const MTCMinutes = (MSD * 24 * 60) % 60;
    const MTCSeconds = (MTCMinutes * 60) % 60;
    return `${MTCHours.toLocaleString(undefined, {
        maximumSignificantDigits: 2,
    })}:${MTCMinutes.toLocaleString(undefined, {
        maximumSignificantDigits: 2,
    })}:${MTCSeconds.toLocaleString(undefined, {
        maximumSignificantDigits: 2,
    })}`;
}

export function marsConvertDate(e: number) {
    const MSD = marsStandardDate(e);
    return "temp#";

}