import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableMaterial from '../../module/TableMaterial'
import { Div } from '../style/styled-compo'
import axios from 'axios'
import moment from 'moment'

function Cloud() {
  const [clouds, setClouds] = useState([])
  const fetchClouds = async () => {
    const responseCloud = await axios.get('/api/cloud')
    setClouds(responseCloud.data.cloudList)
    console.log('responseCloud', responseCloud)
  }
  useEffect(() => {
    fetchClouds()
  }, [])
  return (
    <>
      <h1 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '26px', height: '35px' }}>Cloud List</h1>
      <Div>
        <Link to="/cloud/register" style={{ float: 'right', paddingRight: '50px' }}>
          <button
            style={{
              height: '30px',
              width: '100px',
              backgroundColor: '#D6D6D6',
              borderColor: '#EFEFEF',
              borderRadius: '5px',
              fontSize: '20px',
            }}
          >
            Register
          </button>
        </Link>
        <div style={{ width: 'calc(100%-30px)', padding: '40px' }}>
          <TableMaterial
            columns={[
              { title: 'Cloud Name', field: 'cloudName' },
              { title: 'Cloud ID', field: 'cloudId' },
              { title: 'Last Scan', field: 'lastScanTime' },
              { title: 'Status', field: 'status' },
              {
                title: 'Access Key',
                field: 'accessKey',
                editComponent: ({ value, onChange }) => <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ border: 'none' }} />,
                render: (rowData) => <input type="text" value={rowData.accessKey} readOnly style={{ border: 'none' }} />,
              },
              {
                title: 'Secret Key',
                field: 'secretKey',
                editComponent: ({ value, onChange }) => <input type="password" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ border: 'none' }} />,
                render: (rowData) => <input type="password" value={""} readOnly style={{ border: 'none' }} />,
              },
            ]}
            cdata={
              clouds.length > 0
                ? clouds.map((v, i) => {
                    return {
                      cloudName: v.cloudName,
                      cloudId: v.cloudId,
                      lastScanTime: v.lastScan ? moment(v.lastScan).format('YYYY/MM/DD HH:mm:ss') : 'No Report',
                      status: v.status === 1 ? '비활성화' : v.status === 2 ? '활성화' : v.status === 3 ? '스캔중' : '',
                      accessKey: v.accessKey,
                      secretKey: "",
                    }
                  })
                : []
            }
            title="Clouds"
            type="cloud"
          />
        </div>
      </Div>
    </>
  )
}

export default Cloud
