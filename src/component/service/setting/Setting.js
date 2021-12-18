import React, { useEffect, useState, useMemo } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import MobileTimePicker from '@mui/lab/MobileTimePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Box from '@mui/material/Box'
import { createTheme } from '@mui/material/styles'
import axios from 'axios'

const SettingDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  padding: 20px;
`

const SettingTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  padding-top: 50px;
  padding-bottom: 30px;
  text-underline-position: under;
  border-bottom: 5px solid #3b434d;
  width: 30%;
`

const SettingForm = styled.form`
  display: flex;
  flex-direction: row;
`

const TimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
  width: 30%;
`

const customTheme = createTheme({
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: 'black',
      },
    },
    MuiPickersDay: {
      day: {
        color: 'light-gray',
        fontFamily: '"Do Hyeon", sans-serif',
        backgroundColor: 'white',
        borderRadius: '0px',
      },
      container: {
        backgroundColor: 'black',
      },
      daySelected: {
        backgroundColor: '',
        color: 'light-gray',
      },
      dayDisabled: {
        color: 'black',
      },
      current: {
        color: '',
      },
    },
  },
})

function BusinessTime() {
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('18:00')
  const fetchBusinessTimeData = async () => {
    const response = await axios.get('/api/setting')
    console.log(response)
    setStartTime(response.data.settingData.businessTimeData.startTime)
    setEndTime(response.data.settingData.businessTimeData.endTime)
    console.log('responsebusinessTimeData', response)
  }
  useEffect(() => {
    fetchBusinessTimeData()
  }, [])

  const [Time, setTime] = useState({ start: '', end: '' })
  const onTimeClick = () => {
    axios.put('/api/setting', { startTime: startTime.substring(5, 10), endTime: endTime.substring(5, 10) }).then(function (response) {
      console.log(response)
      console.log('Send Data: ', { startTime: startTime.substring(5, 10), endTime: endTime.substring(5, 10) })
    })
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
        Setting
      </h1>
      <SettingDiv>
        <SettingTitle>Setting Business Time</SettingTitle>
        <div style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimeDiv>
              <div style={{ backgroundColor: 'white' }}>
                <MobileTimePicker
                  label="start time"
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime('2021 ' + newValue.toTimeString().substr(0, 5))
                    // console.log(newValue.toTimeString().substr(0, 5));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div style={{ backgroundColor: 'white' }}>
                <MobileTimePicker
                  label="end time"
                  value={endTime}
                  onChange={(newValue) => {
                    setEndTime('2021 ' + newValue.toTimeString().substr(0, 5))
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div>
                <button onClick={onTimeClick} style={{ height: '52px', backgroundColor: '#3B434D', color: 'white', borderRadius: '5px', width: '50px' }}>
                  저장
                </button>
              </div>
            </TimeDiv>
          </LocalizationProvider>
        </div>
        <div>
          <div style={{ fontSize: '18px', color: 'white', paddingTop: '15px', paddingBottom: '15px', textAlign: 'center', width: '30%', backgroundColor: '#3B434D', borderRadius: '10px' }}>
            <span style={{ fontWeight: 'bolder', paddingRight: '15px' }}>현재 업무 시간 | </span>
            {startTime.substring(5, 10)} ~ {endTime.substring(5, 10)}
          </div>
        </div>
      </SettingDiv>
    </>
  )
}
function NotificationSetting() {
  const [expirationDateData, setExpirationDateData] = useState([])
  const [endDate, setEndDate] = useState(new Date())
  const fetchExpirationDateData = async () => {
    const response = await axios.get('/api/setting')
    setExpirationDateData(response.data.settingData.expirationDateData)
    setEndDate(response.data.settingData.expirationDateData.endDate)
    console.log('responseExpirationDateData', response)
  }
  useEffect(() => {
    fetchExpirationDateData()
  }, [])

  const [resource, setResource] = useState('')
  const onChange = (event) => {
    console.log(event)
    setResource(event.value)
  }
  const putExpiration = () => {
    axios.put('/api/notification', { resourceArn: resource, expireDate: endDate }).then(function (response) {
      console.log(response)
      console.log('Send Data: ', { resourceArn: resource, expireDate: endDate })
    })
  }
  const customStyles = {
    control: (base) => ({
      ...base,
      width: 254,
      height: 54,
      minHeight: 35,
      marginTop: 5,
      fontSize: 16,
      textAlign: 'center',
    }),
  }
  return (
    <SettingDiv>
      <SettingTitle>Setting Expiration Date</SettingTitle>
      <div style={{ paddingTop: '15px' }}>
        <div style={{ paddingTop: '10px', paddingBottom: '10px', justifyContent: 'space-between', width: '30%' }}>
          <SettingForm>
            <div>
              <Select
                options={expirationDateData.map((v, i) => {
                  return {
                    value: v.resourceArn,
                    label: v.name,
                  }
                })}
                isSearchable
                onChange={onChange}
                styles={customStyles}
              />
            </div>
            <div style={{ backgroundColor: 'white', margin: '5px', height: 'fit-content', width: '40%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue)
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <button onClick={() => putExpiration()} style={{ height: '52px', width: '50px', backgroundColor: '#3B434D', color: 'white', borderRadius: '5px', marginTop: '5px' }}>
                저장
              </button>
            </div>
          </SettingForm>
        </div>
      </div>
    </SettingDiv>
  )
}
function Setting() {
  return (
    <>
      <div>
        <BusinessTime />
      </div>
      <div>
        <NotificationSetting />
      </div>
    </>
  )
}

export default Setting
