import React, { useEffect } from 'react'
import { useTable, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
// import ReactPaginate from "react-paginate";  
import { CgSmileNeutral } from "react-icons/cg";
import { Oval,RevolvingDot } from  'react-loader-spinner'
import { saveResultsDataFetchAPi } from '../../redux/slices/savedRecordSlice';

const SavedRecords = () => {
    const dispatch = useDispatch();
    const {
        isLoading,saveResultsData
      } = useSelector((state) => ({
        isLoading: state.savedRecordSlice.isLoading,
        saveResultsData: state.savedRecordSlice.saveResultsData,
      }));

    useEffect(() => {
        dispatch(saveResultsDataFetchAPi())
    }, [])
    useEffect(() => {
    }, [isLoading])
    

    const columns = React.useMemo(
        () => [
          {
            Header: "Heading Type",
            id: "headingType",
            accessor: function (row) {
              return (
                <div className="flex gap-30">
                  {/* <div className="bg-white rounded-5 min-w-50 flex flex-col items-center justify-center">
                    <p className="font-medium text-base text-center text-black">
                      {monthNames[new Date(row?.endDate).getMonth()]}
                    </p>
                    <p className="font-medium text-base text-center text-black">
                      {new Date(row?.endDate).getDate()}
                    </p>
                  </div>
                  <div className="rounded-full h-56 w-56 overflow-hidden relative">
                    <Image
                      src={row?.coverImage ? row?.coverImage : headerLogo}
                      layout="fill"
                      alt="test"
                    />
                  </div>
                  <div className="min-w-50 max-w-352 flex flex-col text-ellipsis overflow-hidden whitespace-nowrap">
                    <p className="font-medium text-sm text-black">
                        {row.name}
                    </p>
                    <p className="font-normal text-xs text-black">
                      {row.category?.name}
                    </p>
                    <p className="font-normal text-xs text-black">
                      {row?.startDate && row?.endDate
                        ? `${formatDateTime(row?.startDate)}` +
                          "-" +
                          `${formatDateTime(row?.endDate)}`
                        : "- -"}
                    </p>
                  </div> */}
                </div>
              );
            },
          },
          {
            Header: "Paragraph",
            id: "Paragraph",
            accessor: (row) => {
              return (
                <div className="">
                    
                </div>
              );
            },
          },
          {
            Header: "Titles",
            id: "Titles",
            accessor: (row) => {
              return (
                <div className="flex gap-15">
            
                </div>
              );
            },
          },
          {
            Header: "Tags",
            id: "Tags",
            accessor: (row) => {
              return (
                <div className="rounded-25 bg-[#70f3b533]">
                
                </div>
              );
            },
          },
          {
            Header: "Action",
            id: "Action",
            accessor: (row) => {
              return (
                <div className="flex">
                </div>
              );
            },
          },
        ],
        []
      );
    
      const {
        headerGroups,
        rows,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state: { pageIndex, pageSize },
        setPageSize,
        setGlobalFilter,
      } = useTable(
        {
          columns,
          data: saveResultsData,
        //   initialState: { pageSize: 4 },
        //   globalFilter: ourGlobalFilterFunction,
        },
        useGlobalFilter,
        usePagination
      );

  return (
    <div className="flex p-5 gap-8 rounded-xl bg-white w-full h-full group">
        <table className="border-separate border-spacing-y-2 w-full h-full  border-[1px] border-solid border-[#aab2b8] rounded-md px-4 py-2">
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr
                    className="rounded-sm shadow-lg hover:shadow-[#ab97d0] py-2"
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, i) => (
                      <th
                        className="border-b-1 border-solid text-left border-black text-black-bold  text-sm font-bold whitespace-nowrap p-2"
                        key={i}
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {isLoading ? (
                <tbody>
                  {(page.length > 0 && (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            className=""
                            key={i}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  key={i}
                                  {...cell.getCellProps()}
                                  className={`text-left my-20 border-black rounded-tl-5 rounded-bl-5 rounded-tr-5 rounded-br-5 text-black text-sm py-20 px-12 w-10 whitespace-nowrap bg-[#87dfff33]`}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  )) || (
                    <>
                      <tr>
                        <td colSpan={5}>
                          <div className="flex justify-center items-center h-[500px]">
                            <div className="flex flex-col gap-15">
                              <div className="flex justify-center items-center">
                                <CgSmileNeutral size={50} fill="black" />
                              </div>
                              <p className="font-bold text-25 text-center">
                                No records found
                              </p>
                              <p className="font-normal text-18 text-center">
                                Try changing filters or create new event
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              ) : (
                <tbody>
                  <tr className='h-full'>
                    <td colSpan={5}>
                      <div className="flex justify-center items-center h-full min-h-[500px]">
                        <Oval
                          color="#544bb9"
                          height="50"
                          width="50"
                          radius="25"
                          secondaryColor="#ab97d0"
                          strokeWidth={5}
                          strokeWidthSecondary={5}
                        />
                        {/* <RevolvingDot
                            height="100"
                            width="100"
                            radius="25"
                            color="#544bb9"
                            secondaryColor=''
                            ariaLabel="revolving-dot-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            /> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
        </table>
      </div>
  )
}

export default SavedRecords