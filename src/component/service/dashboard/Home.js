import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { Link } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import TableMaterial from "../../module/TableMaterial";
import axios from "axios";
import moment from "moment";

function Home() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [dashboardData, setDashboardData] = useState({
    resourceList: {
      allUser: 0,
      dangerousUser: 0,
      allServiceID: 0,
      dangerousServiceID: 0,
      allGroup: 0,
      dangerousGroup: 0,
      allRole: 0,
      dangerousRole: 0,
      allPolicy: 0,
      dangerousPolicy: 0,
    },
    eventGraph: [],
    dangerousUserCount: 0,
  });
  const fetchDashboardData = async () => {
    const response = await axios.get("http://54.180.115.206:8000/mock/dashboard");
    setDashboardData(response.data.dashboardData);
    console.log("responseData", response);
    console.log("dashboardData", dashboardData);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const [clouds, setClouds] = useState([]);
  const fetchClouds = async () => {
    const responseCloud = await axios.get("http://54.180.115.206:8000/mock/cloud");
    setClouds(responseCloud.data.cloudList);
    console.log("responseCloud", responseCloud);
  };
  useEffect(() => {
    fetchClouds();
  }, []);

  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      curve="monotoneX"
      colors="#90CAF9"
      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      useMesh={true}
    />
  );

  const pieData = [
    {
      id: "안전한 유저",
      label: "안전한 유저",
      value: 25,
      color: "#61CDBB",
    },
    {
      id: "위험한 로그가 발생한 유저",
      label: "위험한 로그가 발생한 유저",
      value: 75,
      color: "#F47560",
    },
  ];

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.6}
      padAngle={5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={(pie) => pieData.find((v) => v.id === pie.id).color}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#DEDEDE"
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={(pie) => pieData.find((v) => v.id === pie.id).color}
    />
  );

  return (
    <>
      <h1 style={{ color: "#787878", margin: "0px 0px 10px 0px", fontSize: "26px" }}>Dashboard</h1>
      <div style={{ width: "calc(100% - 30px)", height: "145px", backgroundColor: "#dedede", padding: "15px", marginBottom: "30px" }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ color: "#787878", fontSize: "20px" }}>Percentage of Dangerous IAM Resources</div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: "120px", backgroundColor: "#ffffff", borderRadius: "4px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
                  {clouds.map((v, i) => {
                    return (
                      <div style={{ textAlign: "center", fontSize: "26px" }}>
                        <MenuItem value={10 * i}>{v.nickName}</MenuItem>
                      </div>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", gap: "0px 2%", marginTop: "15px" }}>
            <div style={{ width: "calc(18.4% - 20px)", height: "60px", backgroundColor: "#ffffff", borderRadius: "8px", padding: "10px" }}>
              <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "500", height: "19px" }}>
                <span style={{ fontWeight: "bold" }}>{dashboardData.resourceList.allUser}</span> IAM USERS
              </div>
              <div style={{ height: "41px", display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px", marginBottom: "2px", fontSize: "12px" }}>{parseInt((dashboardData.resourceList.dangerousUser / dashboardData.resourceList.allUser) * 100)}%</div>
                <div style={{ width: "100%", height: "10px", backgroundColor: "#EFEFEF", borderRadius: "4px" }}>
                  <div
                    style={{
                      width: `${parseInt((dashboardData.resourceList.dangerousUser / dashboardData.resourceList.allUser) * 100)}%`,
                      height: "10px",
                      backgroundColor: "#90CAF9",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div style={{ width: "calc(18.4% - 20px)", height: "60px", backgroundColor: "#ffffff", borderRadius: "8px", padding: "10px" }}>
              <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "500", height: "19px" }}>
                <span style={{ fontWeight: "bold" }}>{dashboardData.resourceList.allServiceID}</span> IAM SERVICE IDS
              </div>
              <div style={{ height: "41px", display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px", marginBottom: "2px", fontSize: "12px" }}>
                  {parseInt((dashboardData.resourceList.dangerousServiceID / dashboardData.resourceList.allServiceID) * 100)}%
                </div>
                <div style={{ width: "100%", height: "10px", backgroundColor: "#EFEFEF", borderRadius: "4px" }}>
                  <div
                    style={{
                      width: `${parseInt((dashboardData.resourceList.dangerousServiceID / dashboardData.resourceList.allServiceID) * 100)}%`,
                      height: "10px",
                      backgroundColor: "#90CAF9",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div style={{ width: "calc(18.4% - 20px)", height: "60px", backgroundColor: "#ffffff", borderRadius: "8px", padding: "10px" }}>
              <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "500", height: "19px" }}>
                <span style={{ fontWeight: "bold" }}>{dashboardData.resourceList.allGroup}</span> IAM GROUPS
              </div>
              <div style={{ height: "41px", display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px", marginBottom: "2px", fontSize: "12px" }}>{parseInt((dashboardData.resourceList.dangerousGroup / dashboardData.resourceList.allGroup) * 100)}%</div>
                <div style={{ width: "100%", height: "10px", backgroundColor: "#EFEFEF", borderRadius: "4px" }}>
                  <div
                    style={{
                      width: `${parseInt((dashboardData.resourceList.dangerousGroup / dashboardData.resourceList.allGroup) * 100)}%`,
                      height: "10px",
                      backgroundColor: "#90CAF9",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div style={{ width: "calc(18.4% - 20px)", height: "60px", backgroundColor: "#ffffff", borderRadius: "8px", padding: "10px" }}>
              <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "500", height: "19px" }}>
                <span style={{ fontWeight: "bold" }}>{dashboardData.resourceList.allRole}</span> IAM ROLES
              </div>
              <div style={{ height: "41px", display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px", marginBottom: "2px", fontSize: "12px" }}>{parseInt((dashboardData.resourceList.dangerousRole / dashboardData.resourceList.allRole) * 100)}%</div>
                <div style={{ width: "100%", height: "10px", backgroundColor: "#EFEFEF", borderRadius: "4px" }}>
                  <div
                    style={{
                      width: `${parseInt((dashboardData.resourceList.dangerousRole / dashboardData.resourceList.allRole) * 100)}%`,
                      height: "10px",
                      backgroundColor: "#90CAF9",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div style={{ width: "calc(18.4% - 20px)", height: "60px", backgroundColor: "#ffffff", borderRadius: "8px", padding: "10px" }}>
              <div style={{ textAlign: "center", fontSize: "14px", fontWeight: "500", height: "19px" }}>
                <span style={{ fontWeight: "bold" }}>{dashboardData.resourceList.allPolicy}</span> IAM POLICIES
              </div>
              <div style={{ height: "41px", display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px", marginBottom: "2px", fontSize: "12px" }}>{parseInt((dashboardData.resourceList.dangerousPolicy / dashboardData.resourceList.allPolicy) * 100)}%</div>
                <div style={{ width: "100%", height: "10px", backgroundColor: "#EFEFEF", borderRadius: "4px" }}>
                  <div
                    style={{
                      width: `${parseInt((dashboardData.resourceList.dangerousPolicy / dashboardData.resourceList.allPolicy) * 100)}%`,
                      height: "10px",
                      backgroundColor: "#90CAF9",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "calc(100% - 30px)", height: "300px", backgroundColor: "#dedede", padding: "15px", display: "flex", marginBottom: "30px" }}>
        <div style={{ width: "70%", height: "100%", backgroundColor: "white", borderRadius: "5px" }}>
          <div style={{ color: "#787878", fontSize: "20px", paddingLeft: "10px", paddingTop: "10px" }}>Change in the Number of Events</div>
          <div style={{ width: "100%", height: "90%" }}>
            <MyResponsiveLine
              data={[
                {
                  id: "a",
                  color: "a",
                  data: dashboardData.eventGraph.map((v, i) => {
                    return {
                      x: v.time,
                      y: i > 0 ? v.count - dashboardData.eventGraph[i - 1].count : 0,
                    };
                  }),
                },
              ]}
            />
          </div>
        </div>

        <div style={{ width: "30%", height: "100%" }}>
          <MyResponsivePie
            data={[
              {
                id: "안전한 유저",
                label: "안전한 유저",
                value: dashboardData.resourceList.allUser - dashboardData.dangerousUserCount,
                color: "#61CDBB",
              },
              {
                id: "위험한 로그가 발생한 유저",
                label: "위험한 로그가 발생한 유저",
                value: dashboardData.dangerousUserCount,
                color: "#F47560",
              },
            ]}
          />
          <div style={{ position: "relative", textAlign: "center", bottom: "180px" }}>
            <span style={{ color: "#e0452b" }}>{dashboardData.dangerousUserCount}</span> / {dashboardData.resourceList.allUser}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-65px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "16px", backgroundColor: "#F47560", marginRight: "6px" }} />
            <div>위험한 로그가 발생한 유저</div>
          </div>
        </div>
      </div>

      <div style={{ width: "calc(100% - 30px)", height: "260px", backgroundColor: "#dedede", padding: "15px" }}>
        <TableMaterial
          columns={[
            { title: "Cloud Name", field: "cloudName" },
            { title: "Last Scan", field: "lastScanTime" },
            { title: "Status", field: "status" },
            { title: "Result", field: "result" },
          ]}
          cdata={clouds.map((v, i) => {
            return {
              cloudName: v.nickName,
              lastScanTime: moment(v.lastScan).format("YYYY/MM/DD-hh:mm"),
              status: v.status === 1 ? "활성화" : "비활성화",
              result: (
                <Link to="/scan/report/summary">
                  <DescriptionIcon />
                </Link>
              ),
            };
          })}
          title="Clouds"
          type="main"
        />
      </div>
    </>
  );
}

export default Home;
