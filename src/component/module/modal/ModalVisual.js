import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HorizontalFlow from '../../service/visualization/HorizontalFlow'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Clear } from '@mui/icons-material'
import styled from 'styled-components'
import moment from 'moment'
import Visualization from '../../service/visualization/Visualization'
import _, { keyBy } from 'lodash'
import CircleIcon from '@mui/icons-material/Circle'
import RemoveIcon from '@mui/icons-material/Remove'

const ModalText = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 25px;
`
const TitleDiv = styled.div`
  font-size: 23px;
  font-weight: 700;
  width: 50%;
`
const TextDiv = styled.div`
  font-size: 22px;
  width: 100%;
`
const ModalVisual = ({ modalOpen, setmodalOpen, resource }) => {
  const [ModalData, setModalData] = useState({ perResult: [], confResult: [] })
  const [relation, setRelation] = useState({ group: [], policy: [], user: [] })
  const [subject, setSubject] = useState('')
  const [arn, setArn] = useState('')
  const fetchVisualModalData = async () => {
    const response = await axios.get(`/api/visualization?iamResourceArn=${resource}`)
    setModalData(response.data.detail)
    setRelation(response.data.relation)
    console.log('modal', response)
    console.log(ModalData)
    setArn(String(response.data.resourceArn))
  }
  useEffect(() => {
    fetchVisualModalData()
  }, [])
  useEffect(() => {
    if (String(ModalData.resourceArn).substring(26, 27) === 'u') {
      setSubject('user')
      console.log('subject', subject)
    } else if (String(ModalData.resourceArn).substring(26, 27) === 'g') {
      setSubject('group')
      console.log('subject', subject)
    } else {
      console.log(String(ModalData.resourceArn).substring(26, 27))
    }
  }, [ModalData])
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
  }
  const visualModalData = {
    detail: {
      cloudName: 'iamgroundCloud',
      resourceArn: 'arn:user/kim1234',
      resourceName: 'kim1234',
      orgGroup: 'Dev-junior',
      creation: '2021-12-03T02:51:39.000Z',
      lastUsedDate: '2021-12-03T02:51:39.000Z',
      mfa: true,
      accessKey1: 'AAWDAW',
      accessKey2: 'ssdfsdfsd',
      confResult: ['Root 사용'],
      perResult: ['과도한 권한 IAM USER'],
    },
    relation: {
      group: [
        {
          source: 'arn:user/kim1234',
          target: 'arn:group/group1',
          lineColor: 1,
        },
      ],
      policy: [
        {
          source: 'arn:group/group1',
          target: 'arn:policy/policy1',
          lineColor: 1,
        },
        {
          source: 'arn:group/group1',
          target: 'arn:policy/policy2',
          lineColor: 3,
        },
        {
          source: 'arn:group/group1',
          target: 'arn:policy/policy3',
          lineColor: 2,
        },
      ],
    },
  }
  const Format = () => {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
            <ModalText>
              <TitleDiv>클라우드 이름</TitleDiv>
              <TextDiv>{ModalData.cloudName}</TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv>리소스 정보</TitleDiv>
              <TextDiv>
                {ModalData.resourceName}
                <div style={{ fontSize: '18px' }}>({ModalData.resourceArn})</div>
              </TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv>권한 분리 그룹</TitleDiv>
              <TextDiv>{ModalData.orgGroup}</TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv>생성 시간</TitleDiv>
              <TextDiv> {moment(ModalData.creation).format('YYYY-MM-DD HH:mm:ss')}</TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv>마지막 사용 시간</TitleDiv>
              <TextDiv>{ModalData.lastUsedDate !== '' ? moment(ModalData.lastUsedDate).format('YYYY-MM-DD HH:mm:ss') : <span>없음</span>}</TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv>MFA</TitleDiv>
              <TextDiv>{ModalData.mfa === true ? <span>YES</span> : <span>NO</span>}</TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv>액세스 키</TitleDiv>
              <TextDiv>
                {ModalData.accessKey1 === null ? <div>Access Key1 : 없음</div> : <div>Access Key1 : {ModalData.accessKey1}</div>}
                {ModalData.accessKey2 === null ? <div>Access Key2 : 없음</div> : <div>Access Key2 : {ModalData.accessKey2}</div>}
              </TextDiv>
            </ModalText>
          </div>
          <div style={{ display: 'flex', width: '50%', flexDirection: 'column' }}>
            <ModalText style={{ paddingBottom: '30px' }}>
              <TitleDiv style={{ paddingRight: '30px' }}>올바른 구성 스캔 결과</TitleDiv>
              <TextDiv>
                {ModalData.confResult.map((v, i) => {
                  return <div>{v}</div>
                })}
              </TextDiv>
            </ModalText>
            <ModalText>
              <TitleDiv style={{ paddingRight: '30px' }}>권한 분리 스캔 결과</TitleDiv>
              <TextDiv>
                {ModalData.perResult.map((v, i) => {
                  return <div>{v}</div>
                })}
              </TextDiv>
            </ModalText>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '20px', fontWeight: '700', paddingLeft: '15px' }}>
              <CircleIcon style={{ color: '#FED658' }} />
              선택
            </span>
            <span style={{ fontSize: '20px', fontWeight: '700', paddingLeft: '15px' }}>
              <CircleIcon style={{ color: '#C098CE' }} />
              그룹
            </span>
            <span style={{ fontSize: '20px', fontWeight: '700', paddingLeft: '15px' }}>
              <CircleIcon style={{ color: '#E9B7C3' }} />
              유저
            </span>
            <span style={{ fontSize: '20px', fontWeight: '700', paddingLeft: '15px' }}>
              <CircleIcon style={{ color: '#5265B3' }} />
              정책
            </span>
          </div>
          <div>
            <span style={{ color: '#000000', fontSize: '20px', fontWeight: '700', paddingRight: '15px' }}>
              <RemoveIcon style={{ color: '#000000', fontSize: '20px' }} />
              안정
            </span>
            <span style={{ color: '#0001F7', fontSize: '20px', fontWeight: '700', paddingRight: '15px' }}>
              <RemoveIcon style={{ color: '#0001F7', fontSize: '20px' }} />
              마킹
            </span>
            <span style={{ color: '#F7003E', fontSize: '20px', fontWeight: '700', paddingRight: '15px' }}>
              <RemoveIcon style={{ color: '#F7003E', fontSize: '20px' }} />
              위험
            </span>
          </div>
        </div>
        <div style={{ width: '100%', height: '600px', paddingTop: '100px' }}>
          <HorizontalFlow resource={relation} subject={subject} resourceName={ModalData.resourceName} resourceArn={ModalData.resourceArn} />
        </div>
      </div>
    )
  }
  useEffect(() => {
    Format()
    console.log('data', ModalData)
  }, [ModalData])
  return (
    <div style={{ width: '500px' }}>
      <Modal open={modalOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ width: '5%' }}>
            <Clear
              style={{ fontSize: '26px', cursor: 'pointer', position: 'fixed', right: '50px' }}
              onClick={() => {
                setmodalOpen(false)
                ;<Visualization />
              }}
            />
          </div>
          <div>
            <Format />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalVisual
