import React, { useContext, useEffect } from 'react';
import { useTable, usePagination, useFilters } from 'react-table'
import  NavigationTab from '../Navigation/NavigTab.js';
import { GlobalContext } from '../context/GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Table() {
  const { accounts, getAccounts } = useContext(GlobalContext);

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    
    // Demo : Table function
  const columns = React.useMemo(
      () => [
      {
          Header: 'User Info',
          columns: [
          {
              Header: 'Name',
              accessor: 'username',

          },
          {
              Header: 'Age',
              accessor: 'age',

          },
          {
              Header: 'Email',
              accessor: 'email',

          },
          ],
      },
      {
          Header: 'Health Info',
          columns: [
          {
              Header: 'Covid Vaccination',
              accessor: 'covid',
          },
          {
              Header: 'Other',
              accessor: 'other',
          },
          ],
      },
      ],
      []
  );
  
  const data = accounts;

    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = React.useMemo(
      () => ({
        Filter:TextFilter,
      }),
      []
    )
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
    },
    useFilters,
    usePagination, 
  )


  // Render the UI for your table
  return (

    <>
      <NavigationTab admin="true"/>

      {/* Spacing */}
      <div><br/><br/></div>

      <pre>
        {/* <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code> */}
      </pre>
      <table {...getTableProps()} className="table table-striped table-bordered">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                <div>{column.canFilter ? column.render('Filter'):null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>


      {/* Spacing */}
      <div><br/><br/><br/><br/><br/><br/><br/></div>
      {/* Spacing */}
      <div><br/><br/><br/><br/><br/><br/><br/></div>
      {/* Spacing */}
      <div><br/><br/><br/><br/><br/><br/><br/></div>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  
}

function TextFilter({
  column: { filterValue, preFilteredRows, setFilter },
 }) {
  const count = preFilteredRows.length
 
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
 }