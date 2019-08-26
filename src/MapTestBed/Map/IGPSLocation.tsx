export default interface IGpsLocation {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  properties: {
    label: string;
    id: number;
  };
}
