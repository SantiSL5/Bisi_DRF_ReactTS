import DataTable from 'react-data-table-component';
import React from "react";

const List = ({ list, deleteNotification, deleteManyNotifications, changeForm, updateNotification }: any) => {
    const [selectedRows, setSelectedRows]: any = React.useState(false);
    const [toggledClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }: any) => {
        setSelectedRows(selectedRows);
    };

    const clickUpdate = ({ data }: any) => {
        updateNotification(data);
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
            name: 'User',
            selector: (row: any) => <>{row.user == null ? <span>Admin</span> : <span>{row.user}</span>}</>,
            sortable: true
        },
        {
            name: 'Active',
            selector: (row: any) => <input type="checkbox" checked={row.active}
                onChange={() => clickUpdate({ data: { data: { active: !row.active }, id: row.id } })}
            />,
            sortable: true
        },
        {
            name: 'Operations',
            selector: (row: any) =>
                <div>
                    <button type="button" className='btn btn-danger' onClick={() => {
                        deleteNotification(row.id)
                    }}>Delete</button>
                </div>,
            sortable: true
        },
    ];

    return (
        <div>
            <button type='button' className='btn btn-danger mt-2 mb-2 ms-2' disabled={selectedRows.length === 0} onClick={() => {
                deleteManyNotifications(selectedRows)
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