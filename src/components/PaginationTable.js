import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS /*, GROUPED_COLUMNS*/ } from './columns';
import './table.css';

const PaginationTable = () => {
    // const columns = useMemo(() => GROUPED_COLUMNS, []);
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        usePagination
    );

    const { pageIndex } = state;

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>
                    Page&nbsp;
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                    &nbsp;
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        min={1}
                        max={pageCount}
                        defaultValue={pageIndex + 1}
                        onChange={(event) => {
                            const pageNumber = event.target.value
                                ? Number(event.target.value) - 1
                                : 0;
                            gotoPage(pageNumber);
                        }}
                        style={{ width: '50px' }}
                    />
                </span>
                &nbsp;
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                &nbsp;
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>{' '}
                &nbsp;
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                &nbsp;
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>
            </div>
        </>
    );
};

export default PaginationTable;
