import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Clear } from '@mui/icons-material'
import axios from 'axios'
import styled from 'styled-components'
import { clear } from 'dom-helpers'

const ModalConfig = ({ modalOpen, setmodalOpen, Id }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    overflowX: 'auto',
  }
  const ModalText = styled.div`
    display: flex;
    flex-direction: row;
    clear: both;
    flex-wrap: nowrap;
    width: 1000px;
    height: auto;
    padding-bottom: 10px;
  `
  const TitleDiv = styled.div`
    font-size: 22px;
    font-weight: bold;
    width: 200px;
  `
  const TextDiv = styled.div`
    font-size: 20px;
    width: 1000px;
    white-space: pre-wrap;
  `
  const [recommend, setRecommend] = useState(JSON.parse(Id.recommand))
  // const [infoData, setInfoData] = useState([]);
  // const fetchData = async () => {
  //   const response = await axios.get("/mock/scan/report", { params: { info_id: Id } });
  //   setInfoData(response);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={modalOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Clear
            style={{ fontSize: '26px', cursor: 'pointer', position: 'fixed', right: '50px' }}
            onClick={() => {
              setmodalOpen(false)
            }}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: '50px', borderBottom: '5px solid black' }}>
            세부 정보
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ paddingTop: '30px' }}>
            <div style={{ clear: 'both' }}>
              <div style={{ display: 'flex', flexDirection: 'column', clear: 'both' }}>
                <ModalText>
                  <TitleDiv>클라우드 이름</TitleDiv>
                  <TextDiv>{Id.cloudName}</TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>리소스정보</TitleDiv>
                  <TextDiv>
                    {Id.resourceName}
                    <span style={{ paddingLeft: '30px' }}>({Id.resourceArn})</span>
                  </TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>수정 추천 이유</TitleDiv>
                  <TextDiv>{Id.reasonCategory}</TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>설명</TitleDiv>
                  <TextDiv>{JSON.parse(Id.reasonDetail)}</TextDiv>
                </ModalText>
                {/* <ModalText>
                  <TitleDiv>현재 상태</TitleDiv>
                  <TextDiv>{Id.reasonDetail}</TextDiv>
                </ModalText> */}
                <ModalText>
                  <TitleDiv>점검 방법</TitleDiv>
                  <TextDiv>{recommend.verification_method}</TextDiv>
                </ModalText>
                <ModalText>
                  <TitleDiv>조치 방법</TitleDiv>
                  <TextDiv>{recommend.action_method}</TextDiv>
                </ModalText>
                {/* <ModalText>
                  <TitleDiv>참조</TitleDiv>
                  <TextDiv>{logDetail.reasonDetail}</TextDiv>
                </ModalText> */}
              </div>
            </div>
            {/* <pre style={{ fontWeight: "bold" }}>{JSON.stringify(Id, undefined, 2)}</pre> */}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalConfig
