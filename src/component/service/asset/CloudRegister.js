import React from 'react'
import { Div } from '../style/styled-compo'
import { Link } from 'react-router-dom'
import Register from './Register.png'
import axios from 'axios'

function CloudRegister() {
  const PostCloud = (cloudName, accessKey, secretKey, cloudId) => {
    axios
      .post('/api/cloud', {
        cloudName: cloudName,
        accessKey: accessKey,
        secretKey: secretKey,
        cloudId: cloudId,
        userId: 'mk',
      })
      .then(function (response) {
        console.log(response)
        console.log('SendData', {
          cloudName: cloudName,
          accessKey: accessKey,
          secretKey: secretKey,
          cloudId: cloudId,
          userId: 'mk',
        })
      })
  }

  return (
    <>
      <h1 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '26px', height: '35px' }}>Cloud Register</h1>
      <Div>
        <div style={{ paddingLeft: '20px', width: '30%', float: 'left' }}>
          <img src={Register} width="550px" height="726px" />
        </div>
        <div style={{ right: '0', width: '60%', float: 'right', paddingTop: '80px' }}>
          <div style={{ padding: '30px' }}>
            <h2 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '20px', height: '35px' }}>Cloud Name</h2>
            <input id="cloudName" type="text" name="name" placeholder="Enter Cloud Name..." size="30"></input>
          </div>
          <div style={{ padding: '30px' }}>
            <h2 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '20px', height: '35px' }}>Access Key</h2>
            <input id="accessKey" type="text" name="access key" placeholder="Enter Access Key..." size="30"></input>
          </div>
          <div style={{ padding: '30px' }}>
            <h2 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '20px', height: '35px' }}>Secret Key</h2>
            <input id="secretKey" type="password" name="secret key" placeholder="Enter Secret Key..." size="30"></input>
          </div>
          <div style={{ padding: '30px' }}>
            <h2 style={{ color: '#787878', margin: '0px 0px 10px 0px', fontSize: '20px', height: '35px' }}>Cloud ID</h2>
            <input id="cloudId" type="text" name="cloud ID" placeholder="Enter cloud ID..." size="30"></input>
          </div>
          <div style={{ float: 'right', paddingRight: '100px' }}>
            <Link to="/cloud">
              <button
                style={{
                  height: '50px',
                  width: '150px',
                  fontSize: '21px',
                  backgroundColor: '#D6D6D6',
                  borderColor: '#EFEFEF',
                  borderRadius: '5px',
                }}
                onClick={() => {
                  PostCloud(
                    document.getElementById('cloudName').value,
                    document.getElementById('accessKey').value,
                    document.getElementById('secretKey').value,
                    document.getElementById('cloudId').value
                  )
                }}
              >
                Start &gt;
              </button>
            </Link>
          </div>
        </div>
      </Div>
    </>
  )
}

export default CloudRegister
