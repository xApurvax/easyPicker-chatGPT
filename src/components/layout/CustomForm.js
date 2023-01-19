import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setGenerateHeadlineEffect,setSaveResult,setReGenerate } from "../../redux/slices/buttonEffectSlice";
import { ThreeDots } from 'react-loader-spinner'
import CustomCreateTag from "../main/CustomCreateTag";
import { FaBookmark } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { GiTwoCoins } from 'react-icons/gi';
import { BsCheck2 } from 'react-icons/bs';
import {generateHeadlineFetchAPi} from "../../redux/slices/generateHeadlineSlice";
import logo from "../../assets/recycle.svg";
import { Formik } from 'formik'
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { LoginValidationSchema } from '../../utils/FormValidations';
import { loginFetchAPi } from '../../redux/slices/auth/loginSlice';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderNew from './HeaderNew';
import Tool from './Tool';

const CustomForm = ({children}) => {

    const { generateHeadlineEffect,isLoading,saveResult,reGenerate,allTitles,specialTags,hasTitleTag,copyAllSpecialTags,token,isSuccess } = useSelector((state) => ({
            generateHeadlineEffect: state.buttonEffectSlice.generateHeadlineEffect,
            saveResult: state.buttonEffectSlice.saveResult,
            reGenerate: state.buttonEffectSlice.reGenerate,
            isLoading: state.generateHeadlineSlice.isLoading,
            allTitles: state.generateHeadlineSlice.allTitles,
            specialTags: state.generateHeadlineSlice.specialTags,
            hasTitleTag: state.generateHeadlineSlice.hasTitleTag,
            copyAllSpecialTags: state.generateHeadlineSlice.copyAllSpecialTags,
            token: state.loginSlice.allData?.token?.access,
            isSuccess: state.loginSlice.isSuccess,
          }));
          
          // const navigate = useNavigate();
          //   useEffect(() => {
          //       token && token !== undefined ? navigate('/') : navigate('/auth/login');
          //   }, [token])

  return (
    <div className='relative z-10 mx-auto max-w-6xl'>
        <div className='flex w-full gap-8 items-center justify-center'>
            {children}
        </div>
    </div>
  )
}

export default CustomForm