import React, { useEffect, useState } from 'react'
import { Div1, Div2, Div3, Div4, Row, SummaryWrapper, Title } from '../style/styled-compo'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveBullet } from '@nivo/bullet'
import WarningIcon from '@mui/icons-material/Warning'
import GppGoodIcon from '@mui/icons-material/GppGood'
import TableMaterial from '../../module/TableMaterial'
import axios from 'axios'

const ScanningSummary = ({ report_id }) => {
  const [summaryData, setSummaryData] = useState({
    configBarGraph: {
      certificateCount: 0,
      credentialCount: 0,
      mfaCount: 0,
      pwCount: 0,
    },
    configHalfGraph: {
      normalCount: 0,
      riskyCount: 0,
    },
    permissionBarGraph: {
      groupCount: 0,
      policyCount: 0,
      roleCount: 0,
      userCount: 0,
    },
    permissionHalfGraph: {
      normalCount: 0,
      riskyCount: 0,
    },
    recommenationChart: {
      configCurrent: 0,
      configLast: 0,
      permissionCurrent: 0,
      permissionLast: 0,
    },
    scanResultTable: [],
  })
  const fetchData = async () => {
    const response = await axios.get(`/api/scan/report/summary?report_id=${report_id}`)
    setSummaryData(response.data.summaryList)
    console.log('response', response)
    console.log('summaryData', summaryData)
  }
  useEffect(() => {
    fetchData()
  }, [])

  /* ********************반원 그래프******************** */

  // const data1 = [
  //   {
  //     id: "Risky Permission",
  //     label: "Risky",
  //     value: summaryData.permissionHalfGraph.riskyCount,
  //     color: "hsl(143, 70%, 50%)",
  //   },
  //   {
  //     id: "Normal Permission",
  //     label: "Normal",
  //     value: summaryData.permissionHalfGraph.normalCount,
  //     color: "#FFFFFF",
  //   },
  // ];

  // const data2 = [
  //   {
  //     id: "Risky Config",
  //     label: "Risky",
  //     value: summaryData.configHalfGraph.riskyCount,
  //     color: "# FF0000",
  //   },
  //   {
  //     id: "Normal Config",
  //     label: "Normal",
  //     value: summaryData.configHalfGraph.normalCount,
  //     color: "#FFFFFF",
  //   },
  // ];

  const colors = {
    'Risky IAM Resources': '   #b7d6da',
    'Normal IAM Resources': '   #C3B8B5',
    'Risky Config Criteria': '   #b7d6da',
    'Normal Config Criteria': '   #C3B8B5',
  }
  const getColor = (pie) => colors[pie.id]

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-90}
      endAngle={90}
      activeOuterRadiusOffset={8}
      colors={getColor}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  )

  /* ********************바 그래프******************** */

  // const data_bar1 = [
  //   {
  //     id: "",
  //     ranges: [
  //       0,
  //       summaryData.permissionBarGraph.userCount,
  //       summaryData.permissionBarGraph.userCount + summaryData.permissionBarGraph.groupCount,
  //       summaryData.permissionBarGraph.userCount + summaryData.permissionBarGraph.groupCount + summaryData.permissionBarGraph.roleCount,
  //       summaryData.permissionBarGraph.userCount + summaryData.permissionBarGraph.groupCount + summaryData.permissionBarGraph.roleCount + summaryData.permissionBarGraph.policyCount,
  //     ],
  //     measures: [],
  //     markers: [],
  //   },
  // ];
  // const data_bar2 = [
  //   {
  //     id: "",
  //     ranges: [
  //       0,
  //       summaryData.configBarGraph.pwCount,
  //       summaryData.configBarGraph.pwCount + summaryData.configBarGraph.credentialCount,
  //       summaryData.configBarGraph.pwCount + summaryData.configBarGraph.credentialCount + summaryData.configBarGraph.certificateCount,
  //       summaryData.configBarGraph.pwCount + summaryData.configBarGraph.credentialCount + summaryData.configBarGraph.certificateCount + summaryData.configBarGraph.mfaCount,
  //     ],
  //     measures: [],
  //     markers: [],
  //   },
  // ];

  const MyResponsiveBullet = ({ data }) => (
    <ResponsiveBullet
      data={data}
      minValue="auto"
      margin={{ top: 0, right: 90, bottom: 50, left: 90 }}
      spacing={0}
      titleAlign="start"
      titleOffsetX={-57}
      measureBorderColor={{ from: 'color', modifiers: [] }}
      measureSize={0}
      markerSize={0}
      rangeColors="nivo"
      measureColors="nivo"
    />
  )

  const dataPer = ['user', 'group', 'role', 'policy']
  const dataConfig = ['PW', 'credential', 'certificate', 'MFA']

  const Buttons = ({ data }) => (
    <div
      style={{
        paddingLeft: '170px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%',
      }}
    >
      <span
        style={{
          color: '#E9C19F',
          fontSize: '40px',
          marginTop: '-20px',
          marginRight: '-50px',
        }}
      >
        ●
      </span>
      <span
        style={{
          color: '#999999',
          fontSize: '15px',
        }}
      >
        {data[0]}
      </span>
      <span
        style={{
          color: '#F47560',
          fontSize: '40px',
          marginTop: '-20px',
          marginRight: '-50px',
        }}
      >
        ●
      </span>
      <span
        style={{
          color: '#999999',
          fontSize: '15px',
        }}
      >
        {data[1]}
      </span>
      <span
        style={{
          color: '#F1E15B',
          fontSize: '40px',
          marginTop: '-20px',
          marginRight: '-50px',
        }}
      >
        ●
      </span>
      <span
        style={{
          color: '#999999',
          fontSize: '15px',
        }}
      >
        {data[2]}
      </span>
      <span
        style={{
          color: '#E7A838',
          fontSize: '40px',
          marginTop: '-20px',
          marginRight: '-50px',
        }}
      >
        ●
      </span>
      <span
        style={{
          color: '#999999',
          fontSize: '15px',
        }}
      >
        {data[3]}
      </span>
    </div>
  )

  /* ********************차트******************** */

  // const data_chart = [
  //   {
  //     result: "Permission: Last",
  //     "Last Scan": summaryData.recommenationChart.permissionLast,
  //     "Last ScanColor": "hsl(102, 70%, 50%)",
  //   },
  //   {
  //     result: "Permission: Current",
  //     "Current Scan": summaryData.recommenationChart.permissionCurrent,
  //     "Current ScanColor": "hsl(102, 70%, 50%)",
  //   },
  //   {
  //     result: "Config: Last",
  //     "Last Scan": summaryData.recommenationChart.configLast,
  //     "Last ScanColor": "hsl(102, 70%, 50%)",
  //   },
  //   {
  //     result: "Config: Current",
  //     "Current Scan": summaryData.recommenationChart.configCurrent,
  //     "Current ScanColor": "hsl(102, 70%, 50%)",
  //   },
  // ];

  const MyResponsiveChart = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={['Last Scan', 'Current Scan']}
      indexBy="result"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      // colors={{ scheme: "set2" }}
      colors={['#C3B8B5', '#b7d6da']}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Number of Recommendations',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )

  return (
    <SummaryWrapper>
      <Row>
        <Div2>
          <Title>Permission</Title>
          <div style={{ width: '100%', height: 'calc(100% - 100px)' }}>
            <MyResponsivePie
              data={[
                {
                  id: 'Risky IAM Resources',
                  label: 'Risky',
                  value: summaryData.permissionHalfGraph.riskyCount,
                  color: 'hsl(143, 70%, 50%)',
                },
                {
                  id: 'Normal IAM Resources',
                  label: 'Normal',
                  value: summaryData.permissionHalfGraph.normalCount,
                  color: '#FFFFFF',
                },
              ]}
            ></MyResponsivePie>
          </div>
          <div style={{ width: '100%', height: '60px' }}>
            <MyResponsiveBullet
              data={[
                {
                  id: '',
                  ranges: [
                    0,
                    summaryData.permissionBarGraph.userCount,
                    summaryData.permissionBarGraph.userCount + summaryData.permissionBarGraph.groupCount,
                    summaryData.permissionBarGraph.userCount + summaryData.permissionBarGraph.groupCount + summaryData.permissionBarGraph.roleCount,
                    summaryData.permissionBarGraph.userCount + summaryData.permissionBarGraph.groupCount + summaryData.permissionBarGraph.roleCount + summaryData.permissionBarGraph.policyCount,
                  ],
                  measures: [],
                  markers: [],
                },
              ]}
            ></MyResponsiveBullet>
            <Buttons data={dataPer}></Buttons>
          </div>
        </Div2>
        <Div1>
          <Title>Config</Title>
          <div style={{ width: '100%', height: 'calc(100% - 100px)' }}>
            <MyResponsivePie
              data={[
                {
                  id: 'Risky Config Criteria',
                  label: 'Risky',
                  value: summaryData.configHalfGraph.riskyCount,
                  color: '# FF0000',
                },
                {
                  id: 'Normal Config Criteria',
                  label: 'Normal',
                  value: summaryData.configHalfGraph.normalCount,
                  color: '#FFFFFF',
                },
              ]}
            ></MyResponsivePie>
          </div>
          <div style={{ width: '100%', height: '60px' }}>
            <MyResponsiveBullet
              data={[
                {
                  id: '',
                  ranges: [
                    0,
                    summaryData.configBarGraph.pwCount,
                    summaryData.configBarGraph.pwCount + summaryData.configBarGraph.credentialCount,
                    summaryData.configBarGraph.pwCount + summaryData.configBarGraph.credentialCount + summaryData.configBarGraph.certificateCount,
                    summaryData.configBarGraph.pwCount + summaryData.configBarGraph.credentialCount + summaryData.configBarGraph.certificateCount + summaryData.configBarGraph.mfaCount,
                  ],
                  measures: [],
                  markers: [],
                },
              ]}
            ></MyResponsiveBullet>
            <Buttons data={dataConfig}></Buttons>
          </div>
        </Div1>
      </Row>
      <Row>
        <Div3>
          <MyResponsiveChart
            data={[
              {
                result: 'Permission: Last',
                'Last Scan': summaryData.recommenationChart.permissionLast,
                'Last ScanColor': 'hsl(102, 70%, 50%)',
              },
              {
                result: 'Permission: Current',
                'Current Scan': summaryData.recommenationChart.permissionCurrent,
                'Current ScanColor': 'hsl(102, 70%, 50%)',
              },
              {
                result: 'Config: Last',
                'Last Scan': summaryData.recommenationChart.configLast,
                'Last ScanColor': 'hsl(102, 70%, 50%)',
              },
              {
                result: 'Config: Current',
                'Current Scan': summaryData.recommenationChart.configCurrent,
                'Current ScanColor': 'hsl(102, 70%, 50%)',
              },
            ]}
          ></MyResponsiveChart>
        </Div3>
        <Div4>
          <div style={{ padding: '20px' }}>
            <TableMaterial
              columns={[
                { title: 'Resource', field: 'resource' },
                { title: 'Recommendation', field: 'rec' },
                { title: 'Last Scan', field: 'last', align: 'center' },
                { title: 'Current Scan', field: 'cur', align: 'center' },
              ]}
              cdata={summaryData.scanResultTable.map((v, i) => {
                return {
                  resource: v.resourceName,
                  rec: v.recommandation,
                  last: v.lastScanResult ? (
                    <GppGoodIcon style={{ fontSize: '24px', color: 'gray', marginTop: '12px' }} />
                  ) : (
                    <WarningIcon style={{ fontSize: '24px', color: 'gray', marginTop: '12px' }} />
                  ),
                  cur: v.currentScanResult ? (
                    <GppGoodIcon style={{ fontSize: '24px', color: 'gray', marginTop: '12px' }} />
                  ) : (
                    <WarningIcon style={{ fontSize: '24px', color: 'gray', marginTop: '12px' }} />
                  ),
                }
              })}
              title="Recommendations"
              type="scanningsum"
            />
          </div>
        </Div4>
      </Row>
    </SummaryWrapper>
  )
}

export default ScanningSummary
