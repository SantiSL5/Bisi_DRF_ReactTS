import DataTable from 'react-data-table-component';
import React from "react";

const List = ({ list, deleteSlot, deleteManySlots, changeForm, updateSlot }: any) => {
    const [selectedRows, setSelectedRows]: any = React.useState(false);
    const [toggledClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const clickUpdate = ({ data }: any) => {
        updateSlot(data);
    };

    const customSort = (rows: any, selector: any, direction: any) => {
        return rows.sort((rowA: any, rowB: any) => {
            const aField = selector(rowA)
            const bField = selector(rowB)

            let comparison = 0;
            if (aField.props || bField.props) {
                if (aField.props.checked) {
                    comparison = 1;
                } else if (bField.props.checked) {
                    comparison = -1;
                }
            } else {
                if (aField > bField) {
                    comparison = 1;
                } else if (aField < bField) {
                    comparison = -1;
                }
            }

            return direction === 'desc' ? comparison * -1 : comparison;
        });
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
            name: 'Station ID',
            selector: (row: any) => row.station.id,
            sortable: true
        },
        {
            name: 'Station Name',
            selector: (row: any) => row.station.name,
            sortable: true
        },
        {
            name: 'Bike ID',
            selector: (row: any) => <span> {row.bike != null ? row.bike.id : "null"}</span>,
            sortable: true
        },
        {
            name: 'Bike Number',
            selector: (row: any) => <span> {row.bike != null ? row.bike.number : "null"}</span>,
            sortable: true
        },
        {
            name: 'Warning',
            selector: (row: any) => <input type="checkbox" checked={row.warning}
                onChange={() => clickUpdate({ data: { data: { warning: !row.warning }, id: row.id } })}
            />,
            sortable: true
        },
        {
            name: 'Disabled',
            selector: (row: any) => <input type="checkbox" checked={row.disabled}
                onChange={() => clickUpdate({ data: { data: { disabled: !row.disabled }, id: row.id } })}
            />,
            sortable: true,
        },
        {
            name: 'Operations',
            selector: (row: any) =>
                <div>
                    <button type="button" className='btn btn-info me-2' onClick={() => {
                        changeForm(row, "update")
                    }}>Update</button>
                    <button type="button" className='btn btn-danger' onClick={() => {
                        deleteSlot(row.id)
                    }}>Delete</button>
                </div>,
            sortable: true
        },
    ];

    return (
        <div>
            <button type='button' className='btn btn-danger mt-2 mb-2 ms-2' disabled={selectedRows.length === 0} onClick={() => {
                deleteManySlots(selectedRows)
            }}>Delete selected</button>
            {
                <DataTable
                    sortFunction={customSort}
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