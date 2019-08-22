import { IGpsLocaiton } from "./IGPSLocation";
import faker from "faker";

const MAX_LIMIT = 1000000;

interface IIndexedPosition {
  i: number;
  position: IGpsLocaiton;
}

const data = (() => {
  var positions = [];
  console.log();
  for (var id = 0; id < 1000000; id++) {
    const latitude = parseFloat(faker.address.latitude());
    const longitude = parseFloat(faker.address.longitude());
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
  GetPositions(maxPositions: number): Promise<IGpsLocaiton[]> {
    let pages: Promise<IGpsLocaiton[]> = new Promise((resolve, reject) => {
      resolve(
        data.slice(0, maxPositions < MAX_LIMIT ? maxPositions : MAX_LIMIT)
      );
    });

    return pages;
  }
  //replace previous pos with random position, but keep array index
  GetItems(itemsToUpdate: number[]): Promise<IGpsLocaiton[]> {
    return new Promise((resolve, reject) => {
      resolve(
        itemsToUpdate.map(itm => {
          let pos = data[Math.floor(Math.random() * MAX_LIMIT)];
          //create new object with index of existin position, new gps position
          //and the ID of the position
          return { ...pos, id: itm };
        })
      );
    });
  }
}

export default new API();
