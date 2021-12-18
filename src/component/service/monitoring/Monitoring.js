import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch'
import { Div } from '../style/styled-compo'
import TableMaterial from '../../module/TableMaterial'
import axios from 'axios'
import moment from 'moment'

function Monitoring() {
  const [logs, setLogs] = useState([])
  const [filteredLog, setFilteredLog] = useState([])
  const [checked, setChecked] = useState(true)
  const fetchLogs = async () => {
    const response = await axios.get('/api/monitoring/iam')
    setLogs(response.data.iamLogs)

    console.log('response', response)
    console.log('logs', response.data.iamLogs)
    console.log('Length', logs.length)
  }
  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    setFilteredLog(
      logs
        .map((v, i) => {
          return {
            time: moment(v.creation).format('YYYY/MM/DD HH:mm:ss'),
            user: v.identityName,
            resource: JSON.parse(v.resourceName).join(', '),
            activity: v.apiName,
            result: v.result === 1 ? 'Success' : 'Fail',
            reason: v.reasonCategory === '[]' ? '' : JSON.parse(v.reasonCategory).join(', '),
            ip: v.accessIp,
            caution: v.reasonCategory === '[]' ? false : v.reasonCategory ? true : false,
            id: v,
          }
        })
        .filter((v) => {
          return checked ? v.caution : true
        })
    )
  }, [checked, logs])

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  function sortDesc(a, b) {
    const dateA = moment(a)
    const dateB = moment(b)
    return dateA.isAfter(dateB) ? 1 : 0
  }
  return (
    <>
      <h1
        style={{
          color: '#787878',
          margin: '0px 0px 10px 0px',
          fontSize: '26px',
        }}
      >
        Monitoring
      </h1>
      <Div>
        <form>
          <div style={{ float: 'right', paddingRight: '50px' }}>
            <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} color="primary" />
            <strong>위험한 변경사항만</strong>
          </div>
        </form>
        <div style={{ width: 'calc(100%-30px)', paddingTop: '33px' }}>
          <TableMaterial
            columns={[
              {
                title: 'Time',
                field: 'time',
                defaultSort: 'desc',
                // customSort: (a, b) => sortDesc(a, b),
              },
              { title: 'User', field: 'user' },
              { title: 'Resource', field: 'resource' },
              { title: 'Activity', field: 'activity' },
              { title: 'Result', field: 'result' },
              { title: 'Reason', field: 'reason' },
              { title: 'Ip', field: 'ip' },
            ]}
            cdata={filteredLog}
            title="IAM Log"
            type="monitoring"
          />
        </div>
      </Div>
    </>
  )
}

export default Monitoring
