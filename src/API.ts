import { IGpsLocation } from "./IGPSLocation";
import faker from "faker";

const MAX_LIMIT = 1000000;

interface IIndexedPosition {
  i: number;
  position: IGpsLocation;
}

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
  var positions = [];
  console.log();
  for (var id = 0; id < 1000000; id++) {
    const latitude = randomCoordBetween(21, 50);
    const longitude = randomCoordBetween(-125, -77);
    //if (id % 5000 === 0) console.log(latitude, longitude);

    const label = `${faker.name.firstName()} ${faker.name.lastName()}`;
    positions.push({
      id,
      latitude,
      longitude,
      label
    });
  }
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

    loc.latitude =
      loc.latitude + Math.random() * 0.1 * (shouldSubMove ? -1 : 1);
    loc.longitude =
      loc.longitude + Math.random() * 0.1 * (shouldSubMove ? -1 : 1);
    return loc;
  }
  //replace previous pos with random position, but keep array index
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
