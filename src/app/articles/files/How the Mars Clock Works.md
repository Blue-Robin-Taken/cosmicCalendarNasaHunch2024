This application uses several methods that to translate time between Earth time to Mars time. Firstly, the UTC time received from the computer is converted to the more usable TT time and shifted in epoch from the UTC epoch (as the number originated as UTC time) to the $TT_{J2000}$ time. The $TT_{J2000}$ is converted to Mars time (MSD) by relating it to an epoch where both Mars and Earth have local midnights, before finally being parsed into a MTC time value as a hh/mm/ss string.

## Definitions

_TAI_: SI unit seconds (SI seconds)
_UT1_: variable seconds (UT1 seconds)
_TT_: $\text{TAI time} - 32.184$
_UNIX_: TAI time with leap seconds so to be adjusted to _UT1_
_UTC_: UNIX time that differs by timezone.

| Name               | Epoch                           | Leap Seconds? |
| ------------------ | ------------------------------- | ------------- |
| _Julian Date_ (JD) | 12:00 (noon) January 1, 4713 BC |               |
| _Unix time_ (UNIX) | 0:00 January 1, 1970            | no            |
| _TAI_              | 00:00:00 January 1, 1958        | no            |
| _TT_               | $\text{TAI time} - 32.184$      | no            |
| _J2000 (TT)_       | 12:00 (noon) January 1, 2000    |               |
| _UT1_              |                                 | no            |
| _UTC_              | 00:00:00 January 1, 1970        | yes           |

## Julian Date (JD) from UTC

Computers output _UTC_ time in milliseconds (ms), which is under the _Gregorian Date_ system. However, astrologers use _Julian Date_ to calculate time.
$$JD_{UT}=\frac{\text{UTC in ms}}{\text{number of ms in day}}+\text{(difference between JD and UNIX epoch in days)}$$
$$JD_{UT}=\frac{\text{UTC in seconds}}{86400000}+2440587.5$$
This is the _getJulianDate_ function.

## TT from JD

Terrestrial Time (TT) is often used to measure JD, and is a construct that astronomers commonly use to perform calculations.
$$\Delta JD_{TT}= \Delta JD_{UT}+\frac{\text{diff between TAI and TT in seconds}}{\text{seconds in a day}}$$
UTC and TT are not directly related to each other, but instead through TAI, since both values are based on TAI.

$$\text{diff between TAI and TT in seconds}=\text{(diff between TAI and UTC in s)}+\text{(diff between TT and TAI in s)}$$

Thus, UTC can be converted into TT through a system of equations.
$$\Delta UTC=\Delta TAI-37$$
$$\Delta TT=\Delta TAI+32.184$$
$$\Delta TT= \Delta UTC+37+32.184$$
By putting in all the numbers into the original JD->TT equation, the function for Julian days passed in Terrestrial Time days results.
$$\Delta JD_{TT}=\Delta JD_{UT}+\frac{\text{37+32.184}}{\text{86400}}$$
This is the _getJulianDateTerrestrialTime_ function.

## J2000 TT

The final transformation until the data can become usable is to turn $JD_{TT}$, which has the epoch on January 1, 4713 BC, into the $\text{J2000 epoch}$ on January 1, 2000 AD, something more recent and thus more intelligible. Interestingly, both epochs happen during noon, and finally, are both in _TT_.

$$\Delta JD_{J2000}=\Delta JD_{TT}-\text{(diff between TT and J2000 epoch in days)}$$
$$\Delta JD_{J2000}=\Delta JD_{TT}-241545.0$$
This is the _getJulianDate2000Epoch_ function.

<div style="page-break-after: always;"></div>

## Mars Sol Date (MSD)

The number of sols on Mars since J2000. The definition of 'day', throughout this project, is 86400 SI seconds, which measures the number of sols (solar day) on Earth.

| Term           | Definition                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------ |
| _solar day_    | time it takes when the planet rotates for the Sun to return to the same meridian                 |
| _sidereal day_ | time it takes when the planet rotates for the stars to re-appear in the same position in the sky |
| _day_          | 24 hours, 86400 SI seconds, or a single _solar day_ on Earth                                     |
| _sol_          | variable hours, based on the SI second, over a single _solar day_ on a specified planet          |

On the midnight of January 6th, 2000, on Earth, it was also midnight at the Martian prime meridian (A Post Pathfinder); by subtracting the difference between those two epochs from $\Delta JD_{J2000}$ in Earth days, or 4.5 Earth days, the epoch of the Mars calendar is shifted backwards from Jan 6 to Jan 1.
$$MSD=\frac{\Delta JD_{J2000}-(\Delta \text{ J2000 epoch and Mars midnight})}{\text{ratio of Mars to Earth's length of day}}$$$$+\Delta (\text{ J2000 epoch and Dec 29, 1873 in Mars-sols}) + \text{(slight adjustment with a constant number)}$$
Thus, with the numbers entered, the following expression is retrieved.

$$MSD=\frac{\Delta JD_{J2000} \text{ (Earth days)}-4.5 \text{ (Earth days)}}{\frac{24.65979 \text{ hrs }}{24 \text{ hrs}}}+44796.0 \text{ Mars sols}-0.0009626 \text{ Mars sols}$$
Looking at the equation's units of measurement, the first fraction converts Earth days into Mars sols. The following equation explains the stoichiometry behind this first fraction.
$$\frac{\Delta JD_{TT} -4.5\text{ Earth days}}{}\times \frac{24 \text{hrs}}{\text{ 1 Earth day}} \times \frac{1 \text{ Mars day}}{\text{ 24.65979 hrs}}$$
To account for the convention of using the epoch on December 29, 1873, _44796.0_ Mars sols is added to the ΔJ2000 value. Almost precisely 126 Julian years, or 67 Mars tropical revolutions, occur between midday January 6, 2000, and December 29, 1873. _0.0009626_ Mars sols is then subtracted to make up for misalignments over the exact positioning of the Martian prime meridian at Airy-0. This formula is accurate for ±10s.

$$MSD =\frac{\Delta JD_{J2000} -4.5 }{1.027491251}+44796.0 -0.0009626 $$

The resulting number is the amount of Martian sols since midday December 29, 1873.

This is the _marsStandardDate_ function.

## MTC 24 or MTC_Extended?

### MTC24

Some clocks, like NASA's Mars24 program, changes the definition of one second on Mars by dividing the day evenly by 24 hours. This somewhat eliminates-- through ignorance-- the variable of having to consider time dilation through relativity.

The _marsTimeMTC24_ function serves this interpretation.

To get the number of hours, MSD is multiplied by 24 (hours) like how one would treat base24, then is modulated by 24. What is left after the modulation is the decimal portion of the MSD number, which represents the counting hours of the current sol, or $hours_{t}$

$$hours_{t}  = \frac{\Delta \text{sols on Mars}}{} \times \frac{24 \text{ hours}}{\text{1 MSD sol}} \\%\text{ 24 hours}$$
$$hours_{t} = \text{mod}(MSD \times 24.0, 24)$$

Alternatively written in code as: $(MSD \times 24) \\% 24$.

To get the number of minutes, $hours_{t}$ is multiplied by 60 and then modulated by 60, as a minute is equivalent to 60 minutes. The result is represented by $minutes_{t}$

$$minutes_{t}= (hours_{t} \times 60)\text{ \\% 60 }$$

Alternatively written as: $minutes_{t} = \text{mod}(hours_{t} \times 60, 60)$.

To get the number of seconds, the number of minutes is multiplied by 60, before being modulated by 60, due to how a single minute holds 60 seconds. The result is represented by $seconds_{t}$

$$seconds_{t}= (minutes_{t} \times 60)\text{ \\% 60 }$$
Finally, the values are formatted into a hh:mm:ss format.

This is the _marsTimeMTC_ function.

### MTC_Extended (MTCE)

When converting the hours to days, instead of multiplying and modulating by _24_, use _24.65979_ instead. By using _24.65979_, the value of the second on the program remains the same as the SI units' definition.

This is the _marsTimeMTC_Extended_ function.
