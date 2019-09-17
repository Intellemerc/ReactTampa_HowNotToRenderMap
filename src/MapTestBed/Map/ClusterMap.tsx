import React from "react";
import { withProps, compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import ClusterMarker from "./Markers/ClusterMarker";

const DEFAULT_VIEWPORT = {
  center: { lat: 37.040578, lng: -98.506877 },
  zoom: 5
};

interface IClusterMapProps {
  positions?: supercluster<supercluster.AnyProps, supercluster.AnyProps>;
  onBoundshanged: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  count: number;
}

//Feature<Point, AnyProps>
function getMarkers(
  map: any,
  positions: supercluster<supercluster.AnyProps, supercluster.AnyProps>
) {
  if (!positions || !map || !map.current) return null;

  map = map.current;
  //get the maps current viewport and zoom level
  const bounds = map.getBounds();
  const zoom = map.getZoom();

  //ask supercluster to get the positions in the viewport
  const sw = bounds.getSouthWest(),
    ne = bounds.getNorthEast();
  const bbox: GeoJSON.BBox = [sw.lng(), sw.lat(), ne.lng(), ne.lat()];

  let clusters = [];
  if (sw.lng() > ne.lng()) {
    // here we need to get clusters two times:
    // when there are negative values
    bbox[0] = sw.lng() - 360;
    clusters = positions.getClusters(bbox, zoom);
    // ...and positive ones.
    bbox[0] = sw.lng();
    bbox[2] = ne.lng() + 360;
    clusters = clusters.concat(positions.getClusters(bbox, zoom));
  } else {
    clusters = positions.getClusters(bbox, zoom);
  }

  return clusters.map(feature => {
    var latLon = {
      lng: feature.geometry.coordinates[0],
      lat: feature.geometry.coordinates[1]
    };

    if (feature.properties && feature.properties.cluster) {
      var count = feature.properties.point_count;
      return (
        <ClusterMarker
          latLon={latLon}
          key={"Cluster:" + feature.properties.cluster_id + "-" + count}
          ClusterCount={count}
        />
      );
    }
    return <Marker position={latLon} key={feature.properties.id} />;
  });
}

class ClusterMap extends React.Component<IClusterMapProps> {
  map: any;
  holdUpdates: boolean;
  constructor(props) {
    super(props);
    this.holdUpdates = false;
    this.map = React.createRef();
  }
  componentDidMount() {
    this.holdUpdates = true;
  }
  render() {
    const {
      positions,
      count,
      onBoundshanged,
      onDragStart,
      onDragEnd
    } = this.props;

    //console.time("getmarkers");
    const markers = getMarkers(this.map, positions);
    //console.timeEnd("getmarkers");
    return (
      <>
        <div>Marker/Cluser count: {markers ? markers.length : 0}</div>
        <GoogleMap
          ref={this.map}
          defaultZoom={DEFAULT_VIEWPORT.zoom}
          defaultCenter={DEFAULT_VIEWPORT.center}
          onBoundsChanged={onBoundshanged}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {markers}
        </GoogleMap>
      </>
    );
  }
}

const enahnced = compose<IClusterMapProps, IClusterMapProps>(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&key=" +
      process.env.REACT_APP_GOOGLE_MAPS_API,
    loadingElement: <div style={{ height: `90%`, width: "100vw" }} />,
    containerElement: (
      <div
        style={{
          height: `500px`,
          width: "100%",
          margin: "auto auto"
        }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
);

export default enahnced(ClusterMap);
