import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import supercluster from "supercluster";

import ClusterMap from "./ClusterMap";
import API from "../../API";
import IGpsLocation from "./IGPSLocation";

let count = 0;
interface IMapState {
  positions?: IGpsLocation[];
  loading: boolean;
}
interface ICustomerMapProp {
  maxPositions: number;
  updateList: number[] | undefined;
}
const sc = new supercluster({ radius: 75, maxZoom: 17, log: false });
function getSuperCluster(
  points: IGpsLocation[]
): supercluster<supercluster.AnyProps, supercluster.AnyProps> {
  //console.time("supercluser load");
  const loaded = sc.load(points);
  //console.timeEnd("supercluser load");
  return loaded;
}

const MapContainer: React.StatelessComponent<ICustomerMapProp> = props => {
  const [{ positions, loading }, setData] = useState<IMapState>({
    positions: [],
    loading: true
  });
  const { maxPositions, updateList } = props;
  useEffect(() => {
    setData({ loading: true, positions });
    async function getPositions() {
      //console.log("loading maxpositions: ", maxPositions);

      API.GetPositions(maxPositions).then(FeatPositions => {
        //console.log("Positions/length: ", positions, positions.length);

        setData({ positions: FeatPositions, loading: false });
      });
    }
    getPositions();
  }, [maxPositions]);

  useEffect(() => {
    async function updatePositions() {
      if (!updateList || positions.length === 0) return;

      API.GetItems(updateList, positions)
        .then(newFeaPositions => {
          //map over array to get new position list
          return positions.map(origFeaPos => {
            //match the updated positions into the current feature array
            const matched = newFeaPositions.filter(
              np => np.properties.id === origFeaPos.properties.id
            );
            if (matched.length > 0) {
              return matched[0];
            }
            return origFeaPos;
          });
        })
        .then(updatedPositions => {
          if (updatedPositions) {
            //console.log(`${updatedPositions.length} Positions updated`);
            setData({ positions: updatedPositions, loading: false });
          }
        });
    }
    updatePositions();
  }, [updateList]);

  const clustered = getSuperCluster(positions);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        Positions Loaded:{" "}
        <span style={{ fontWeight: "bolder" }}>
          {positions ? positions.length : 0}
        </span>
      </div>
      <div style={{ opacity: loading ? 0.25 : 1 }}>
        <ClusterMap
          positions={clustered}
          count={count++}
          onBoundshanged={() => {
            setData({ positions: positions, loading: false });
          }}
        />
      </div>
    </>
  );
};

export default MapContainer;
