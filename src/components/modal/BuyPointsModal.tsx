import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogOutModal } from '../../redux/slices/auth/loginSlice'
import { IoClose } from 'react-icons/io5'
import {
  BuyPointsFetchAPi,
  setShowBuyPointsModal,
} from '../../redux/slices/pointsSlice'
import { GiTwoCoins, GiCoins } from 'react-icons/gi'
import { RiCoinFill } from 'react-icons/ri'
import { FaCoins } from 'react-icons/fa'
import classNames from 'classnames'
import { Nullable, fixMeLater } from '../../utils/types'

export const BuyPointsModal = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [counter, setCounter] = useState([
    { countValue: 10, price: 1, coinIcon: <RiCoinFill />, id: 1 },
    { countValue: 100, price: 10, coinIcon: <FaCoins />, id: 2 },
    { countValue: 1000, price: 100, coinIcon: <GiCoins />, id: 3 },
  ])
  const [count, setCount] = useState(0)
  const [counterSelected, setCounterSelected] = useState<{
    selected: boolean
    id: Nullable<Number>
  }>({
    selected: false,
    id: null,
  })
  // const [availableCoins, setAvailableCoins] = useState();

  const { showBuyPointsModal, isLoading } = useSelector(
    (state: fixMeLater) => ({
      showBuyPointsModal: state.pointsSlice.showBuyPointsModal,
      isLoading: state.pointsSlice.isLoading,
    })
  )

  const handleBuyPoints = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      BuyPointsFetchAPi({
        points: count,
      })
    )
    setCount(0)
  }

  return (
    <Transition appear show={showBuyPointsModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          dispatch(setLogOutModal(false))
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[400px] p-5 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex gap-1 items-center justify-center text-lg font-medium leading-6 text-gray-900 mt-2 ms:mt-2 sm:mt-2 md:mt-4 lg:mt-4"
                >
                  Buy Coins
                  <GiTwoCoins
                    color="#FFD700"
                    // size={35}
                    className="text-2xl cursor-pointer"
                  />
                </Dialog.Title>
                <div
                  onClick={() => {
                    dispatch(setShowBuyPointsModal(false))
                    setCount(0)
                  }}
                  className="absolute top-3 right-3 text-primary text-2xl ms:text-lg sm:text-lg md:text-2xl lg:text-2xl cursor-pointer"
                >
                  <IoClose />
                </div>
                <div className="flex flex-col gap-4 mt-2">
                  {counter &&
                    counter.map((data, id) => (
                      <div key={id}>
                        <button
                          disabled={isLoading}
                          onClick={(e) => {
                            e.preventDefault()
                            setCount(data.countValue)
                            setCounterSelected({ selected: true, id: id })
                          }}
                          className={classNames(
                            'flex gap-2 w-full items-center justify-center px-6 py-3 ms:px-2 sm:px-3 md:px-4 lg:px-5 ms:py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-md cursor-pointer disabled:cursor-not-allowed',
                            counterSelected.id === id &&
                              data.countValue === count
                              ? 'bg-primary text-white font-bold'
                              : 'bg-[#EDF2F7] text-[#000000]'
                          )}
                        >
                          <p>Buy {data.countValue}</p>
                          <p className="text-[#FFD700] text-2xl ms:text-[16px] sm:text-[24px] md:text-[28px] lg:text-2xl">
                            {data.coinIcon}
                          </p>
                          <p>Coins In ₹{data.price}</p>
                        </button>
                      </div>
                    ))}
                </div>
                <div className="mt-5 ms:mt-3 sm:mt-3 md:mt-4 lg:mt-5 flex gap-5 justify-end">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary disabled:opacity-3 px-5 py-2 ms:px-2 sm:px-3 md:px-5 lg:px-5 
                    ms:py-1 sm:py-1 md:py-2 lg:py-2 text-sm font-medium text-white disabled:bg-[#966FD6] disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 tracking-widest"
                    onClick={(e) => handleBuyPoints(e)}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-md border-1 px-3 py-2 ms:px-2 sm:px-2 md:px-3 lg:px-3 ms:py-1 sm:py-1 md:py-2 lg:py-2 text-sm font-medium text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed border-[1px] border-solid border-primary"
                    onClick={() => {
                      dispatch(setShowBuyPointsModal(false))
                      setCount(0)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
