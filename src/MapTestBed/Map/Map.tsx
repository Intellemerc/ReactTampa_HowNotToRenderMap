import React, { useState, useEffect } from "react";
import { IGpsLocaiton } from "./IGPSLocation";
import { ClipLoader } from "react-spinners";

import ClusterMap from "./ClusterMap";
import API from "../../API";

interface IMapState {
  positions?: IGpsLocaiton[];
  loading: boolean;
}
interface ICustomerMapProp {
  maxPositions: number;
  updateList: number[] | undefined;
}

const Map: React.StatelessComponent<ICustomerMapProp> = props => {
  const [{ positions, loading }, setData] = useState<IMapState>({
    positions: [],
    loading: true
  });
  const { maxPositions, updateList } = props;
  useEffect(() => {
    setData({ loading: true, positions });
    async function getPositions() {
      console.log("loading maxpositions: ", maxPositions);

      API.GetPositions(maxPositions).then(positions => {
        console.log("Positions/length: ", positions, positions.length);
        setData({ positions, loading: false });
      });
    }
    getPositions();
  }, [maxPositions]);

  useEffect(() => {
    async function updatePositions() {
      if (!updateList || positions.length === 0) return;

      API.GetItems(updateList)
        .then(newPositions => {
          return positions.map(origPos => {
            const matched = newPositions.filter(np => np.id === origPos.id);
            if (matched.length > 0) {
              return matched[0];
            }
            return origPos;
          });
        })
        .then(updatedPositions => {
          if (updatedPositions) {
            console.log(`${updatedPositions.length} Positions updated`);
            setData({ positions: updatedPositions, loading: false });
          }
        });
    }
    updatePositions();
  }, [updateList]);

  return (
    <>
      <div
        style={{ position: "absolute", zIndex: 100, top: "30%", left: "50%" }}
      >
        <ClipLoader loading={loading} size={150} />
      </div>
      <div style={{ opacity: loading ? 0.25 : 1 }}>
        <ClusterMap positions={positions} />
      </div>
    </>
  );
};

export default Map;
