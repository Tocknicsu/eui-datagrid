import React, { FunctionComponent, Fragment, useMemo } from 'react'
import ButtonModal from './common/ButtonModal'
import Table, { ColumnProps } from './common/Table'
import _ from 'lodash'

interface Data {
  [key: string]: string
}

const App: FunctionComponent = () => {
  const columns = [
    {
      id: 'Name',
      key: 'name',
      dataIndex: 'id',
      render: (value: string): ReturnType<FunctionComponent> => {
        return <div>{value}</div>
      },
    },
    {
      id: 'Operation',
      key: 'operation',
      render: (value: string): ReturnType<FunctionComponent> => {
        return (
          <ButtonModal>
            <Table columns={columns} data={data} />
          </ButtonModal>
        )
      },
    },
  ]
  const data = _.range(0, 100).map((num) => ({
    id: num,
  }))
  return (
    <div>
      <ButtonModal>
        <Table columns={columns} data={data} />
      </ButtonModal>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default App
