var faker = require("faker");

function generateData(limit) {
  var positions = [];
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

  console.log(positions.length);
  return { positions };
}

module.exports = generateData;
