import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Tool } from '../layout'
import { AppDispatch, RootState } from '../../redux/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { setHandle } from '../../redux/slices/pointsSlice'
// interface ShowModal {
//   active: boolean
// }
// type handleFullScreenModal = {
//   handle: ShowModal
//   setHandle: (value: ShowModal) => void
// }

// const FullScreenToolModal = ({ handle, setHandle }: handleFullScreenModal) => {
const FullScreenToolModal = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { handle } = useSelector((state: RootState) => ({
    handle: state.PointsSlice.handle,
  }))
  return (
    <Transition appear show={handle} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 h-full w-full"
        onClose={() => {
          // setHandle({ active: false })
          dispatch(setHandle(false))
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
          <div className="flex h-full w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* <Dialog.Panel className="w-full relative max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[400px] p-5 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"> */}
              <Dialog.Panel className="w-full h-full">
                <Tool defaultHandle={false} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FullScreenToolModal
