import React, { useState } from "react";
import { Div } from "../style/styled-compo";
import ScanningConfig from "./ScanningConfig";
import ScanningPer from "./ScanningPer";
import ScanningSummary from "./ScanningSummary";

function ScanningResult() {
  const [tab, setTab] = useState(0);

  const handleTabClick = (tabNumber) => () => {
    setTab(tabNumber);
  };

  const Overview = () => <ScanningSummary />;

  const Permission = () => <ScanningPer />;

  const Config = () => <ScanningConfig />;

  return (
    <>
      <h1 style={{ position: "fixed", top: "5px", color: "#18b7be" }}>Scanning</h1>
      <Div>
        <div style={{ height: "25px", display: "flex" }}>
          <span
            style={{
              backgroundColor: tab === 0 ? "#efefef" : "#b7d6da",
              border: "1px solid black",
              borderBottom: tab === 0 ? "none" : "1px solid black",
              width: "150px",
              textAlign: "center",
              fontWeight: tab === 0 ? "bold" : "normal",
            }}
            onClick={handleTabClick(0)}
          >
            요약
          </span>
          <span
            style={{
              backgroundColor: tab === 1 ? "#efefef" : "#b7d6da",
              border: "1px solid black",
              borderBottom: tab === 1 ? "none" : "1px solid black",
              width: "150px",
              textAlign: "center",
              fontWeight: tab === 1 ? "bold" : "normal",
            }}
            onClick={handleTabClick(1)}
          >
            권한 분리 추천
          </span>
          <span
            style={{
              backgroundColor: tab === 2 ? "#efefef" : "#b7d6da",
              border: "1px solid black",
              borderBottom: tab === 2 ? "none" : "1px solid black",
              width: "150px",
              textAlign: "center",
              fontWeight: tab === 2 ? "bold" : "normal",
            }}
            onClick={handleTabClick(2)}
          >
            올바른 구성 추천
          </span>
          <span
            style={{
              backgroundColor: "#efefef",
              borderBottom: "1px solid black",
              flex: 1,
            }}
          ></span>
        </div>
        <div style={{ width: "100%", height: "calc(100% - 30px)" }}>
          {tab === 0 && <Overview />}
          {tab === 1 && <Permission />}
          {tab === 2 && <Config />}
        </div>
      </Div>
    </>
  );
}

export default ScanningResult;
