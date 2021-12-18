import React, { useEffect, useState } from 'react'
import { Div } from '../style/styled-compo'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import XLSX from 'xlsx'
import TableMaterial from '../../module/TableMaterial'
import axios from 'axios'

function Organization() {
  const [organizationData, setOrganizationData] = useState([])
  const fetchOrganizationData = async () => {
    const response = await axios.get('/api/organization')
    setOrganizationData(response.data.organizationList)
    console.log('responseData', response)
    console.log('OrganizationData', organizationData)
  }
  useEffect(() => {
    fetchOrganizationData()
  }, [])

  const defaultColumns = [
    { title: 'Criteria', field: 'criteria' },
    { title: 'Cloud Name', field: 'cloudName' },
    { title: 'user arn', field: 'userArn' },
    { title: 'Name', field: 'name' },
    { title: 'email', field: 'email' },
    { title: 'Phone Number', field: 'phoneNumber' },
  ]
  const defaultData = [
    {
      permission_group: 'Dev',
      root_account: 'IAMGROUND',
      user_arn: 'aws:iam::284264230655:user',
      name: '김민경',
      email: '5596molly@naver.com',
      phone_number: '010-7552-5596',
    },
    {
      permission_group: 'Dev',
      root_account: 'IAMGROUND',
      user_arn: 'aws:iam::284264230655:user',
      name: '김민경',
      email: '5596molly@naver.com',
      phone_number: '010-7552-5596',
    },
    {
      permission_group: 'Dev',
      root_account: 'IAMGROUND',
      user_arn: 'aws:iam::284264230655:user',
      name: '김민경',
      email: '5596molly@naver.com',
      phone_number: '010-7552-5596',
    },
  ]

  const [visible, setVisible] = useState(false)
  const OpenList = () => {
    return setVisible(!visible)
  }
  const [colDef, setColDef] = useState(defaultColumns)
  const [data, setData] = useState([])
  const Extentions = ['xlsx', 'xls', 'csv']
  const getExtention = (file) => {
    const parts = file.name.split('.')
    const extention = parts[parts.length - 1]
    return Extentions.includes(extention)
  }
  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach((row) => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)
    })
    return rows
  }
  const importCSV = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: 'binary' })
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      const headers = fileData[0]
      const heads = headers.map((head) => ({ title: head, field: head }))
      setColDef(heads)
      fileData.splice(0, 1)
      setData(convertToJson(headers, fileData))
      convertToJson(headers, fileData).map((v, i) => {
        console.log(v)
        axios
          .post('/api/organization', {
            userArn: v.userArn,
            cloudId: v.cloudId,
            criteria: v.permissionGroup,
            employeeName: v.employeeName,
            email: v.email,
            phoneNumber: v.phoneNumber,
          })
          .then(function (response) {
            console.log(response)
            console.log('Send Data', {
              userArn: v.userArn,
              cloudId: v.cloudId,
              criteria: v.permissionGroup,
              employeeName: v.employeeName,
              email: v.email,
              phoneNumber: v.phoneNumber,
            })
          })
      })
      window.location.reload()
    }
    if (file) {
      if (getExtention(file)) {
        reader.readAsBinaryString(file)
      } else {
        alert('Invalid file input')
      }
    }
    // else {
    //   setData([]);
    //   setColDef([]);
    // }
  }
  const csvList = () => {
    return (
      <>
        <table style={{ borderCollapse: 'collapse', border: '1px solid black', position: 'absolute', top: '99px', right: '205px', textAlign: 'center', backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#D6D6D6', border: '1px solid #A1B8D6', padding: '3px' }}>Upload CSV File</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td style={{ border: "1px solid #D6D6D6" }}>
                <a href="/organization" style={{ color: "black", textDecoration: "none" }}>
                  Download
                </a>
              </td>
            </tr> */}
            <tr>
              <td style={{ border: '1px solid #D6D6D6' }}>
                <a href="/organization" style={{ color: 'black', textDecoration: 'none' }}>
                  <input type="file" onChange={importCSV} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <h1 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '26px', height: '35px' }}>Organization</h1>
      <Div>
        <div style={{ float: 'right', paddingRight: '50px' }}>
          <button
            style={{
              height: '30px',
              width: '100px',
              backgroundColor: '#D6D6D6',
              borderColor: '#EFEFEF',
              borderRadius: '5px',
              fontSize: '10px',
            }}
            onClick={OpenList}
          >
            <FileDownloadIcon />
            <FileUploadIcon />
          </button>
        </div>
        {visible ? csvList() : ''}

        <div style={{ width: 'calc(100%-30px)', padding: '40px' }}>
          <TableMaterial
            columns={[
              { title: 'Permission Group', field: 'criteria' },
              { title: 'Cloud ID', field: 'cloudId' },
              { title: 'user arn', field: 'userArn' },
              { title: 'Employee Name', field: 'employeeName' },
              { title: 'email', field: 'email' },
              { title: 'Phone Number', field: 'phoneNumber' },
            ]}
            cdata={
              organizationData.length > 0
                ? organizationData.map((v, i) => {
                    return {
                      criteria: v.criteria,
                      cloudId: v.cloudId,
                      userArn: v.userArn,
                      employeeName: v.employeeName,
                      email: v.email,
                      phoneNumber: v.phoneNumber,
                    }
                  })
                : []
            }
            // cdata={data}
            title="Organization"
            type="organization"
          />
        </div>
      </Div>
    </>
  )
}

export default Organization
