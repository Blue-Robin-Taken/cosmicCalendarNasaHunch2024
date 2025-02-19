import { getJulianDate2000Epoch } from '../earthTime/calculating';
export function marsStandardDate(e: number) {
    // Calculates time to marsStandardDate using epoch time (unix epoch time, mills starting from Jan 1st 1970 00:00 UTC)
    /*
    Steps, retrieved from https://marsclock.com/ & https://www.giss.nasa.gov/tools/mars24/help/algorithm.html.
    1. On the midnight of January 6th, 2000, on Earth, it was also midnight at the Martian prime meridian.  Subtracting the J2000 epoch (which was on Jan 1, 2000) from this, we get 4.5 mars sols.
    2. The epoch of Mars time can thus be artificially shifted from midnight Jan 6 to midday Jan 1 (J2000) by subtracting 4.5 from the JD_J2000 time (represented by the j2000 variable).
    3. Transfer the unit of measurement from Earth days to Mars sols. Divide the new J2000 value by the ratio of Mars and Earth's length of days.
    4. To account for the convention of using the epoch on December 29, 1873, 44796.0 Mars sols is added to the ΔJ2000 value, as almost precisely 126 Julian years, or 67 Mars tropical revolutions, occur between midday January 6, 2000, and December 29, 1873.
    5. 0.0009626 Mars sols is then subtracted to make up for misalignments over the exact positioning of the Martian prime meridian at Airy-0.
    This formula is accurate for ±10s.
    */
    var j2000 = getJulianDate2000Epoch(e);
    var MSD = (j2000 - 4.5) / 1.027491251 + 44796 - 0.0009626;
    // Mars standard gTime (gTime = time, this is purely used for meme purposes, do not change variable or it will break because I will break it)
    // https://www.giss.nasa.gov/tools/mars24/help/algorithm.html
    return MSD;
} // Thank you James Tauber!!!!!!!!!!!!!!!!!!!!
// https://github.com/jtauber/mars-clock?tab=readme-ov-file

export function marsTimeMTC24(e: number) {
    // Returns the Mars Universal Time (a string) from the epoch time (unix epoch, mills)
    const MSD = marsStandardDate(e);
    // ( MSD * 24hr ) % 24 hrs
    const MTCHours = (MSD * 24) % 24;
    var h = String(Math.floor(MTCHours));
    // ( MSD * 24hr * 60min ) % 60min
    const MTCMinutes = (MTCHours * 60) % 60;
    var m = String(Math.floor(MTCMinutes));
    // ( MTCMins * 60sec ) % 60sec
    const MTCSeconds = (MTCMinutes * 60) % 60;
    var s = String(Math.floor(MTCSeconds));

    if (MTCHours < 10) {
        h = '0' + h;
    }
    if (MTCMinutes < 10) {
        m = '0' + m;
    }
    if (MTCSeconds < 10) {
        s = '0' + s;
    }

    return h + ':' + m + ':' + s;
}

// in 24hrs 37mins 22.663secs
export function marsTimeMTCExtended(e: number) {
    // Returns the Mars Universal Time (a string) from the epoch time (unix epoch, mills)
    const MSD = marsStandardDate(e);
    // ( MSD * 24.6229hr ) % 24.6229 hrs
    const MTCHours = (MSD * 24.65979) % 24.65979;
    var h = String(Math.floor(MTCHours));
    // ( MSD * 24hr * 60min ) % 60min
    const MTCMinutes = (MTCHours * 60) % 60;
    var m = String(Math.floor(MTCMinutes));
    // ( MTCMins * 60sec ) % 60sec
    const MTCSeconds = (MTCMinutes * 60) % 60;
    var s = String(Math.floor(MTCSeconds));

    if (MTCHours < 10) {
        h = '0' + h;
    }
    if (MTCMinutes < 10) {
        m = '0' + m;
    }
    if (MTCSeconds < 10) {
        s = '0' + s;
    }

    return h + ':' + m + ':' + s;
}

//
export function marsConvertDecade(e: number) {
    const MSD = marsStandardDate(e);

    const decade = MSD / 6686.0;
    return decade;
}

export function marsConvertDecYear(e: number) {
    const MSD = marsStandardDate(e);

    const decYear = (marsConvertDecade(e) * 10) % 10;
}
