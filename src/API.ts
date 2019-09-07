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

  /**
   *Move the given geospacial location by a small amount
   *
   * @param {IGpsLocation} loc
   * @returns {IGpsLocation}
   * @memberof API
   */
  randomMove(loc: IGpsLocation): IGpsLocation {
    const shouldSubMove = Math.floor(Math.random() * 100) % 2 === 0;

    loc.geometry.coordinates[0] =
      loc.geometry.coordinates[0] +
      Math.random() * 0.1 * (shouldSubMove ? -1 : 1);
    loc.geometry.coordinates[1] =
      loc.geometry.coordinates[1] +
      Math.random() * 0.1 * (shouldSubMove ? -1 : 1);
    return loc;
  }
  /**
   * Get updated list of items based on the passed in list
   *
   * @param {number[]} itemsToUpdate List of items to request new positions for
   * @param {IGpsLocation[]} existingPostions the existing position list
   * @returns {Promise<IGpsLocation[]>} new list of postions with updates
   * @memberof API
   */
  GetItems(
    itemsToUpdate: number[],
    existingPostions: IGpsLocation[]
  ): Promise<IGpsLocation[]> {
    return new Promise((resolve, reject) => {
      resolve(
        itemsToUpdate.map(itm => {
          const itmToUpdate = this.randomMove(existingPostions[itm]);

          //create new object with index of existin position, new gps position
          //and the ID of the position
          return { ...itmToUpdate };
        })
      );
    });
  }
}

export default new API();
