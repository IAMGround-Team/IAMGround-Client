import React from 'react'
import { Circle } from '@mui/icons-material'
import styled from 'styled-components'

const Iamground = styled.h3`
  margin-left: 4px;
`

function Logo() {
  return (
    <div
      style={{
        padding: '0px 20px',
        fontWeight: 'bold',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        color: '#EDEDED',
        justifyContent: 'center',
        marginRight: '10px',
      }}
    >
      <img src="./logo.svg" alt="" />
      <Iamground>IAMGROUND</Iamground>
    </div>
  )
}

export default Logo
