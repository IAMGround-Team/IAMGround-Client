import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Div, SideSpan } from '../style/styled-compo'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import GroupsIcon from '@mui/icons-material/Groups'
import ModalGroup from '../../module/modal/ModalGroup'
import axios from 'axios'

const MonitoringUser = () => {
  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
    const response = await axios.get('/api/monitoring/log')
    setUsers(response.data.users)
    console.log('response', response.data.users)
    console.log('users', users)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const [bookmarks, setBookmarks] = useState([])
  const fetchBookmarks = async () => {
    const response = await axios.get('/api/monitoring/log/bookmark')
    setBookmarks(response.data.bookmarkList)
    console.log('response', response.data.bookmarkList)
    console.log('bookmarks', bookmarks)
  }
  useEffect(() => {
    fetchBookmarks()
  }, [])

  const [modalOpen, setmodalOpen] = useState(false)

  const openModal = () => {
    setmodalOpen(true)
  }

  const CountLogs = (list) => {
    let count = 0
    for (var i = 0; i < list.length; i++) {
      count = count + Number(list[i].warningEventCount)
    }
    return count
  }

  return (
    <>
      <h1 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '26px', height: '35px' }}>Monitoring</h1>
      <Div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#787878', margin: '10px 0px' }}>Groups</div>
        <div style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center', justifyContent: 'space-evenly', padding: '10px' }}>
          <Link to={`/monitoring/user/log?bookmark_id=-1`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'black', fontWeight: '600' }}>
            <button style={{ border: 'none' }}>
              <div
                style={{
                  color: 'white',
                  border: '2px solid red',
                  borderRadius: '20px',
                  width: '30px',
                  height: '30px',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  backgroundColor: 'red',
                  position: 'relative',
                  top: '0px',
                  left: '160px',
                }}
              >
                {CountLogs(users)}
              </div>
              <GroupsIcon style={{ marginTop: '-11px', fontSize: '150px', color: '#3B434D' }} />
            </button>
            <div style={{ marginTop: '-30px' }}>All</div>
          </Link>

          {/* **************************Groups************************** */}
          {bookmarks.map((group, index) => (
            <SideSpan key={group.bookmarkName}>
              <Link
                to={`/monitoring/user/log?bookmark_id=${group.bookmarkId}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'black', fontWeight: '600' }}
              >
                <div
                  style={{
                    color: 'white',
                    border: '2px solid red',
                    borderRadius: '20px',
                    width: '30px',
                    height: '30px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    backgroundColor: 'red',
                    position: 'relative',
                    top: '22x',
                    left: '60px',
                  }}
                >
                  {CountLogs(users.filter((user) => group.members.includes(user.userArn)))}
                </div>
                <PeopleAltIcon style={{ fontSize: '120px', color: '#3B434D' }} />
                <div style={{ marginTop: '-10px' }}>{group.bookmarkName}</div>
              </Link>
            </SideSpan>
          ))}
          <div style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'black', fontWeight: '600' }}>
            <button style={{ border: 'none' }} onClick={openModal}>
              <GroupAddIcon style={{ marginTop: '20px', fontSize: '150px', color: '#3B434D' }} />
            </button>
            <div style={{ marginTop: '-30px' }}>Add Group</div>
          </div>
        </div>

        <div style={{ height: '2px', margin: '15px 0px', backgroundColor: '#3B434D' }} />

        {/* **************************Power Users************************** */}
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#787878', margin: '10px 0px' }}>Power Users</div>
          <div style={{ flexWrap: 'wrap', display: 'flex', alignItems: 'center', padding: '40px', justifyContent: 'space-evenly' }}>
            {users
              .filter((user) => user.warningStatusInfo !== 0)
              .map((poweruser, index) => (
                <SideSpan key={poweruser.userName}>
                  <Link
                    to={`/monitoring/user/log?iam_user_arn=${poweruser.userArn}`}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'black', fontWeight: '600' }}
                  >
                    {poweruser.warningEventCount > 0 ? (
                      <div
                        style={{
                          color: 'white',
                          border: '2px solid red',
                          borderRadius: '20px',
                          width: '30px',
                          height: '30px',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          backgroundColor: 'red',
                          position: 'relative',
                          top: '20px',
                          left: '60px',
                        }}
                      >
                        {poweruser.warningEventCount}
                      </div>
                    ) : (
                      <></>
                    )}
                    <AccountCircleIcon style={{ fontSize: '120px', color: '#F32668' }} />
                    <div style={{ marginTop: '-10px', width: '220px', textAlign: 'center', height: '20px', lineHeight: '20px', wordBreak: 'break-all', paddingLeft: '10px', paddingRight: '10px' }}>
                      {poweruser.userName}
                    </div>
                  </Link>
                </SideSpan>
              ))}
          </div>
        </div>
        {/* **************************Users************************** */}
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#787878', margin: '10px 0px' }}>Users</div>
          <div style={{ flexWrap: 'wrap', display: 'flex', alignItems: 'center', padding: '40px', justifyContent: 'space-evenly' }}>
            {users
              .filter((user) => user.warningStatusInfo === 0)
              .map((user, index) => (
                <SideSpan key={user.userName}>
                  <Link
                    to={`/monitoring/user/log?iam_user_arn=${user.userArn}`}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'black', fontWeight: '600' }}
                  >
                    {user.warningEventCount > 0 ? (
                      <div
                        style={{
                          color: 'white',
                          border: '2px solid red',
                          borderRadius: '20px',
                          width: '30px',
                          height: '30px',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          backgroundColor: 'red',
                          position: 'relative',
                          top: '20px',
                          left: '60px',
                        }}
                      >
                        {user.warningEventCount}
                      </div>
                    ) : (
                      <></>
                    )}
                    <AccountCircleIcon style={{ fontSize: '120px', color: '#3B434D' }} />
                    <div style={{ marginTop: '-10px', width: '220px', textAlign: 'center', height: '20px', lineHeight: '20px', wordBreak: 'break-all', paddingLeft: '10px', paddingRight: '10px' }}>
                      {user.userName}
                    </div>
                  </Link>
                </SideSpan>
              ))}
          </div>
        </div>
      </Div>
      {modalOpen && <ModalGroup type="addgroup" modalOpen={modalOpen} setmodalOpen={setmodalOpen} />}
    </>
  )
}

export default MonitoringUser

// Link to=`/monitoring/user/log?userName=${user.userName}`
