import DataTable from 'react-data-table-component';
import React from "react";

const List = ({ list, deleteIncidence, deleteManyIncidences, changeForm, updateIncidence }: any) => {
    const [selectedRows, setSelectedRows]: any = React.useState(false);
    const [toggledClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const clickUpdate = ({ data }: any) => {
        updateIncidence(data);
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
            name: 'Message',
            selector: (row: any) => row.message,
            sortable: true
        },
        {
            name: 'Slot',
            selector: (row: any) => row.slot,
            sortable: true
        },
        {
            name: 'User',
            selector: (row: any) => <>{row.user == null ? <span>Admin</span> : <span>{row.user}</span>}</>,
            sortable: true
        },
        {
            name: 'State',
            selector: (row: any) =>
                <select className="form-select" aria-label="Default select example" defaultValue={row.state} onChange={() => clickUpdate({ data: { data: { disabled: !row.disabled }, id: row.id } })}>
                    <option value="Pending" disabled={row.state === "On Process" || row.state === "Solved"}>Pending</option>
                    <option value="On Process" disabled={row.state === "Solved"}>On Process</option>
                    <option value="Solved">Solved</option>
                </select >,
            sortable: true
        },
        {
            name: 'Operations',
            selector: (row: any) =>
                <div>
                    <button type="button" className='btn btn-danger' onClick={() => {
                        deleteIncidence(row.id)
                    }}>Delete</button>
                </div>,
            sortable: true
        },
    ];

    return (
        <div>
            <button type='button' className='btn btn-danger mt-2 mb-2 ms-2' disabled={selectedRows.length === 0} onClick={() => {
                deleteManyIncidences(selectedRows)
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