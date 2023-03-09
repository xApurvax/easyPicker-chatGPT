import React, { useEffect,useState } from 'react'
import { useTable, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import ReactPaginate from "react-paginate";  
import { CgSmileNeutral } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { Oval } from  'react-loader-spinner'
import { MdArrowBackIosNew, MdArrowForwardIos,MdDateRange } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { transactionHistoryFetchAPi } from '../../redux/slices/pointsSlice';
import { GiCoins} from 'react-icons/gi';
import { RiCoinFill } from 'react-icons/ri';
import { FaCoins } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import RouteMiddleWare from '../../utils/RouteMiddleWare';

const SavedRecords = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const {
        isLoadingTransactionHistory,allTransactionHistory,totalResults
      } = useSelector((state) => ({
        isLoadingTransactionHistory: state.pointsSlice.isLoadingTransactionHistory,
        allTransactionHistory: state.pointsSlice.allTransactionHistory,
        totalResults: state.pointsSlice.totalResults,
      }));
      const [showInputIcon,setShowInputIcon] = useState(true)
      const [currentPageLocal, setCurrentPageLocal] = useState(1);
      const [searchByHeading, setSearchByHeading] = useState();
      const [startDate, setStartDate] = useState();
      const handlePageClick = (event) => {
        setCurrentPageLocal(event.selected + 1);
      };
      const [dateOrder,setDateOrder] = useState(true);

    useEffect(() => {
        if (currentPageLocal === 1) {
          dispatch(
            transactionHistoryFetchAPi({
              date: startDate && moment(startDate).format('YYYY-MM-DD'),
              page: currentPageLocal,
              order: dateOrder ? "":"descending",
            })
          );
        } else setCurrentPageLocal(1);
      }, [startDate,dateOrder]);
    
      useEffect(() => {
        dispatch(
            transactionHistoryFetchAPi({
            date: startDate && moment(startDate).format('YYYY-MM-DD'),
            page: currentPageLocal,
            order: dateOrder ? "":"descending",
          })
        );
      }, [currentPageLocal]);


    useEffect(() => {
      document.title = "History | Tagline Generator"
    }, [])
    const columns = React.useMemo(
        () => [
          {
            Header: "Purchase Date",
            id: "purchaseDate",
            sortable: true,
            accessor: function (row,i) {
              return (
                <div key={i} className='group'>
                <div className="flex gap-30 max-w-[100px]">
                    <p className="font-medium text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-black">
                    {row?.purchased_at}
                    </p>
                </div>
                </div>
              );
            },
          },
          {
            Header: "App Coins",
            id: "appCoins",
            // sortable: true,
            accessor: (row,i) => {
              return (
                <div key={i} className='group'>
                <div className="flex gap-30 w-full max-w-[300px] whitespace-pre-wrap">
                    <p className="flex gap-2 items-center justify-center font-medium text-base ms:text-[10px] ms:leading-[10px] sm:text-[10px] sm:leading-[10px] md:text-base lg:text-base text-black ">
                      {row?.points >= 1 && row?.points < 10 && <RiCoinFill color="#FFD700" />} 
                      {row?.points >= 10 && row?.points < 100 && <FaCoins color="#FFD700" />} 
                      {row?.points >= 100 && <GiCoins color="#FFD700" />} 
                      {row?.points}
                    </p>
                </div>
                </div>
              );
            },
          },
          {
            Header: "Amount Spent",
            id: "amountSpent",
            // sortable: true,
            accessor: (row,i) => {
              return (
                <div key={i} className='group'>
                <div className="flex gap-30 w-full max-w-[300px] whitespace-pre-wrap">
                    <p className="font-medium text-base ms:text-[10px] ms:leading-[10px] sm:text-[10px] sm:leading-[10px] md:text-base lg:text-base text-black ">
                    ₹ {row?.amount}
                    </p>
                </div>
                </div>
              );
            },
          },
        //   {
        //     Header: "Tags",
        //     id: "Tags",
        //     accessor: (row,i) => {
        //       return (
        //         <div key={i} className='group'>
        //         <div className="flex flex-col gap-5 ms:gap-2 sm:gap-2 md:gap-5 lg:gap-5 w-full max-w-[300px] whitespace-pre-wrap max-h-[120px] overflow-scroll scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#ededed] group-hover:scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 p-2">
        //         {row?.tag.length > 0 && row?.tag?.split(",")?.map((tag,id) => (
        //           <div key={id} className="flex gap-1 justify-between items-center">
        //                <p className="font-medium text-base ms:text-[10px] ms:leading-[10px] sm:text-[10px] sm:leading-[10px] md:text-base lg:text-base text-center text-black">
        //                   {tag}
        //                </p>
        //                <button
        //                 onClick={(e) => {
        //                     navigator.clipboard.writeText(tag);
        //                     toast.success("Tag copied");
        //                 }}
        //                 type="button"
        //                 className='flex items-start py-1'
        //                 >
        //                 <IoCopyOutline size={15} color="#544bb9" />
        //                </button>
        //           </div>
        //         ))}
        //         </div>
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
          data: allTransactionHistory,
          initialState: { pageSize: 4 },
        //   globalFilter: ourGlobalFilterFunction,
        },
        useGlobalFilter,
        usePagination
      );
        
      useEffect(() => {
      }, [allTransactionHistory])

  return (
    <RouteMiddleWare>
    <div className="flex flex-col p-5 gap-5 rounded-xl bg-white w-full h-full group">
        {/* <div className='flex items-center justify-center'>
            <p className='font-semibold text-lg ms:text-lg sm:text-lg md:text-2xl lg:text-2xl cursor-pointer'>Transaction history</p>
        </div> */}
        <div className='flex flex-row-reverse justify-between items-center'>
        <div className='relative'>
            {/* <input
            type='text'
            id='search'
            name='search'
            placeholder='Search by heading' 
            // onFocus={() => setShowInputIcon(true)}
            // onBlur={() => setShowInputIcon(true)}
            onChange={(e) => handleFilter(e)}
            autoComplete="off"
            className={`pr-2 py-2 text-lg ms:text-sm sm:text-base md:text-lg lg:text-lg border-[1px] border-solid border-[#aab2b8] rounded-md focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#544bb9] ${showInputIcon ? "pl-10 pr-2 ms:pl-7 sm:pl-8 md:pl-10 lg:pl-10" : "px-6"}`}
            /> */}
            <DatePicker 
            autoComplete="off" 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            placeholderText="Select date"
            className={`pr-2 py-2 lg:py-1.5 text-lg ms:text-sm sm:text-base md:text-lg lg:text-base border-[1px] border-solid border-[#aab2b8] max-w-[130px] ms:max-w-[120px] sm:max-w-[150px] md:max-w-[200px] rounded-md focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#544bb9] ${showInputIcon ? "pl-10 pr-2 ms:pl-7 sm:pl-8 md:pl-10 lg:pl-10" : "px-6"}`}
             />
            {showInputIcon && <MdDateRange color='#544bb9'
            //  size={25} 
             className='absolute top-1/4 left-2 text-lg ms:text-base sm:text-lg md:text-xl lg:text-xl' />}
        </div>
        <div className='flex gap-1 items-center'>
            {/* <p className='text-lg ms:text-xs sm:text-lg md:text-2xl lg:text-2xl cursor-pointer whitespace-nowrap text-[#544bb9] underline'>back to home</p> */}
            <GoHome className='text-lg ms:text-xs sm:text-lg md:text-2xl lg:text-2xl cursor-pointer' onClick={(e) => {e.preventDefault();
                    history('/');
            }} />
            <p className='font-semibold text-lg ms:text-xs sm:text-lg md:text-2xl lg:text-lg'>/ Transactions History</p>
            {/* <RiArrowGoBackLine className='text-lg ms:text-lg sm:text-lg md:text-2xl lg:text-2xl cursor-pointer' /> */}
        </div>
        </div>
        <div className='min-h-[20vh] h-max overflow-x-auto max-w-[100vw] border-[1px] border-solid border-[#aab2b8] rounded-md'>
        <table className="border-separate border-spacing-y-2 w-full h-full px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-2 max-h-[480px] min-h-[320px]">
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr
                    className="rounded-sm shadow-lg hover:shadow-[#ab97d0] py-2 bg-[#544bb9]"
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, i) => (
                      <th
                        className="border-b-1 border-solid text-left border-black text-white ms:text-[10px] sm:text-[10px] md:text-sm lg:text-xs text-sm font-bold whitespace-nowrap p-2"
                        key={i}
                        {...column.getHeaderProps()}
                      >
                        {column.sortable ? 
                        <div className='flex gap-2 items-center cursor-pointer' onClick={() => setDateOrder(!dateOrder)}>
                        {column.render("Header")}
                        <IoIosArrowUp  className={`transform duration-200 ${dateOrder ? "rotate-0" : "rotate-180"}`}
                        />
                        </div>:
                         <div className='flex gap-2 items-center'>
                         {column.render("Header")}
                         </div>}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {!isLoadingTransactionHistory ? (
                <tbody>
                  {(page.length > 0 && (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            // className={`${row.length == 1 && "max-h-[150px]"}`}
                            // rowSpan={1}
                            key={i}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  key={i}
                                  {...cell.getCellProps()}
                                  className={`text-left border-black rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-md text-black text-sm p-5 ms:p-2 sm:p-3 md:p-5 lg:p-5 whitespace-nowrap h-full min-h-max w-max`}
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
                          <div className="flex justify-center items-center h-[320px]">
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
                      <div className="flex justify-center items-center h-full min-h-[320px]">
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
        {allTransactionHistory?.length > 0 && (
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