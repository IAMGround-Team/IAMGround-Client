import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import AlertMessage from '../module/AlertMessage'
import ModalInfo from '../module/modal/ModalInfo'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts'
import axios from 'axios'
import TableMaterial from '../module/TableMaterial'

function Test() {
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

  return (
    <div>
      <TableMaterial
        columns={[
          {
            title: 'Time',
            field: 'time',
            // customSort: (a, b) => a.time - b.time,
          },
        ]}
        cdata={[{ time: '2021/12/12-03:03' }, { time: '2021/12/12-03:04' }]}
        title="IAM Log"
        type="monitoring"
      />
    </div>
  )
}

export default Test
