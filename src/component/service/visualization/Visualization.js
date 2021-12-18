import React, { useEffect, useState } from 'react'
import { Div } from '../style/styled-compo'
import ReactFlow from 'react-flow-renderer'
import { VisGroup, VisUser, VisKey, VisRoot } from '../style/Icons'
import Switch from '@mui/material/Switch'
import ModalVisual from '../../module/modal/ModalVisual'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import CircleIcon from '@mui/icons-material/Circle'
import styled from 'styled-components'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import _, { keyBy } from 'lodash'
import axios from 'axios'

const VisualizationNav = styled.nav`
  height: 30%;
  width: 250px;
  float: right;
  position: absoulute;
`
function ElementHover({ icon, element }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <Typography component={'span'} aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <div style={{ fontSize: '5px' }}>
          {icon}
          {element.source}
        </div>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 6, width: '450px' }} component={'div'}>
          <div>
            <div style={{ fontSize: '20px' }}>user: {element.source}</div>
            <div style={{ fontSize: '20px' }}>name: {element.name}</div>
            <div style={{ fontSize: '20px' }}>access key: {element.target}</div>
            <div style={{ fontSize: '20px' }}>email: {element.email}</div>
            <div style={{ fontSize: '20px' }}>phone number: {element.phone}</div>
            <div style={{ fontSize: '20px' }}>
              scanning result:{element.warningStatusInfo === '0001' && <span>잘못된 구성</span>}
              {element.warningStatusInfo === '0010' && <span>권한 분리 추천</span>}
              {element.warningStatusInfo === '0011' && <span>잘못된 구성 & 권한 분리 추천</span>}
              {element.warningStatusInfo === '0000' && <span>해당 없음</span>}
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  )
}

const Visualization = () => {
  // const [visualData, setVisualData] = useState({ user: [], awsGroup: [], orgGroup: [], root: [], cloudName: "" });
  const [visualData, setVisualData] = useState([{ user: [], awsGroup: [], orgGroup: [], root: [], cloudName: '' }])
  const [elementRoot, setelementRoot] = useState([])
  const [elementOrg, setelementOrg] = useState([])
  const [elementAws, setelementAws] = useState([])
  const [elementNoAWSGroup, setelementNoAWSGroup] = useState([])
  const [elementNoOrgGroup, setelementNoOrgGroup] = useState([])
  const [elementUser, setelementUser] = useState([])
  const [elementKey, setelementKey] = useState([])
  const [rootToGroup, setRootToGroup] = useState([])
  const [rootToNoAWSGroup, setRootToNoAWSGroup] = useState([])
  const [rootToNoOrgGroup, setRootToNoOrgGroup] = useState([])
  const [noAWSGrouptoUser, setNoAWSGroupToUser] = useState([])
  const [noOrgGrouptoUser, setNoOrgGroupToUser] = useState([])
  const [awsToUser, setAwsToUser] = useState([])
  const [orgToUser, setOrgToUser] = useState([])
  const [userToKey, setUserToKey] = useState([])
  const [elements, setElements] = useState([])
  const [uniqueElements, setUniqueElements] = useState([])
  const [targetGroup, setTargetGroup] = useState([])
  const [yesGroup, setYesGroup] = useState([])
  const [noGroup, setNoGroup] = useState([])
  const [targetOrgGroup, setTargetOrgGroup] = useState([])
  const [noOrgGroup, setNoOrgGroup] = useState([])
  const [userElement, setUserElement] = useState([])
  const [modalOpen, setmodalOpen] = useState(false)

  const [tab, setTab] = useState(0)
  const handleTabClick = (event, tabNumber) => {
    setElements([])
    setTab(tabNumber)
    setNoGroup([])
    setyesgroup1([])
    setYesGroup([])
    setUserElement([])
    setNoOrgGroup([])
    setelementAws([])
    setelementOrg([])
    setelementUser([])
    setelementKey([])
  }

  const [orgChecked, setOrgChecked] = useState(false)
  const orgHandleChange = (event) => {
    setOrgChecked(event.target.checked)
    setElements([])
  }
  const [scanChecked, setScanChecked] = useState(false)
  const scanHandleChange = (event) => {
    setScanChecked(event.target.checked)
    setElements([])
  }
  const [awsChecked, setAwsChecked] = useState(true)
  const awsHandleChange = (event) => {
    setAwsChecked(event.target.checked)
    setElements([])
  }
  const fetchVisualData = async () => {
    await axios.get('/api/visualization').then((res) => {
      setVisualData(res.data.infoByCloud)
    })
  }
  useEffect(() => {
    fetchVisualData()
  }, [])
  const [yesgroup1, setyesgroup1] = useState([])
  const reArrayUser = () => {
    setyesgroup1([])
    setNoGroup([])
    setNoOrgGroup([])
    setElements([])
    for (let j = 0; j < visualData[tab].user.length; j++) {
      if (targetGroup.includes(visualData[tab].user[j].sourceArn) === true) {
        setyesgroup1((prev) => [...prev, visualData[tab].user[j]])
      } else {
        setNoGroup((prev) => [...prev, visualData[tab].user[j]])
      }
    }
    for (let j = 0; j < visualData[tab].user.length; j++) {
      if (targetOrgGroup.includes(visualData[tab].user[j].sourceArn) === true) {
      } else {
        setNoOrgGroup((prev) => [...prev, visualData[tab].user[j]])
      }
    }
  }
  const reArrayUser1 = () => {
    setYesGroup([])
    for (let k = 0; k < targetGroup.length; k++) {
      for (let l = 0; l < yesgroup1.length; l++) {
        if (targetGroup[k] === yesgroup1[l].sourceArn) {
          setYesGroup((prev) => [...prev, yesgroup1[l]])
        }
      }
    }
  }
  useEffect(() => {
    reArrayUser1()
  }, [targetGroup, yesgroup1, tab])
  useEffect(() => {
    setTargetGroup(
      visualData[tab].awsGroup.map((v, i) => {
        return v.targetArn
      })
    )
    setTargetOrgGroup(
      visualData[tab].orgGroup.map((v, i) => {
        return v.targetArn
      })
    )
  }, [visualData, tab])
  useEffect(() => {
    setNoGroup([])
    setNoOrgGroup([])
    reArrayUser()
    setElements([])
  }, [targetGroup, tab])
  const makeUserElement = async () => {
    setUserElement([])
    await setUserElement((userElement) => [...userElement, ...yesGroup])
    setUserElement((userElement) => [...userElement, ...noGroup])
  }
  useEffect(() => {
    makeUserElement()
  }, [yesGroup])
  useEffect(() => {
    setelementRoot(
      visualData[tab].root.map((v, i) => {
        return {
          id: v.source,
          type: 'default',
          style: {
            background: '#e0e0e0',
            width: 70,
            fontWeight: 'bold',
            fontSize: '1.2em',
          },
          data: {
            label: (
              <div>
                <VisRoot />
                <div>{visualData[tab].cloudName}</div>
              </div>
            ),
          },
          position: { x: 700, y: 50 },
        }
      })
    )
    setelementNoAWSGroup(
      awsChecked === true
        ? [
            {
              id: 'NoAWSgroup',
              type: 'default',
              style: { border: '5px solid #91B3E1', width: 50, height: 70, fontWeight: 'bold', fontSize: '1.1em' },
              data: { label: 'No AWS Group' },
              position: { x: (1100 / (visualData[tab].root.length + 2)) * (visualData[tab].root.length + 2) + 50, y: 250 },
            },
          ]
        : []
    )
    setelementNoOrgGroup(
      orgChecked === true
        ? [
            {
              id: 'NoOrggroup',
              type: 'default',
              style: { border: '5px solid #94B693', width: 50, height: 70, fontWeight: 'bold', fontSize: '1.1em' },
              data: { label: 'No Org Group' },
              position: { x: (1100 / (visualData[tab].root.length + 2)) * (visualData[tab].root.length + 2) + 50, y: 130 },
            },
          ]
        : []
    )
    setelementAws(
      awsChecked === true
        ? visualData[tab].root.map((v, i) => {
            return {
              id: v.targetArn,
              type: 'default',
              style: { border: '5px solid #91B3E1', width: 50 },
              data: {
                label: (
                  <div>
                    <VisGroup />
                    <div style={{ fontSize: '10px', fontWeight: '600' }}>{v.target}</div>
                  </div>
                ),
              },
              position: {
                x: (1100 / (visualData[tab].root.length + 2)) * (i + 1) + 50,
                y: 250,
              },
            }
          })
        : []
    )
    setelementOrg(
      orgChecked === true
        ? visualData[tab].orgGroup.map((v, i) => {
            return {
              id: v.source,
              type: 'default',
              style: { border: '5px solid #94B693', width: 50 },
              data: {
                label: (
                  <div>
                    <VisGroup />
                    {v.source}
                  </div>
                ),
              },
              position: {
                x: (1300 / (visualData[tab].orgGroup.length + 1)) * (i + 1),
                y: 130,
              },
            }
          })
        : []
    )
    setRootToGroup(
      visualData[tab].root.map((v, i) => {
        return {
          id: v.source + 'to' + v.targetArn,
          source: v.source,
          target: v.targetArn,
          type: 'straight',
        }
      })
    )
    setRootToNoAWSGroup(
      visualData[tab].root.map((v, i) => {
        return {
          id: v.source + 'to' + 'NoAWSgroup',
          source: v.source,
          target: 'NoAWSgroup',
          type: 'straight',
        }
      })
    )
    setAwsToUser(
      visualData[tab].awsGroup.map((v, i) => {
        return {
          id: v.sourceArn + 'to' + v.targetArn,
          source: v.sourceArn,
          target: v.targetArn,
          type: 'straight',
        }
      })
    )
    setOrgToUser(
      visualData[tab].orgGroup.map((v, i) => {
        return {
          id: v.source + 'to' + v.target,
          source: v.source,
          target: v.targetArn,
          type: 'straight',
        }
      })
    )
    setUserToKey(
      visualData[tab].user.map((v, i) => {
        if (v.target !== '') {
          return {
            id: v.sourceArn + 'to' + v.target,
            source: v.sourceArn,
            target: v.target,
            type: 'straight',
          }
        } else {
          return []
        }
      })
    )
  }, [visualData, modalOpen, awsChecked, scanChecked, orgChecked, tab])
  useEffect(() => {
    setNoAWSGroupToUser(
      noGroup.map((v, i) => {
        return {
          id: 'noAWSGroupto' + v.sourceArn,
          source: 'NoAWSgroup',
          target: v.sourceArn,
          type: 'straight',
        }
      })
    )
    setNoOrgGroupToUser(
      noOrgGroup.map((v, i) => {
        return {
          id: 'noOrgGroupto' + v.sourceArn,
          source: 'NoOrggroup',
          target: v.sourceArn,
          type: 'straight',
        }
      })
    )
  }, [elementUser, modalOpen, awsChecked, scanChecked, orgChecked, tab])

  useEffect(() => {
    setelementUser(
      userElement.map((v, i) => {
        return {
          id: v.sourceArn,
          type: 'default',
          style:
            scanChecked === true
              ? v.warningStatusInfo === '0001'
                ? { border: '5px solid #644090', backgroundColor: '#AFB0C8', width: 40, height: 60 }
                : v.warningStatusInfo === '0010'
                ? { border: '5px solid #E1771A', backgroundColor: '#F4BA9E', width: 40, height: 60 }
                : v.warningStatusInfo === '0011'
                ? { border: '5px solid #F7003E', backgroundColor: '#FBDDDB', width: 40, height: 60 }
                : { border: '3px solid #3B434D', width: 40, height: 60 }
              : { border: '3px solid #3B434D', width: 40, height: 60 },
          data: {
            label: (
              <div>
                <ElementHover icon={<VisUser style={{ fontSize: '3px' }} />} element={v} />
              </div>
            ),
          },
          position: {
            x: (1300 / (visualData[tab].user.length - 1)) * i,
            y: 460,
          },
        }
      })
    )
    setelementKey(
      userElement.map((v, i) => {
        if (v.target !== '') {
          return {
            id: v.target,
            type: 'default',
            style: { width: 50 },
            data: {
              label: (
                <div>
                  <VisKey />
                  {v.target}
                </div>
              ),
            },
            position: {
              x: (1300 / (visualData[tab].user.length - 1)) * i,
              y: 650,
            },
          }
        } else return []
      })
    )
  }, [userElement, modalOpen, scanChecked, awsChecked, orgChecked])
  useEffect(() => {
    setElements((elements) => [...elements, ...rootToGroup])
  }, [rootToGroup])
  useEffect(() => {
    setElements((elements) => [...elements, ...rootToNoAWSGroup])
  }, [rootToNoAWSGroup])
  useEffect(() => {
    setElements((elements) => [...elements, ...awsToUser])
  }, [awsToUser])
  useEffect(() => {
    setElements((elements) => [...elements, ...noAWSGrouptoUser])
  }, [noAWSGrouptoUser])
  useEffect(() => {
    setElements((elements) => [...elements, ...noOrgGrouptoUser])
  }, [noOrgGrouptoUser])
  useEffect(() => {
    setElements((elements) => [...elements, ...orgToUser])
  }, [orgToUser])
  useEffect(() => {
    setElements((elements) => [...elements, ...userToKey])
  }, [userToKey])
  useEffect(() => {
    setElements((elements) => [...elements, ...elementRoot])
  }, [elementRoot])
  useEffect(() => {
    setElements((elements) => [...elements, ...elementAws])
  }, [elementAws])
  useEffect(() => {
    setElements((elements) => [...elements, ...elementOrg])
  }, [elementOrg])
  useEffect(() => {
    setElements((elements) => [...elements, ...elementUser])
  }, [elementUser, userElement])
  useEffect(() => {
    setElements((elements) => [...elements, ...elementKey])
  }, [elementKey, userElement])
  useEffect(() => {
    setelementAws((elements) => [...elements, ...elementNoAWSGroup])
  }, [elementNoAWSGroup])
  useEffect(() => {
    setelementOrg((elements) => [...elements, ...elementNoOrgGroup])
  }, [elementNoOrgGroup])

  useEffect(() => {
    setUniqueElements(_.uniqBy(elements, 'id'))
  }, [elements])

  const [resource, setResource] = useState(null)
  const openModal = () => {
    setmodalOpen(true)
  }
  const onElementClick = async (event, element) => {
    event.preventDefault()
    await setResource(element.id)
    if (String(element.id).substr(0, 3) !== 'arn') {
      setmodalOpen(false)
    } else {
      setmodalOpen(true)
    }
  }

  // const Root1 = () => <ReactFlow elements={uniqueElements} onElementClick={onElementClick} />;

  // const Root2 = () => <ReactFlow elements={uniqueElements} onElementClick={onElementClick} />;

  // const Root3 = () => <ReactFlow elements={uniqueElements} onElementClick={onElementClick} />;
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }
  return (
    <>
      <h1
        style={{
          color: '#787878',
          margin: '0px 0px 10px 0px',
          fontSize: '26px',
          height: '35px',
        }}
      >
        Visualization
      </h1>
      <Div style={{ position: 'relative' }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleTabClick} aria-label="basic tabs example">
              {visualData.map((v, i) => {
                return <Tab label={v.cloudName} {...a11yProps(i)} />
              })}
            </Tabs>
          </Box>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', height: '100%' }}>
          <VisualizationNav>
            <div style={{ paddingTop: '20px' }}>
              <div>
                <Switch checked={awsChecked} onChange={awsHandleChange} inputProps={{ 'aria-label': 'controlled' }} color="primary" />
                <strong style={{ fontSize: '20px' }}>AWS 그룹</strong>
              </div>
              <div>
                <Switch checked={orgChecked} onChange={orgHandleChange} inputProps={{ 'aria-label': 'controlled' }} color="success" />
                <strong style={{ fontSize: '20px' }}>권한 분리 그룹</strong>
              </div>
              <div>
                <Switch checked={scanChecked} onChange={scanHandleChange} inputProps={{ 'aria-label': 'controlled' }} color="error" />
                <strong style={{ fontSize: '20px' }}>스캐닝 결과 반영</strong>
              </div>
            </div>
            <div style={{ paddingLeft: '65px' }}>
              <div>
                <CircleIcon style={{ color: '#644090' }} /> <strong style={{ verticalAlign: 'super' }}>잘못된 구성</strong>
              </div>
              <div>
                <CircleIcon style={{ color: '#E1771A' }} /> <strong style={{ verticalAlign: 'super' }}>권한 분리</strong>
              </div>
              <div>
                <CircleIcon style={{ color: '#F7003E' }} /> <strong style={{ verticalAlign: 'super' }}>둘 다 해당</strong>
              </div>
            </div>
          </VisualizationNav>
          <div style={{ width: 'calc(100% - 250px)' }}>
            <ReactFlow elements={uniqueElements} onElementClick={onElementClick} />
          </div>
        </div>
      </Div>
      {modalOpen && <ModalVisual modalOpen={modalOpen} setmodalOpen={setmodalOpen} resource={resource} />}
    </>
  )
}

export default Visualization
