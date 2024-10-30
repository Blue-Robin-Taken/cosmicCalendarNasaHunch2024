export default function Clocks() {
  // Generate all GMT Divs
  const divList = [];
  for (let x = -12; x <= 12; x++) {
    divList.push(x);
  }
  const mapped = divList.map((number, index) => {
    return (
      <div key={index} className="w-10 h-10 rounded-sm bg-slate-600">
        {number}
      </div>
    );
  });

  return (
    <>
      <div>
        <div className="flex flex-row flex-grow row-auto space-x-11 ">
          {mapped}
        </div>
      </div>
    </>
  );
}
