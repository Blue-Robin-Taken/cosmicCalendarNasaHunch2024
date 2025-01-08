"use client";
import date from "date-and-time";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Clocks() {
  // Generate all GMT Divs

  const divList = [];
  for (let x = -12; x <= 12; x++) {
    divList.push(x);
  }
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const mapped = divList.map((number, index) => {
    function returnNum(n: number) {
      // basically just returns the num with a "+" for positive or nothing for negative, it just looks better
      if (n > 0) {
        if (n < 10) {
          return `+0${n}:00`;
        }
        if (n >= 10) {
          return `+${n}:00`;
        }
      } else {
        if (n == 0) {
          return "00:00";
        }
        if (n >= 10) {
          return `-0${n * -1}:00`;
        } else {
          return `${n}:00`;
        }
      }
    }

    let d = new Date(Date.now());
    d = date.addHours(d, number);

    return (
      // For the GMT divs

      <div
        key={index}
        className="w-96 h-40 rounded-lg bg-theme-graylight text-center lm-h1-text dark:text-dm-h1-text"
      >
        <h1 className="justify-center text-lg font-semibold m-3">
          GMT {returnNum(number)}
        </h1>
        <h1 className="justify-center text-5xl font-medium m-2">
          {date.format(d, `hh:mm A`, true)}
        </h1>
      </div>
    );
  });

  return (
    // Main return
    <>
      <div>
        <div className="grid grid-cols-4 grid-flow-row min-h-screen gap-y-10 gap-x-10 m-5 justify-items-center">
          {mapped}
        </div>
      </div>
    </>
  );
}
