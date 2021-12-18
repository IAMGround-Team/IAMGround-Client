import React, { useEffect, useState } from 'react'
import TableMaterial from '../../module/TableMaterial'
import axios from 'axios'
import ModalPer from '../../module/modal/ModalPer'

function ScanningPer({ report_id }) {
  const [modalOpen, setmodalOpen] = useState(false)
  const [id, setId] = useState([])
  const openModal = (scanInfoId) => {
    setId(scanInfoId)
    setmodalOpen(true)
  }
  const [tableData, setTableData] = useState([])
  const fetchData = async () => {
    const response = await axios.get(`/api/scan/report/permission?report_id=${report_id}`)
    setTableData(response.data.permissionList)
    console.log('PerResponse', response)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const idArray = tableData.map((v, i) => {
    return v.infoId
  })
  const patchMarking = (infoId, marking) => {
    axios
      .patch('/api/scan/report', {
        infoId: infoId,
        mark: marking,
      })
      .then(function (response) {
        console.log(response)
        console.log('Send Data', {
          infoId: infoId,
          mark: marking,
        })
      })
  }
  return (
    <>
      <div style={{ paddingTop: '50px' }}>
        <TableMaterial
          columns={[
            { title: 'Resource', field: 'resource' },
            { title: 'arn', field: 'arn' },
            { title: 'Reason', field: 'reason' },
            { title: 'Recommendation', field: 'recommendation', align: 'center' },
            { title: 'Marking', field: 'marking', align: 'center' },
          ]}
          cdata={tableData
            .sort((x, y) => x.mark - y.mark)
            .map((v, i) => {
              return {
                resource: v.resourceName,
                arn: v.resourceArn,
                reason: v.reasonCategory,
                recommendation: <button onClick={() => openModal(v)}>자세히 보기</button>,
                marking: v.mark ? (
                  <input type="checkbox" defaultChecked="true" onClick={() => patchMarking(v.scanInfoId, false)} />
                ) : (
                  <input type="checkbox" onClick={() => patchMarking(v.scanInfoId, true)} />
                ),
                id: v,
              }
            })}
          title="Permissions"
          type="scanningper"
        />
      </div>
      {modalOpen && <ModalPer modalOpen={modalOpen} setmodalOpen={setmodalOpen} Id={id} />}
    </>
  )
}

export default ScanningPer
