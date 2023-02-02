import DataTable from 'react-data-table-component';
import React from "react";

const List = ({ list, deleteBike, deleteManyBikes }: any) => {
    const [selectedRows, setSelectedRows]: any = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const columns = [
        {
            name: 'ID',
            selector: (row: any) => row.id,
            sortable: true
        },
        {
            name: 'Number',
            selector: (row: any) => row.number,
            sortable: true
        },
        {
            name: 'Warning',
            selector: (row: any) => <input type="checkbox" defaultChecked={row.warning} />,
            sortable: true
        },
        {
            name: 'Disabled',
            selector: (row: any) => <input type="checkbox" defaultChecked={row.disabled} />,
            sortable: true
        },
        {
            name: 'Operations',
            selector: (row: any) =>
                <div>
                    <button type="button" className='btn btn-info me-2'>Update</button>
                    <button type="button" className='btn btn-danger' onClick={() => {
                        deleteBike(row.id)
                    }}>Delete</button>
                </div>,
            sortable: true
        },
    ];


    return (
        <div>
            <button type='button' className='btn btn-danger mt-2 mb-2 ms-2' disabled={selectedRows.length === 0} onClick={() => {
                deleteManyBikes(selectedRows)
            }}>Delete selected</button>
            {
                <DataTable
                    columns={columns}
                    data={list}
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggledClearRows}
                />
            }
        </div>
    );
}

export default List;