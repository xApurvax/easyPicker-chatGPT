import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const VerifyOtpModal = ({ children, modal, setModal, onClose }) => {
  return (
    <>
      <Transition appear show={modal?.isVisible || false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-transparent bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto bg-transparent">
            <div className="flex p-3 min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>{children}</Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default VerifyOtpModal
