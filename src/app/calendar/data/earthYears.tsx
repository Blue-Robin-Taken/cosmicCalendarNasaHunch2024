let yearsList = [{ id: '0', year: '1000' }];
for (let i = 1; i < 2000; i++) {
    yearsList[yearsList.length] = {
        id: i.toString(),
        year: (i + 1000).toString(),
    };
}

export const earthYears = yearsList;
