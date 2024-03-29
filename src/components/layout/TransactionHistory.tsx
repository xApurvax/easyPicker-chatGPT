import React, { useEffect, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { useGlobalFilter } from 'react-table/dist/react-table.development.js'
import ReactPaginate from 'react-paginate'
import { CgSmileNeutral } from 'react-icons/cg'
import { GoHome } from 'react-icons/go'
import { IoIosArrowUp } from 'react-icons/io'
import { Oval } from 'react-loader-spinner'
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdDateRange,
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import {
  AllTransactionHistory,
  transactionHistoryFetchAPi,
} from '../../redux/slices/pointsSlice'
import { GiCoins } from 'react-icons/gi'
import { RiCoinFill } from 'react-icons/ri'
import { FaCoins } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import classNames from 'classnames'
import { dateFormatter } from '../../utils/helper'
import { AppDispatch, RootState } from '../../redux/store/store'

const SavedRecords = () => {
  const dispatch = useDispatch<AppDispatch>()
  const history = useNavigate()
  const { isLoadingTransactionHistory, allTransactionHistory, totalResults } =
    useSelector((state: RootState) => ({
      isLoadingTransactionHistory:
        state.PointsSlice.isLoadingTransactionHistory,
      allTransactionHistory: state.PointsSlice.allTransactionHistory,
      totalResults: state.PointsSlice.totalResults,
    }))
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [showInputIcon, setShowInputIcon] = useState(true)
  const [currentPageLocal, setCurrentPageLocal] = useState(1)
  const [startDate, setStartDate] = useState<string>()
  const handlePageClick = (event: { selected: number }) =>
    setCurrentPageLocal(event.selected + 1)
  const [dateOrder, setDateOrder] = useState(true)

  useEffect(() => {
    dispatch(
      transactionHistoryFetchAPi({
        date: startDate && moment(startDate).format('YYYY-MM-DD'),
        page: currentPageLocal,
        order: dateOrder ? '' : 'descending',
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageLocal, startDate, dateOrder])

  useEffect(() => {
    document.title = 'History | Title Generator'
  }, [])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Purchase Date',
        id: 'purchaseDate',
        sortable: true,
        accessor: function (row: AllTransactionHistory, i: number) {
          return (
            <div key={i} className="group">
              <div className="flex gap-30 max-w-[100px]">
                <p className="font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-black">
                  {dateFormatter(row?.purchased_at)}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        Header: 'App Coins',
        id: 'appCoins',
        accessor: (row: AllTransactionHistory, i: number) => {
          return (
            <div key={i} className="group">
              <div className="flex gap-30 w-full max-w-[300px] whitespace-pre-wrap">
                <p className="flex gap-2 items-center justify-center font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-black ">
                  {row?.points >= 1 && row?.points < 10 && (
                    <RiCoinFill color="#FFD700" />
                  )}
                  {row?.points >= 10 && row?.points < 100 && (
                    <FaCoins color="#FFD700" />
                  )}
                  {row?.points >= 100 && <GiCoins color="#FFD700" />}
                  {row?.points}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        Header: 'Amount Spent',
        id: 'amountSpent',
        accessor: (row: AllTransactionHistory, i: number) => {
          return (
            <div key={i} className="group">
              <div className="flex gap-30 w-full max-w-[300px] whitespace-pre-wrap">
                <p className="font-medium text-[10px] leading-[10px] ms:text-[10px] ms:leading-[13px] sm:text-[10px] sm:leading-[16px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[21px] text-black ">
                  ₹ {row?.amount}
                </p>
              </div>
            </div>
          )
        },
      },
    ],
    []
  )

  const {
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data: allTransactionHistory,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  )

  return (
    <>
      <div className="flex flex-col p-5 gap-5 rounded-xl bg-white w-full h-full group">
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="relative">
            <DatePicker
              autoComplete="off"
              selected={startDate}
              onChange={(date: React.SetStateAction<string | undefined>) =>
                setStartDate(date)
              }
              placeholderText="Select date"
              dateFormat="dd/MM/yyyy"
              className={classNames(
                'pr-2 py-1.5 lg:py-1.5 text-sm ms:text-sm sm:text-base md:text-lg lg:text-base border-[1px] border-solid border-primaryBorder max-w-[120px] ms:max-w-[120px] sm:max-w-[150px] md:max-w-[200px] rounded-md focus:outline-none focus:border-[1px] focus:border-solid focus:border-primary',
                showInputIcon
                  ? 'pl-7 pr-2 ms:pl-7 sm:pl-8 md:pl-10 lg:pl-10'
                  : 'px-6'
              )}
            />
            {showInputIcon && (
              <MdDateRange
                color="#544bb9"
                className="absolute top-1/4 left-2 text-lg ms:text-base sm:text-lg md:text-xl lg:text-xl"
              />
            )}
          </div>
          <div className="flex gap-1 items-center">
            <GoHome
              className="text-xs ms:text-xs sm:text-lg md:text-2xl lg:text-2xl cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                history('/')
              }}
            />
            <p className="font-semibold text-xs ms:text-xs sm:text-lg md:text-2xl lg:text-lg">
              / Transactions History
            </p>
          </div>
        </div>
        <div className="h-max min-h-max ms:min-h-[149px] sm:min-h-[204px] md:min-h-[254px] lg:min-h-[265px] overflow-x-auto max-w-[100vw] border border-solid border-black rounded-md">
          <table className="w-full h-full border-collapse border-spacing-0 px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-2 max-h-[480px] border border-solid border-black rounded-md">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="shadow-lg hover:shadow-[#aab2b8] my-2 bg-[#e2eaf7]"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column: any) => (
                    <th
                      className="text-left border-b-2 border-t first:border-l border-r border-solid border-black text-black ms:text-[10px] sm:text-[10px] md:text-sm lg:text-xs text-sm font-bold tracking-wider whitespace-nowrap p-2"
                      {...column.getHeaderProps()}
                    >
                      {!!column.sortable ? (
                        <div
                          className="flex gap-2 items-center cursor-pointer"
                          onClick={() => setDateOrder(!dateOrder)}
                        >
                          {column.render('Header')}
                          <IoIosArrowUp
                            className={classNames(
                              'transform duration-200',
                              dateOrder ? 'rotate-0' : 'rotate-180'
                            )}
                          />
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          {column.render('Header')}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {!isLoadingTransactionHistory ? (
              <tbody>
                {(page.length > 0 && (
                  <>
                    {page.map((row) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="text-left border-b border-t first:border-l border-r border-solid border-black text-sm p-5 ms:p-1 sm:p-2 md:p-3 lg:p-3 whitespace-nowrap h-full min-h-max w-max"
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </>
                )) || (
                  <>
                    <tr>
                      <td colSpan={5}>
                        <div className="flex justify-center items-center h-[150px] ms:h-[150px] sm:h-[200px] md:h-[210px] lg:h-[230px]">
                          <div className="flex flex-col gap-15">
                            <div className="flex justify-center items-center">
                              <CgSmileNeutral size={50} fill="black" />
                            </div>
                            <p className="font-bold text-25 text-center">
                              No records found
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
                <tr className="h-full">
                  <td colSpan={5}>
                    <div className="flex justify-center items-center h-full min-h-[250px] ms:min-h-[110px] sm:min-h-[170px] md:min-h-[215px] lg:min-h-[250px]">
                      <Oval
                        color="#544bb9"
                        height="50"
                        width="50"
                        secondaryColor="#ab97d0"
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                      />
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
              pageCount={Math.ceil(totalResults / 5)}
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
              containerClassName={
                'flex py-2 justify-center gap-x-[10px] ms:gap-x-[10px] sm:gap-x-[15px] md:gap-x-[20px] lg:gap-x-[24px]'
              }
              pageClassName={
                'flex items-center justify-center w-[20px] rounded-[2px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[20px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm'
              }
              previousClassName={
                'prev-btn flex items-center justify-center w-[20px] rounded-[2px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[20px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm'
              }
              nextClassName={
                'next-btn flex items-center justify-center w-[20px] rounded-[2px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[20px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm'
              }
              pageLinkClassName={
                'flex items-center justify-center h-full w-full'
              }
              previousLinkClassName={
                'flex items-center justify-center h-full w-full rounded-[2px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] border-1 border-solid border-[#E4E4EB] disabled:bg-gray'
              }
              nextLinkClassName={
                'flex items-center justify-center h-full w-full rounded-[2px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] border-1 border-solid border-[#E4E4EB] disabled:bg-gray'
              }
              breakClassName={
                'flex items-center justify-center w-[20px] bg-[#FFFFFF] rounded-[2px] ms:rounded-[2px] sm:rounded-[4px] md:rounded-[6px] h-[20px] ms:h-[20px] ms:w-[20px] sm:h-[25px] sm:w-[25px] md:h-[30px] md:w-[30px] lg:h-[36px] lg:w-[36px] border-[1px] border-solid border-[#E4E4EB] ms:text-xs sm:text-xs md:text-sm lg:text-sm'
              }
              activeLinkClassName={'text-blue'}
              activeClassName={'bg-primary text-white'}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default SavedRecords
