import React, { useState, useEffect } from "react";
import { IGpsLocaiton } from "../IGPSLocation";
import { ClipLoader } from "react-spinners";

import ClusterMap from "./ClusterMap";

const MAX_LIMIT = 1000;

interface IMapState {
  positions?: IGpsLocaiton[];
  loading: boolean;
}
interface ICustomerMapProp {
  maxPositions: number;
}

const Map: React.StatelessComponent<ICustomerMapProp> = props => {
  const [{ positions, loading }, setData] = useState<IMapState>({
    positions: [],
    loading: true
  });
  const { maxPositions } = props;

  useEffect(() => {
    setData({ loading: true, positions });
    async function getPositions() {
      console.log("loading maxpositions: ", maxPositions);
      let pages: Promise<IGpsLocaiton>[] = [];

      for (let i = 1; i < maxPositions / MAX_LIMIT + 1; i++) {
        const positionsToLoad =
          maxPositions > MAX_LIMIT ? MAX_LIMIT : maxPositions;
        const url =
          "http://localhost:3001/positions?_limit=" +
          positionsToLoad +
          "&_page=" +
          i;
        // console.log("My Url", url);
        pages.push(fetch(url).then(resp => resp.json()));
      }
      console.log("All pages: ", ...pages);

      Promise.all(pages).then(pages => {
        let positions: IGpsLocaiton[] = [];
        positions = positions.concat(...pages);
        console.log("Positions/length: ", positions, positions.length);
        setData({ positions, loading: false });
      });
    }
    getPositions();
  }, [maxPositions]);

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
