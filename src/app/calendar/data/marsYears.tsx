var yearsList = [{id: "0", year: "0"}]
for (let i=1; i<1000; i++) {
    yearsList[yearsList.length] = {id: i.toString(), year: i.toString()};
}

export const marsYears = yearsList;