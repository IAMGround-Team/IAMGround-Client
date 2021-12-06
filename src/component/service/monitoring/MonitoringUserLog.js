import React, { useEffect, useState } from "react";
import qs from "qs";
import { Div } from "../style/styled-compo";
import { Link, useLocation } from "react-router-dom";
import { Personbutton, Groupbutton } from "../style/Icons";
import Button from "@mui/material/Button";
import TableMaterial from "../../module/TableMaterial";
import axios from "axios";
import moment from "moment";

const MonitoringUserLog = () => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const decideWho = () => {
    if (query.iam_user_arn) return query.iam_user_arn;
    else return query.bookmark_id;
  };

  const [logs, setLogs] = useState([]);
  const [identityName, setIdentityName] = useState("");
  const fetchLogs = async () => {
    const response =
      decideWho().substring(0, 4) === "user"
        ? await axios.get(`http://54.180.115.206:8000/mock/monitoring/log?iam_user_arn=${decideWho()}`)
        : await axios.get(`http://54.180.115.206:8000/mock/monitoring/log?bookmark_id=${decideWho()}`);
    setLogs(response.data.resourceLogs);
    decideWho().substring(0, 4) === "user" ? setIdentityName(response.data.resourceName) : setIdentityName(response.data.bookmarkName);
    console.log("response", response);
    console.log("logs", logs);
  };
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <h1
        style={{
          color: "#787878",
          margin: "0px 0px 10px 0px",
          fontSize: "26px",
          height: "35px",
        }}
      >
        Monitoring
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Personbutton />
          <div style={{ fontSize: "24px", fontWeight: "bolder" }}>{identityName}</div>
        </div>
        <div style={{ paddingRight: "10px" }}>
          <Link to="/visualization" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ backgroundColor: "#D6D6D6", color: "black" }}>
              {identityName} 정보 보기
            </Button>
          </Link>
        </div>
      </div>
      <Div>
        <div style={{ width: "calc(100%-30px)" }}>
          <TableMaterial
            columns={[
              { title: "Time", field: "time" },
              { title: "User", field: "user" },
              { title: "Resource", field: "resource" },
              { title: "Activity", field: "activity" },
              { title: "Result", field: "result" },
              { title: "Reason", field: "reason" },
              { title: "Ip", field: "ip" },
            ]}
            cdata={logs.map((v, i) => {
              return {
                time: moment(v.creation).format("YYYY/MM/DD-hh:mm"),
                user: v.identityName,
                resource: v.resourseName,
                activity: v.apiName,
                result: v.result === 1 ? "Success" : "Fail",
                reason: v.reasonCategory,
                ip: v.accessIp,
                caution: v.reasonCategory ? true : false,
                id: v.logId,
              };
            })}
            title="User Log"
            type="monitoring"
          />
        </div>
      </Div>
    </>
  );
};

export default MonitoringUserLog;

//location으로
