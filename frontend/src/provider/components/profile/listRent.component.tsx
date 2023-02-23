import DataTable from 'react-data-table-component';
import React from "react";

const ListRent = ({ list }: any) => {
    console.log(list);

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
            name: 'Bike',
            selector: (row: any) => row.bike.number,
            sortable: true
        },
        {
            name: 'Duration',
            selector: (row: any) => <>{row.duration} mins</>,
            sortable: true
        },
        {
            name: 'Cost',
            selector: (row: any) => <>{row.cost} €</>,
            sortable: true
        },
        {
            name: 'Finished?',
            selector: (row: any) => <>{row.active ? <>No</> : <>Yes</>}</>,
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

export default ListRent;