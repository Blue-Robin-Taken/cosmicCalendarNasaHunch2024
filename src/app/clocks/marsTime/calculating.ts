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
export function marsConvertYear(e: number) {
    var currentDay = marsStandardDate(e);
   
    // solsEra is the number of eras
    // 334296 = 500 * 668.5920
    var solsEra = Math.floor(currentDay/334296);
    // make solsEraFract contain the fraction of an era, which is 500 years long
    // all 'Fract' variables are temporary
    var solsEraFract = Math.floor(currentDay-(solsEra * 334296));

    
    var solsCentury = 0;
    var solsCenturyFract = solsEraFract;
    if (solsEraFract != 0) {
      // -1 because we start counting at 1 instead of 0
      // solsCentury is the amount of centuries, not including Era
      solsCentury = Math.floor((solsEraFract-1)/66859);
    }
    // make solsCenturyFract contain the fraction of a century
    if (solsCentury != 0) {
      // 66859 = 100 * 668.5920, rounded down
      // +1 because we need to revert from counting from 0 to counting from 1
      solsCenturyFract -= Math.floor(solsCentury*66859 + 1);
    }

    
    var solsDecade = 0;
    var solsDecadeFract = solsCenturyFract;
    // if it is the last year of the century, which has the leap day
    if (solsCentury != 0) {
      // 6686 = 10 * 668.5920, rounded down, where 6/10 years will have an extra day
      solsDecade = Math.floor((solsCenturyFract+1)/6686);
      if (solsDecade != 0) {
        solsDecadeFract -= Math.floor(solsDecade * 6686 - 1);
      } 
    // for the 99 cases where it isn't the last year of the century
    } else {
      solsDecade = Math.floor(solsCenturyFract/6686);
      if (solsDecade != 0) {
        solsDecadeFract -= Math.floor(solsDecade*6686);
      }
    }


    var solsYearTwin = 0;
    var solsYearTwinFract = solsDecadeFract;
    // if its the last year of the decade, which has the leap day
    if (solsDecade == 0 && solsCentury != 0) {
      // 668 + 669 = 1337
      // haha leet
      solsYearTwin = Math.floor(solsDecadeFract/1337);
      if (solsYearTwin != 0) {
        solsYearTwinFract -= Math.floor(solsYearTwin*1337);
      }
    } else {
      if (solsDecadeFract != 0) {
        // -1 because its a leap year
        solsYearTwin = Math.floor((solsDecadeFract-1)/1337);
      }
      if (solsYearTwin != 0) {
        solsYearTwinFract -= Math.floor(solsYearTwin*1337+1);
      }
      
    }


    var solsYear = 0;
    var solsYearFract = solsYearTwinFract;
    // if it's year 0 or 1, AND (its not the first year of the decade (0) OR  if (its the first year of the decade but its not the last year of the century (100)))
    if (solsYearTwin == 0 && (solsDecade != 0 || (solsDecade == 0 && solsCentury == 0))) {
      solsYear = Math.floor(solsYearTwinFract/669);
      
      if (solsYear != 0) {
        solsYearFract -= 669; 

      }

    } else {
      // apply the opposite from ^^. this is the case for leap years
      solsYear = Math.floor((solsYearTwinFract+1)/669);
      if (solsYear != 0) {
        solsYearFract -= 668;
        
      }

    }


    var marsYear = ((solsEra * 500) + (solsCentury * 100) + (solsDecade * 10) + (solsYearTwin * 2) + solsYear);
    return [marsYear, solsYearFract];
    

}

export function marsConvertQuarter(e: number) {
  const marsSols = marsConvertYear(e);
  const quarterTimings = [0, 167, 334, 501];
  var currentQuarter = -1;
    if (marsSols[1] < quarterTimings[1]) {
      currentQuarter = 0;
    } else if (marsSols[1] < quarterTimings[2]) {
      currentQuarter = 1;
    } else if (marsSols[1] < quarterTimings[3]) {
      currentQuarter = 2;
    } else {
      currentQuarter = 3;
    }
    return currentQuarter;
}

export function marsConvertMonth(e: number) {
  const marsSols = marsConvertYear(e);
  const quarterTimings = [0, 167, 334, 501];
  const currentQuarter = marsConvertQuarter(e);

  var currentQuarterFract = marsSols[1] - quarterTimings[currentQuarter];

  var month = Math.floor(currentQuarterFract/42 + currentQuarter*4);

  const monthNames = ["Primus", "Cotidianus", "Abnego", "Oraculi", "Limina", "Cetus", "Pericula", "Illecebra", "Obviam Eo", "Apotheosis", "Donum", "Mora", "Fuga", "Reunire", "Vivere", "Novissimus"];
  if (month < 0 || month > 15) {
    return "Invalid Month";
  }

  const solsMonthFract = currentQuarterFract%42;

  return [monthNames[month], solsMonthFract];
  
 }

 export function weekdayFromDays(e: number) {
  const MSD = marsStandardDate(e)
  const weekday = (MSD+1)%7
  const weekdayNames = ["Dies Solis", "Dies Lunae", "Dies Martis", "Dies Mercuria", "Dies Jovis", "Dies Veneris", "Dies Saturni"]
  const weekdayNamesTrunc = ["Sol", "Lun", "Mart", "Merc", "Jov", "Ven", "Satu"]
  return [weekday, weekdayNames[weekday], weekdayNamesTrunc[weekday]]
 }