/* eslint-disable no-empty-pattern */
import { Dialog, Transition } from '@headlessui/react'
import { Field } from 'formik'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Fragment, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import getCroppedImg from '../crop/CropImage'
import React from 'react'
import { Nullable } from '../../utils/types/types'

interface ImageType {
  file: { name: string; size: number; type: string }
  url?: string
}

interface CropImageModalProps {
  photoURL: { data_url: string }
  setImage: React.Dispatch<React.SetStateAction<ImageType | {}>>
  name?: string
}

const CropImageModal: React.FC<CropImageModalProps> = ({
  photoURL,
  setImage,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number | undefined>(1)
  const [rotation, setRotation] = useState<number | undefined>(0)
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Nullable<Area>>(null)

  const cropComplete = (croppedAreaPixels: Area) =>
    setCroppedAreaPixels(croppedAreaPixels)

  const zoomPercentage = (value: number) => `${Math.round(value - 1)}%`

  const saveCropImage = async () => {
    const croppedImage = await getCroppedImg(
      photoURL.data_url,
      croppedAreaPixels,
      rotation
    )
    setImage(croppedImage)
  }

  function closeModal() {
    setIsOpen(false)
    setImage({})
  }

  return (
    <div>
      <Field name={props.name}>
        {({}) => {
          return (
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                open={isOpen}
                onClose={closeModal}
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

                <div className="fixed inset-0">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="w-full max-w-md p-4 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Crop Image
                      </Dialog.Title>
                      <div className="m-2 relative h-[250px]">
                        <Cropper
                          image={photoURL?.data_url}
                          crop={crop}
                          zoom={zoom}
                          rotation={rotation}
                          aspect={1 / 1}
                          onZoomChange={setZoom}
                          onRotationChange={setRotation}
                          onCropChange={setCrop}
                          onCropComplete={cropComplete}
                        />
                      </div>
                      <div className="px-2">
                        <div className="flex gap-[2%] items-center py-2">
                          <p className="text-sm text-black max-w-[50px] w-screen">
                            Zoom :
                          </p>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={zoom}
                            onChange={(zoom) => setZoom(zoom as number)}
                            ariaValueTextFormatterForHandle={zoomPercentage}
                          />
                        </div>
                        <div className="flex gap-[2%] items-center py-2">
                          <p className="text-sm text-black max-w-[50px] w-screen">
                            Rotate :
                          </p>
                          <Slider
                            min={0}
                            max={360}
                            step={1}
                            value={rotation}
                            onChange={(rotation) =>
                              setRotation(rotation as number)
                            }
                            ariaValueTextFormatterForHandle={zoomPercentage}
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-[5%] justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border-1 border-solid border-light-blue px-3 py-2 text-sm font-medium bg-primary text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={saveCropImage}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md b border-[1px] border-solid border-primary px-3 py-2 text-sm font-medium text-primaryfocus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </div>
                </div>
              </Dialog>
            </Transition>
          )
        }}
      </Field>
    </div>
  )
}

export default CropImageModal
