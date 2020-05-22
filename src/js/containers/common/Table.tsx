import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  FunctionComponent,
} from 'react'
import { EuiDataGrid, EuiDataGridCellProps } from '@elastic/eui'
import _ from 'lodash'

export interface TableContext<T extends {}> {
  data: Array<T>
  columns: Array<ColumnProps<T>>
}

const createTableContext = _.once(<T,>() =>
  React.createContext({ data: [], columns: [] } as TableContext<T>)
)

const useTableContext = <T,>(): TableContext<T> =>
  useContext(createTableContext<T>())

export interface CellProps {
  cellProps: EuiDataGridCellProps
}

const RenderCellValue: FunctionComponent<CellProps> = <T,>({
  cellProps,
}: CellProps) => {
  const props = useTableContext<T>()
  const { data, columns } = props
  const { rowIndex, colIndex } = cellProps
  const key = columns[colIndex].key
  let text
  const column = columns[colIndex]
  if (column.dataIndex) {
    text = _.get(data[rowIndex], column.dataIndex)
  }
  let result = text
  if (column.render) {
    result = column.render(text, data[rowIndex], cellProps)
  }
  return <div key={`${key}-${rowIndex}`}>{result}</div>
}

export interface ColumnProps<T> {
  id: string
  key: string
  dataIndex?: string
  initialWidth?: number
  display?: React.ReactNode
  render?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: any,
    record: T,
    cellProps: EuiDataGridCellProps
  ) => ReturnType<FunctionComponent>
}

export interface TableProps<T> {
  columns: Array<ColumnProps<T>>
  data: Array<T>
  pagination?:
    | boolean
    | {
        pageSizeOptions: number[]
        onChangeItemsPerPage: (pageSize: number) => void
        onChangePage: (pageIndex: number) => void
        pageIndex: number
        pageSize: number
      }
}

const Table = <T,>(
  props: TableProps<T>
): ReturnType<FunctionComponent<TableProps<T>>> => {
  const TableContext = createTableContext<T>()

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 })
  const onChangeItemsPerPage = useCallback(
    (pageSize) => setPagination((pagination) => ({ ...pagination, pageSize })),
    [setPagination]
  )
  const onChangePage = useCallback(
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  )

  const visibleColumns = props.columns.map(({ id }) => id)

  const columns = useMemo(
    () =>
      _.map(props.columns, (column) => ({
        isResizable: false,
        isExpandable: false,
        ...column,
      })),
    [props.columns]
  )

  const renderCellValue = useCallback(
    (cellProps) => <RenderCellValue cellProps={cellProps} />,
    []
  )

  return (
    <TableContext.Provider value={props}>
      <EuiDataGrid
        aria-labelledby=''
        toolbarVisibility={false}
        columns={columns}
        rowCount={props.data.length}
        renderCellValue={renderCellValue}
        columnVisibility={{
          visibleColumns: visibleColumns,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          setVisibleColumns: (): void => {},
        }}
        pagination={
          props.pagination === false
            ? undefined
            : {
                ...pagination,
                pageSizeOptions: [10, 20, 50],
                onChangeItemsPerPage: onChangeItemsPerPage,
                onChangePage: onChangePage,
              }
        }
      />
    </TableContext.Provider>
  )
}

export default Table
