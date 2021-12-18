import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Clear } from '@mui/icons-material'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const ModalPer = ({ modalOpen, setmodalOpen, Id }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1500,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
  }
  const Nav = styled.nav`
    top: 100px;
    height: 100%;
    width: 15%;
    background-color: #efefef;
    overflow: auto;
  `

  const NavListWrapper = styled.ul`
    padding: 0px 0px;
    margin: 0px;
    overflow: hidden;
  `
  const NavList = styled.span`
    display: flex;
    align-item: center;
    font-size: 25px;
    color: #fbdddd;
    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
    &:visited {
      text-decoration: none;
      color: #ffffff;
    }
  `
  const PolicyRecommend = styled.div`
    width: 50%;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    border-bottom: 3px solid black;
  `
  const Top = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 40px;
    height: 15%;
    width: 100%;
  `
  const TopTitle = styled.div`
    font-size: 20px;
    padding-left: 20%;
    width: 10%;
    font-weight: 700;
  `
  const TopDetail = styled.div`
    font-size: 18px;
    font-weight: 500;
    width: 70%;
  `
  const FootDiv = styled.footer`
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
  `
  const FootButton = styled.button`
    width: 8%;
    height: 70%;
    font-size: 25px;
  `
  const [recommend, setRecommend] = useState(JSON.parse(Id.recommand))
  const index = Id.reasonCategory.substring(0, 3)

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const MainText = () => {
    if (index === '과도한' || index === '조직도') {
      const policyName = Object.keys(recommend)
      return (
        <>
          {recommend[policyName[value]].hasOwnProperty('action_method') ? (
            recommend[policyName[value]].action_method.map((v, i) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '15px', border: '1px solid black' }}>
                  <div style={{ fontSize: '25px', paddingBottom: '80px' }}>{recommend[policyName[value]].relation}</div>
                  <div>
                    <a target="_blank" href={v.url}>
                      <div style={{ fontSize: '20px' }}>삭제 방법 보기</div>
                    </a>
                  </div>
                </div>
              )
            })
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#D6D6D6' }}>
                <PolicyRecommend style={{ borderRight: '3px solid black' }}>{policyName[value]}</PolicyRecommend>
                <PolicyRecommend>추천</PolicyRecommend>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', border: '2px solid black', borderCollapse: 'collpase' }}>
                <div style={{ width: '50%', borderCollapse: 'collapse', borderRight: '2px solid black' }}>
                  <pre style={{ fontSize: '16px' }}>{JSON.stringify(recommend[policyName[value]].origin, null, 2)}</pre>
                </div>
                <div style={{ width: '50%', borderCollapse: 'collapse', borderLeft: '2px solid blakc' }}>
                  <pre style={{ fontSize: '16px' }}>{JSON.stringify(recommend[policyName[value]].new, null, 2)}</pre>
                </div>
              </div>
            </>
          )}
        </>
      )
    } else {
      return recommend.action_method.map((v, i) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%', padding: '15px', border: '1px solid black' }}>
            <div style={{ fontSize: '30px', paddingBottom: '50px' }}>
              {v.item}
              <div>
                <span style={{ fontSize: '25px', paddingLeft: '30px' }}>Resource Name:</span> <span style={{ fontSize: '20px' }}>{Id.resourceName}</span>
              </div>
              <div>
                <span style={{ fontSize: '25px', paddingLeft: '30px' }}>Resource Arn:</span> <span style={{ fontSize: '20px' }}>{Id.resourceArn}</span>
              </div>
            </div>
            <div>
              <a target="_blank" href={v.url}>
                <div style={{ fontSize: '20px' }}>삭제 방법 보기</div>
              </a>
            </div>
          </div>
        )
      })
    }
  }
  const menu = []
  for (let i = 0; i < Object.keys(recommend).length; i++) {
    menu.push(i + 1)
  }
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    }
  }

  function ModalSidebar() {
    const [menuOpen, setMenuOpen] = useState(true)
    const onMenuClick = () => {
      setMenuOpen(!menuOpen)
    }

    return (
      <>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '60vh', flex: 1 }}>
          {menuOpen && (
            <div style={{ width: '90%' }}>
              {/* <div style={{ fontSize: "20px", height: "40px", borderBottom: "3px solid black", marginBottom: "20px", backgroundColor: "#D6D6D6", textAlign: "center" }}>목록</div> */}
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="Vertical tabs example"
                sx={{ borderColor: 'white', width: '100%' }}
              >
                {menu.map((v, i) => {
                  return <Tab label={'권고사항' + v} {...a11yProps(i)} style={{ fontSize: '20px' }} />
                })}
              </Tabs>
            </div>
          )}
          {menuOpen ? <ArrowBackIosNewIcon onClick={onMenuClick} style={{ color: '#76a8e3' }} /> : <ArrowForwardIosIcon onClick={onMenuClick} style={{ color: '#76a8e3' }} />}
        </Box>
      </>
    )
  }
  const detail = String(JSON.parse(Id.reasonDetail)).split('.')

  for (let i = 0; i < detail.length; i++) {
    if (i > 0) {
      if (detail[i][1] === ',') {
        let temp = detail[i].slice(2, detail[i].length)
        detail[i] = temp
      }
    }
  }
  return (
    <div>
      <Modal open={modalOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Top>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '95%' }}>
              <div style={{ display: 'flex' }}>
                <TopTitle>권고사항</TopTitle>
                <TopDetail>{Id.reasonCategory}</TopDetail>
              </div>
              <div style={{ display: 'flex' }}>
                <TopTitle>추천 이유</TopTitle>
                <TopDetail>{detail[value]}</TopDetail>
              </div>
              <div style={{ display: 'flex' }}>
                <TopTitle>현재 상태</TopTitle>
                <TopDetail>{Id.description}</TopDetail>
              </div>
            </div>
            <div style={{ width: '5%' }}>
              <Clear
                style={{ fontSize: '26px', cursor: 'pointer', position: 'fixed', right: '50px' }}
                onClick={() => {
                  setmodalOpen(false)
                }}
              />
            </div>
          </Top>
          <div style={{ display: 'flex', height: '70%', width: '100%', overflowY: 'auto' }}>
            <div style={{ width: '15%', height: '100%' }}>
              <ModalSidebar />
            </div>
            <div style={{ flex: 1, height: '100%', marginLeft: '50px' }}>
              <MainText />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalPer
