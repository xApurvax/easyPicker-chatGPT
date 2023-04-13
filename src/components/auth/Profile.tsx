import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import InputField from '../form/InputField'
import CustomButton from '../form/CustomButton'
import { profileUpdateValidationSchema } from '../../utils/FormValidations'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSignInEffect } from '../../redux/slices/buttonEffectSlice'
import {
  profileDetailsFetchAPI,
  profileDetailsUpdateFetchAPI,
} from '../../redux/slices/ProfileSlice'
import { GoHome } from 'react-icons/go'
import DropZone from '../layout/DropZone'
import CropImageModal from '../modal/CropImageModal'

import { AppDispatch, RootState } from '../../redux/store/store'
import { UserPictureProps } from '../../utils/types/types'

export type UserProfileProps = {
  username: string
  name: string
  email: string
}

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [image, setImage] = useState<UserPictureProps | undefined>()
  const { isLoading, isUpdating, profileDetails } = useSelector(
    (state: RootState) => ({
      isLoading: state.ProfileSlice.isLoading,
      isUpdating: state.ProfileSlice.isUpdating,
      profileDetails: state.ProfileSlice.profileDetails,
    })
  )

  useEffect(() => {}, [profileDetails?.profile_pic])
  useEffect(() => {
    dispatch(profileDetailsFetchAPI())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'Profile | Title Generator'
  }, [])

  const initialValues = {
    username: profileDetails?.username || '',
    name: profileDetails?.name || '',
    email: profileDetails?.email || '',
  }
  useEffect(() => {
    setImage({ url: profileDetails?.profile_pic })
  }, [profileDetails])

  const handleProfileUpdateSubmit = (values: UserProfileProps) => {
    const formData = {
      ...values,
    }
    const fData = new FormData()
    if (image!.file) fData.append('profile_pic', image!.file, image?.file?.name)
    // eslint-disable-next-line array-callback-return
    Object.entries(formData).map((field) => {
      fData.append(field[0], field[1] || '')
    })
    
    dispatch(profileDetailsUpdateFetchAPI(fData))
  }

  return (
    <>
      <div className="flex flex-col p-5 ms:p-5 sm:p-5 md:p-10 lg:p-5 gap-2 rounded-xl bg-white w-full h-full ms:max-w-[90%]">
        <div className="flex gap-1 items-center">
          <GoHome
            className="text-xs ms:text-xs sm:text-lg md:text-2xl lg:text-2xl cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          />
          <h1 className="font-semibold text-xs ms:text-xs sm:text-lg md:text-2xl lg:text-lg">
            / Account Information
          </h1>
        </div>
        <div className="flex flex-col gap-2 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-2 h-full w-full justify-center items-center py-0 ms:py-0 lg:py-5">
          <Formik<UserProfileProps>
            initialValues={initialValues}
            validationSchema={profileUpdateValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => handleProfileUpdateSubmit(values)}
            enableReinitialize
          >
            {({ handleSubmit }) => (
              <form
                className="w-full max-w-md"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-6 justify-center items-start">
                  <div className="w-full h-full">
                    <DropZone
                      imageAfterCrop={image && image?.url}
                      image={image}
                      setImage={setImage}
                    />
                  </div>
                  <div className="flex flex-col gap-10 ms:gap-5 sm:gap-5 md:gap-8 lg:gap-5 items-start w-full">
                    <div className="flex justify-between gap-[5%] w-full h-full">
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs sm:text-sm md:text-base lg:text-base">
                          Username :
                        </label>
                        <InputField
                          type="text"
                          id="username"
                          name="username"
                          inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                          borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                          placeholder="Username"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-xs sm:text-sm md:text-base lg:text-base">
                          Name :
                        </label>
                        <InputField
                          type="text"
                          id="name"
                          name="name"
                          inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                          borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-xs sm:text-sm md:text-base lg:text-base">
                        E-mail :
                      </label>
                      <InputField
                        type="text"
                        id="email"
                        name="email"
                        // disabled={true}
                        inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray disabled:cursor-not-allowed focus:border-primary"
                        borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                        placeholder="E-mail"
                      />
                    </div>
                  </div>
                  <div className="py-3 ms:py-2 sm:py-2 md:py-3 lg:py-1 w-full">
                    <CustomButton
                      type="submit"
                      disabled={isLoading || isUpdating}
                      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                        dispatch(setSignInEffect(true))
                      }}
                      onAnimationEnd={() => {
                        dispatch(setSignInEffect(false))
                      }}
                      buttonStyle="w-full py-[12px] 2xl:py-[13px] text-sm sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg"
                      loaderSize={20}
                      showLoader
                    >
                      Update
                    </CustomButton>
                  </div>
                  <div>
                    {Array.isArray(image) && image.length > 0 && (
                      <CropImageModal
                        name="profile"
                        id="profile"
                        setImage={setImage}
                        photoURL={image[image.length - 1]}
                      />
                    )}
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default Profile
