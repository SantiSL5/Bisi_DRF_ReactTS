import DataTable from 'react-data-table-component';
import React from "react";

const ListIncidences = ({ list }: any) => {

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
            selector: (row: any) => <>{<span>{row.user}</span>}</>,
            sortable: true
        },
        {
            name: 'State',
            selector: (row: any) => row.state,
            sortable: true
        },
    ];

    return (
        <div>
            {
                <DataTable
                    sortFunction={customSort}
                    columns={columns}
                    data={list}
                    pagination
                />
            }
        </div>
    );
}

export default ListIncidences;