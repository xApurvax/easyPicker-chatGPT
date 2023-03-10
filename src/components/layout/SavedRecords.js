import React, { useEffect,useState } from 'react'
import { useTable, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import ReactPaginate from "react-paginate";  
import { CgSmileNeutral } from "react-icons/cg";
import { IoSearchOutline,IoCopyOutline } from "react-icons/io5";
import { Oval } from  'react-loader-spinner'
import { saveResultsDataFetchAPi } from '../../redux/slices/savedRecordSlice';
import { toast } from 'react-hot-toast';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import {  GoHome } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import RouteMiddleWare from '../../utils/RouteMiddleWare';
import classNames from "classnames";

const SavedRecords = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const {
        isLoading,saveResultsData,totalResults
      } = useSelector((state) => ({
        isLoading: state.savedRecordSlice.isLoading,
        saveResultsData: state.savedRecordSlice.saveResultsData,
        totalResults: state.savedRecordSlice.totalResults,
      }));
      const [showInputIcon,setShowInputIcon] = useState(true)
      const [currentPageLocal, setCurrentPageLocal] = useState(1);
      const [searchByHeading, setSearchByHeading] = useState();

      const handlePageClick = (event) => {
        setCurrentPageLocal(event.selected + 1);
      };

     const handleFilter = (e) => {
        e.preventDefault()
        setSearchByHeading(e.target.value)
      }

    useEffect(() => {
        if (currentPageLocal === 1) {
          dispatch(
            saveResultsDataFetchAPi({
              search: searchByHeading,
              page: currentPageLocal,
            })
          );
        } else setCurrentPageLocal(1);
      }, [searchByHeading]);
    
      useEffect(() => {
        dispatch(
            saveResultsDataFetchAPi({
            search: searchByHeading,
            page: currentPageLocal,
          })
        );
      }, [currentPageLocal]);

    useEffect(() => {
      document.title = "Bookmarks | Tagline Generator"
    }, [])

    const columns = React.useMemo(
        () => [
          {
            Header: "Heading Type",
            id: "headingType",
            accessor: function (row,i) {
              return (
                <div key={i} className='group'>
                <div className="flex gap-30 max-w-[100px]">
                    <p className="font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-black">
                      {row?.heading_type}
                    </p>
                </div>
                </div>
              );
            },
          },
          {
            Header: "Paragraph",
            id: "Paragraph",
            accessor: (row,i) => {
              return (
                <div key={i} className=''>
                <div className="flex gap-30 w-full max-w-[300px] whitespace-pre-wrap max-h-[110px] overflow-scroll scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#ededed] group-hover:scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 p-2">
                    <p className="font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-black ">
                      {row?.paragraph}
                    </p>
                </div>
                </div>
              );
            },
          },
          {
            Header: "Titles",
            id: "Titles",
            accessor: (row,i) => {
              return (
                <div key={i} className=''>
                <div className="flex flex-col gap-1.5 ms:gap-1.5 sm:gap-1.5 md:gap-3 lg:gap-3 w-full max-w-[300px] whitespace-pre-wrap max-h-[110px] overflow-scroll scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#ededed] group-hover:scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 p-2">
                      {row?.title.length > 0 && row?.title?.split(",")?.map((title,id) => (
                        title.trim().length >0 && 
                        <div key={id} className="flex gap-2">
                             <p className="font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-black">
                                {title}
                             </p>
                                <button
                                onClick={(e) => {
                                    navigator.clipboard.writeText(title);
                                    toast.success("Title copied");
                                }}
                                type="button" 
                                className='flex h-max w-max items-start py-1'
                                >
                                <IoCopyOutline size={15} color="#544bb9" />
                            </button>
                        </div>
                      ))}
                </div>
                </div>
              );
            },
          },
          {
            Header: "Tags",
            id: "Tags",
            accessor: (row,i) => {
              return (
                <div key={i} className=''>
                <div className="flex flex-col gap-1.5 ms:gap-1.5 sm:gap-1.5 md:gap-3 lg:gap-3 w-full max-w-[300px] whitespace-pre-wrap max-h-[110px] overflow-scroll scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#ededed] group-hover:scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 p-2">
                {row?.tag.length > 0 && row?.tag?.split(",")?.map((tag,id) => (
                  tag.replace(".","") && tag.trim().length > 0 ?
                  <div key={id} className="flex gap-1 justify-between items-center">
                       <p className="font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-center text-black">
                          {tag.trim()}
                       </p>
                       <button
                        onClick={(e) => {
                            navigator.clipboard.writeText(tag);
                            toast.success("Tag copied");
                        }}
                        type="button"
                        className='flex h-max w-max items-start py-1'
                        >
                        <IoCopyOutline size={15} color="#544bb9" />
                       </button>
                  </div>
                  :
                  <p className='font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] whitespace-nowrap text-black'>No tags were generated</p>
                ))}
                </div>
                </div>
              );
            },
          },
        //   {
        //     Header: "Action",
        //     id: "Action",
        //     accessor: (row,i) => {
        //       return (
        //         <div key={i} className="flex">
        //         </div>
        //       );
        //     },
        //   },
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
          initialState: { pageSize: 3 },
        //   globalFilter: ourGlobalFilterFunction,
        },
        useGlobalFilter,
        usePagination
      );

      useEffect(() => {
      }, [saveResultsData])

  return (
    <RouteMiddleWare>
    <div className="flex flex-col p-5 gap-5 rounded-xl bg-white w-full h-full">
        {/* <div className='flex items-center justify-center'>
            <p className='font-semibold text-lg ms:text-lg sm:text-lg md:text-2xl lg:text-2xl cursor-pointer'>Saved Records</p>
        </div> */}
        <div className='flex flex-row-reverse justify-between items-center'>
        <div className='relative'>
            <input
            type='text'
            id='search'
            name='search'
            placeholder='Search by heading' 
            // onFocus={() => setShowInputIcon(true)}
            // onBlur={() => setShowInputIcon(true)}
            onChange={(e) => handleFilter(e)}
            autoComplete="off"
            className={classNames(
              "pr-2 py-2 lg:py-1.5 text-lg ms:text-sm sm:text-base md:text-lg lg:text-base border-[1px] border-solid border-[#aab2b8] ms:max-w-[155px] sm:max-w-[180px] md:max-w-[200px] rounded-md focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#544bb9]",showInputIcon ? "pl-10 pr-2 ms:pl-7 sm:pl-8 md:pl-10 lg:pl-10" : "px-6")}
            />
            {showInputIcon && <IoSearchOutline color='#544bb9'
            //  size={25} 
             className='absolute top-1/4 left-2 text-lg ms:text-base sm:text-lg md:text-xl lg:text-xl' />}
        </div>
        <div className='flex gap-1 items-center'>
            {/* <p className='text-lg ms:text-xs sm:text-lg md:text-2xl lg:text-2xl cursor-pointer whitespace-nowrap text-[#544bb9] underline'>back to home</p> */}
            <GoHome className='text-lg ms:text-xs sm:text-lg md:text-2xl lg:text-2xl cursor-pointer'  onClick={(e) => {e.preventDefault();
                    history('/');
            }}  />
            <p className='font-semibold text-lg ms:text-xs sm:text-lg md:text-2xl lg:text-lg'>/ Bookmarks</p>
            {/* <RiArrowGoBackLine className='text-lg ms:text-lg sm:text-lg md:text-2xl lg:text-2xl cursor-pointer' /> */}
        </div>
        </div>
        <div className='min-h-[440px] h-max overflow-x-auto max-w-[100vw]'>
        <table className="w-full h-full px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-2 max-h-[404px] rounded-md border border-solid border-black">
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr
                    className="shadow-lg hover:shadow-[#aab2b8] my-2 bg-[#e2eaf7]"
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, i) => (
                      <th
                        className="text-left border-b border-t first:border-l border-r border-solid border-black text-black ms:text-[10px] sm:text-[10px] md:text-sm lg:text-xs text-sm font-bold tracking-wider whitespace-nowrap p-2"
                        key={i}
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {!isLoading ? (
                <tbody>
                  {(page.length > 0 && (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            className="first:border-t border-solid border-black"
                            // rowSpan={1}
                            key={i}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  key={i}
                                  {...cell.getCellProps()}
                                  className="text-left border-b first:border-l border-r border-solid border-black text-black text-sm p-5 ms:p-1 sm:p-2 md:p-3 lg:p-3 whitespace-nowrap group"
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
                          <div className="flex justify-center items-center h-[404px]">
                            <div className="flex flex-col gap-15">
                              <div className="flex justify-center items-center">
                                <CgSmileNeutral size={50} fill="black" />
                              </div>
                              <p className="font-bold text-25 text-center">
                                No records found
                              </p>
                              {/* <p className="font-normal text-18 text-center">
                                Try changing filters or create new event
                              </p> */}
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
                      <div className="flex justify-center items-center h-full min-h-[404px]">
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
        {saveResultsData?.length > 0 && Math.ceil(totalResults/3) > 1 && (
          <div className="flex justify-center items-center gap-12">
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <button
                className="disabled:opacity-60"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <div className="disabled:bg-black-medium disabled:cursor-not-allowed min-w-[30px] ms:max-w-[20px] sm:max-w-[20px] h-35 rounded-5 flex justify-center items-center ms:text-xs sm:text-xs md:text-sm lg:text-sm">
                  <MdArrowForwardIos />
                </div>
              </button>
            }
            forcePage={currentPageLocal - 1}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(totalResults/3)}
            previousLabel={
              <button
                className="disabled:opacity-60"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <div className="disabled:bg-black-medium disabled:cursor-not-allowed min-w-[30px] h-35 rounded-5 flex justify-center items-center ms:text-xs sm:text-xs md:text-sm lg:text-sm">
                  <MdArrowBackIosNew />
                </div>
              </button>
            }
            renderOnZeroPageCount={1}
            containerClassName={"flex py-2 justify-center gap-x-[24px] ms:gap-x-[10px] sm:gap-x-[15px] md:gap-x-[20px] lg:gap-x-[24px]"}
            pageClassName={
              "flex items-center justify-center w-[36px] rounded-[6px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[36px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm"
            }
            previousClassName={
              "prev-btn flex items-center justify-center w-[36px] rounded-[6px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[36px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm"
            }
            nextClassName={
              "next-btn flex items-center justify-center w-[36px] rounded-[6px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[36px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm"
            }
            pageLinkClassName={
              "flex items-center justify-center h-full w-full"
            }
            previousLinkClassName={
              "flex items-center justify-center h-full w-full rounded-[6px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] border-1 border-solid border-[#E4E4EB] disabled:bg-gray"
            }
            nextLinkClassName={
              "flex items-center justify-center h-full w-full rounded-[6px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] border-1 border-solid border-[#E4E4EB] disabled:bg-gray"
            }
            breakClassName={
              "flex items-center justify-center w-[36px] bg-[#FFFFFF] rounded-[6px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[36px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm"
            }
            activeLinkClassName={"text-blue"}
            activeClassName={
              "bg-[#544bb9] text-white"
            }
          />
        </div>
        )}
    </div>
    </RouteMiddleWare>
  )
}

export default SavedRecords