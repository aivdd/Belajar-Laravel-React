import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function DataTable({ columns, rows, rowHeight }) {
    const getRowHeight = (params) => {
        return rowHeight
    }
    const baseUrl = 'public/storage/'
    const dataColumns = columns.map((column) => {
        if (column.field === 'cover' && column.type === 'string') {
            return {
                ...column,
                renderCell: (params) => (
                    <img
                        src={'/storage/' + params.value}
                        alt={`Image ${params.row.judul}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            padding: '32px',
                        }}
                    />
                ),
                autoWidth: true,
            }
        }
        return { ...column, autoWidth: true }
    })

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={dataColumns}
                pageSizeOptions={[1, 5, 10]}
                checkboxSelection={false}
                getRowId={(row) => row.id}
                getRowHeight={getRowHeight}
                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
            />
        </div>
    )
}
