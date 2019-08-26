import React from "react";
import "./Marker.css";

interface IProps {
  ClusterCount: number;
}

const ClusterMarker: React.FC<IProps> = ({ ClusterCount }) => {
  return <div className="marker">{ClusterCount}</div>;
};

export default ClusterMarker;
