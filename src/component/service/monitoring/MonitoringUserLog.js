import React, { useEffect, useState } from 'react'
import qs from 'qs'
import { Div } from '../style/styled-compo'
import { Link, useLocation } from 'react-router-dom'
import { Personbutton, Groupbutton } from '../style/Icons'
import Button from '@mui/material/Button'
import TableMaterial from '../../module/TableMaterial'
import axios from 'axios'
import moment from 'moment'

const MonitoringUserLog = () => {
  const location = useLocation()
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  })
  const decideWho = () => {
    if (query.iam_user_arn) return query.iam_user_arn
    else return query.bookmark_id
  }

  const [logs, setLogs] = useState([])
  const [identityName, setIdentityName] = useState('')
  const fetchLogs = async () => {
    const response = decideWho().substring(0, 3) === 'arn' ? await axios.get(`/api/monitoring/log?iam_user_arn=${decideWho()}`) : await axios.get(`/api/monitoring/log?bookmark_id=${decideWho()}`)
    console.log('response', response)
    setLogs(response.data.resourceLogs)
    decideWho().substring(0, 3) === 'arn' ? setIdentityName(response.data.resourceName) : setIdentityName(response.data.bookmarkName)
    console.log('response', response)
    console.log('url', `/api/monitoring/log?iam_user_arn=${decideWho()}`)
  }
  useEffect(() => {
    fetchLogs()
  }, [])

  const deleteGroup = (bookmarkId) => {
    console.log(bookmarkId)
    axios
      .delete('/api/monitoring/log/bookmark', {
        data: { bookmarkGroupId: bookmarkId },
      })
      .then(function (response) {
        console.log(response)
        console.log('Send Data', {
          bookmarkGroupId: bookmarkId,
        })
        window.location.reload()
      })
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
        Monitoring
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Personbutton />
          <div style={{ fontSize: '24px', fontWeight: 'bolder' }}>{identityName}</div>
        </div>
        <div style={{ paddingRight: '10px' }}>
          <div>
            <Link to="/visualization" style={{ textDecoration: 'none' }}>
              <Button variant="contained" style={{ backgroundColor: '#D6D6D6', color: 'black' }}>
                {identityName} 정보 보기
              </Button>
            </Link>
          </div>
          {query.bookmark_id &&
            (identityName === 'ALL' ? (
              <></>
            ) : (
              <div style={{ paddingRight: '10px', paddingTop: '5px' }}>
                <Button variant="contained" style={{ backgroundColor: '#D6D6D6', color: 'black', width: '145px' }} onClick={() => deleteGroup(query.bookmark_id)}>
                  {identityName} 삭제하기
                </Button>
              </div>
            ))}
        </div>
      </div>
      <Div>
        <div style={{ width: 'calc(100%-30px)' }}>
          <TableMaterial
            columns={[
              { title: 'Time', field: 'time', defaultSort: 'desc' },
              { title: 'User', field: 'user' },
              { title: 'Resource', field: 'resource' },
              { title: 'Activity', field: 'activity' },
              { title: 'Result', field: 'result' },
              { title: 'Reason', field: 'reason' },
              { title: 'Ip', field: 'ip' },
            ]}
            cdata={logs.map((v, i) => {
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
            })}
            title="User Log"
            type="monitoring"
          />
        </div>
      </Div>
    </>
  )
}

export default MonitoringUserLog

//location으로
