import React, { useState, useEffect, useRef } from 'react'
import { Menu, AccountCircle, Settings, Notifications } from '@mui/icons-material'
import styled from 'styled-components'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Header = styled.header`
  width: calc(100% - 1px);
  background-color: #3b434d;
  border-left: 1px solid #5e6c70;
`

function Topbar() {
  const [notificationList, setNotificationList] = useState(['미확인 알림 없음'])
  const curNotificationList = useRef(['미확인 알림 없음'])
  const [notificationCount, setNotificationCount] = useState(0)
  const curNotificationCount = useRef(0)

  const fetchNotificationList = async () => {
    const response = await axios.get('/api/notification/message')
    setNotificationList(response.data.messageList)
    setNotificationCount(response.data.messageList.length)
    console.log('response Noti List', response)
  }

  useEffect(() => {
    fetchNotificationList()
    setInterval(async () => {
      const response = await axios.get('/api/monitoring/toast')

      if (response.data.toastList.length === 0) {
        // console.log("No Data");
      } else {
        console.log('response Toast List', response)
        const message = response.data.toastList
        message.map((v, i) => {
          ToastsStore.success(`${v.resourceName}에 ${v.reasonCategory[0]} 외 ${v.reasonCategory.length - 1}개 위험 요소를 포함한 위험 로그 발생`)
        })
        fetchNotificationList()
        // if (curNotificationCount.current === 0) {
        //   curNotificationCount.current += 1;
        //   setNotificationCount(curNotificationCount.current);
        //   message.map((v,i) => {
        //     if(i === 0){
        //       curNotificationList.current[0] = `${v.resourceName}에 ${v.reasonCategory[0]} 외 ${v.reasonCategory.length - 1}개 위험 요소를 포함한 위험 로그 발생`;
        //     }
        //     else
        //       curNotificationList.current.push(`${v.resourceName}에 ${v.reasonCategory[0]} 외 ${v.reasonCategory.length - 1}개 위험 요소를 포함한 위험 로그 발생`);
        //   })
        //   setNotificationList(curNotificationList.current);
        // }
        // else{
        //   curNotificationCount.current += 1;
        //   setNotificationCount(curNotificationCount.current);
        //   message.map((v,i) => {
        //     curNotificationList.current.push(`${v.resourceName}에 ${v.reasonCategory[0]} 외 ${v.reasonCategory.length - 1}개 위험 요소를 포함한 위험 로그 발생`);
        //   })
        //   setNotificationList(curNotificationList.current);
        // }
      }
    }, 5000)
  }, [])

  const [notificationListOpen, setNotificationListOpen] = useState(false)

  const ResetNotificationList = async () => {
    console.log('reset list')
    if (notificationListOpen) {
      for (let i = 0; i < notificationList.length; i++) {
        await axios.delete('/api/notification/message', { data: { notificationId: notificationList[i].notificationId } }).then(function (response) {
          console.log(response)
          console.log('Send Data: Delete Noti', { notificationId: notificationList[i].notificationId })
        })
      }
    }
    setNotificationListOpen(!notificationListOpen)
    fetchNotificationList()
  }

  const notiList = () => {
    return (
      <>
        <div
          style={{
            zIndex: '1000',
            border: '1px solid #3B434D',
            overflowY: 'scroll',
            height: '249px',
            width: '500px',
            position: 'absolute',
            top: '50px',
            right: '22px',
            textAlign: 'center',
            backgroundColor: 'white',
          }}
        >
          {notificationList.map((v, i) => {
            return (
              <div style={{ color: '#77788D', fontSize: '18px', padding: '5px', margin: '5px', backgroundColor: '#FBF8E3', borderRadius: '5px' }}>
                {v.resourceName}에 {JSON.parse(v.reasonCategory)[0]} 외 {JSON.parse(v.reasonCategory).length - 1}개 위험 요소를 포함한 위험 로그 발생
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <Header>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', width: '85%' }}></div>
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', width: '30px', justifyContent: 'center', cursor: 'pointer' }}>
          {/* <button style={{ width: "100px", height: "30px", color: "#d6d6d6" }} onClick={()=> {onClickToastPopup(Math.floor(Math.random() * 10))}}>Toast </button> */}
          <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore} lightBackground />
        </div>
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', width: '30px', justifyContent: 'center', cursor: 'pointer' }}>
          {/* <button style={{ width: "100px", height: "30px", color: "#d6d6d6" }} onClick={()=> {AddNotification()}}>Noti </button> */}
        </div>
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center', cursor: 'pointer' }}>
          <button style={{ backgroundColor: '#3B434D', border: '0' }} onClick={() => ResetNotificationList()}>
            {' '}
            <Notifications style={{ width: '30px', height: '30px', color: '#d6d6d6' }} />{' '}
          </button>
        </div>
        <div
          style={{
            color: 'white',
            border: '1px solid red',
            borderRadius: '20px',
            width: '15px',
            height: '15px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            backgroundColor: 'red',
            position: 'relative',
            top: '-10px',
            left: '-25px',
          }}
        >
          {notificationCount}
        </div>
        {notificationListOpen ? notiList() : ''}
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center', cursor: 'pointer' }}>
          <Settings style={{ width: '30px', height: '30px', color: '#d6d6d6' }} />
        </div>
        <div style={{ height: '50px', display: 'flex', alignItems: 'center', width: '40px', justifyContent: 'center', cursor: 'pointer' }}>
          <Link to="/login">
            <AccountCircle style={{ width: '30px', height: '30px', color: '#d6d6d6' }} />
          </Link>
        </div>
      </div>
    </Header>
  )
}

export default Topbar
