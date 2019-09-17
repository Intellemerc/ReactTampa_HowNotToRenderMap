var faker = require("./faker");

function generateData() {
  var positions = [];
  for (var id = 0; id < 1000000; id++) {
    const latitude = parseFloat(faker.address.latitude(50, 24));
    const longitude = parseFloat(faker.address.longitude(-122, -77));
    if (id % 5000 == 0) {
      console.log("Lat, Long: ", latitude, longitude);
    }
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
