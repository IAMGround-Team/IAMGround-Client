import React, { useEffect, useState } from 'react'
import HorizontalFlow from '../../service/visualization/HorizontalFlow'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Clear } from '@mui/icons-material'
import axios from 'axios'

const ModalGroup = ({ modalOpen, setmodalOpen }) => {
  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
    const responseAddGroup = await axios.get('/api/monitoring/log')
    setUsers(responseAddGroup.data.users)
    console.log('responseAddGroup', responseAddGroup.data.users)
    console.log('users', users)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const [newBookmark, setNewBookmark] = useState([])

  const postBookmark = (newName) => {
    for (var i = 0; i < document.getElementsByName('user').length; i++) {
      if (document.getElementsByName('user')[i].checked == true) {
        newBookmark.push(document.getElementsByName('user')[i].value)
      }
    }
    axios
      .post('/api/monitoring/log/bookmark', {
        bookmarkGroupName: newName,
        memberList: newBookmark,
      })
      .then(function (response) {
        console.log(response)
        console.log('Send Data', {
          name: newName,
          memberList: newBookmark,
        })
        setNewBookmark([])
      })
  }
  // const index = ["클라우드 이름", "리소스 이름", "권한 분리 그룹", "생성 시간", "마지막 사용 시간", "MFA", "Access Key", "올바른 구성 스캔 결과", "권한 분리 스캔 결과"];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  // const data = () => {
  //   <>
  //     <div style={{ display: "flex" }}>
  //       <div style={{ width: "50%" }}></div>
  //       <div style={{ width: "50%" }}></div>
  //     </div>

  //     <div style={{ width: "100%", height: "300px" }}>
  //       <HorizontalFlow />
  //     </div>
  //   </>;
  // };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={modalOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ borderBottom: '5px solid black', paddingBottom: '10px', fontWeight: 'bolder' }}>
            Add Group
          </Typography>
          <Typography id="modal-modal-description" variant="h6" component="h2">
            <div style={{ fontSize: '20px', textAlign: 'center', padding: '10px' }}>Choose users </div>
            {users.length === 0 ? (
              <div style={{ textAlign: 'center' }}>No Users</div>
            ) : (
              users.map((v, i) => {
                return (
                  <div>
                    <input type="checkbox" name="user" value={v.userArn}></input>
                    {v.userName}
                  </div>
                )
              })
            )}
          </Typography>
          <div style={{ alignItems: 'center', padding: '10px' }}>
            <input id="newName" type="text" placeholder="Enter New Group Name" style={{ width: '100%', textAlign: 'center', height: '30px', fontSize: '20px' }}></input>
          </div>
          <div>
            <button
              style={{ margin: 'auto', display: 'block', backgroundColor: 'black', color: 'white', height: '50px', width: '100px', borderRadius: '5px' }}
              onClick={() => {
                postBookmark(document.getElementById('newName').value)
              }}
            >
              Add Group
            </button>
          </div>
          <Clear
            style={{ fontSize: '26px', cursor: 'pointer' }}
            onClick={() => {
              setmodalOpen(false)
            }}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default ModalGroup
