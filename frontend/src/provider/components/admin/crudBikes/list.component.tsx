import DataTable from 'react-data-table-component';
import React from "react";

const List = ({ list, deleteBike, deleteManyBikes, changeForm, updateBike }: any) => {
    const [selectedRows, setSelectedRows]: any = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const clickUpdate = ({ data }: any) => {
        updateBike(data);
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
            selector: (row: any) => <input type="checkbox" checked={row.warning}
                onClick={() => clickUpdate({ data: { data: { warning: !row.warning }, id: row.id } })}
            />,
            sortable: true
        },
        {
            name: 'Disabled',
            selector: (row: any) => <input type="checkbox" checked={row.disabled}
                onChange={() => clickUpdate({ data: { data: { disabled: !row.disabled }, id: row.id } })}
            />,
            sortable: true
        },
        {
            name: 'Operations',
            selector: (row: any) =>
                <div>
                    <button type="button" className='btn btn-info me-2' onClick={() => {
                        changeForm(row, "update")
                    }}>Update</button>
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