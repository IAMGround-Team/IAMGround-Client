import React, { useState, useEffect } from 'react'
import HorizontalFlow from '../../service/visualization/HorizontalFlow'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { BorderBottom, Clear } from '@mui/icons-material'
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'

const ModalText = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 20px;
`
const TitleDiv = styled.div`
  font-size: 24px;
  font-weight: bold;
  width: 15%;
  height: 100%;
`
const TextDiv = styled.div`
  font-size: 22px;
  width: 85%;
  height: 100%;
`
const ModalInfo = ({ modalOpen, setmodalOpen, logId }) => {
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
  }
  const [logDetail, setLogDetail] = useState(logId)
  console.log(logId)

  return (
    <div>
      <Modal open={modalOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Clear
            style={{ fontSize: '26px', cursor: 'pointer', position: 'fixed', right: '50px' }}
            onClick={() => {
              setmodalOpen(false)
            }}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: '50px', borderBottom: '5px solid black' }}>
            로그 세부 정보
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ paddingTop: '30px' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ModalText>
                  <TitleDiv>클라우드 이름</TitleDiv>
                  <TextDiv>{logDetail.cloudName}</TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>주체 정보</TitleDiv>
                  <TextDiv>
                    {logDetail.identityName}
                    <span style={{ paddingLeft: '10px' }}>({logDetail.identityArn})</span>
                    <span style={{ paddingLeft: '20px' }}>IP:</span>
                    {logDetail.accessIp}
                  </TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>리소스 정보</TitleDiv>
                  <TextDiv>
                    {JSON.parse(logDetail.resourceName).join(', ')}({logDetail.resourceArn})
                  </TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>활동 정보</TitleDiv>
                  <TextDiv>{logDetail.apiName}</TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>위험 이유</TitleDiv>
                  <TextDiv>{JSON.parse(logDetail.reasonDetail)}</TextDiv>
                </ModalText>
                <ModalText style={{ flexDirection: 'column' }}>
                  <TitleDiv>원본 이벤트</TitleDiv>
                  <TextDiv>
                    <pre style={{ fontSize: '25px', color: '#000000' }}>{JSON.stringify(logDetail.rawData, undefined, 2)}</pre>
                  </TextDiv>
                </ModalText>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalInfo
