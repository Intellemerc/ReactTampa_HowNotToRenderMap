import faker from "faker";

import IGpsLocation from "./MapTestBed/Map/IGPSLocation";

const MAX_LIMIT = 100000;

function randomCoordBetween(min, max) {
  const precision = 4;

  return parseFloat(
    faker.random
      .number({
        max: max,
        min: min,
        precision: parseFloat((0.0).toPrecision(precision) + "1")
      })
      .toFixed(precision)
  );
}

const data = (() => {
  console.time("genData");
  var positions: IGpsLocation[] = [];
  console.log();
  for (var id = 0; id < MAX_LIMIT; id++) {
    const latitude = randomCoordBetween(21, 50);
    const longitude = randomCoordBetween(-125, -77);
    //if (id % 5000 === 0) console.log(latitude, longitude);

    const label = `${faker.name.firstName()} ${faker.name.lastName()}`;
    positions.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      properties: {
        label,
        id
      }
    });
  }
  console.timeEnd("genData");
  return positions;
})();

class API {
  GetPositions(maxPositions: number): Promise<IGpsLocation[]> {
    let pages: Promise<IGpsLocation[]> = new Promise((resolve, reject) => {
      resolve(
        data.slice(0, maxPositions < MAX_LIMIT ? maxPositions : MAX_LIMIT)
      );
    });

    return pages;
  }
  //replace previous pos with random position, but keep array index
  GetItems(
    itemsToUpdate: number[],
    existingPostions: IGpsLocation[]
  ): Promise<IGpsLocation[]> {
    return new Promise((resolve, reject) => {
      resolve(
        itemsToUpdate.map(itm => {
          let existing =
            data[
              Math.floor(Math.random() * (MAX_LIMIT - existingPostions.length))
            ];
          //create new object with index of existin position, new gps position
          //and the ID of the position
          let newItm = { ...existing };
          newItm.properties.id = itm;
          return newItm;
        })
      );
    });
  }
}

export default new API();
