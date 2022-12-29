import React,{ useState } from 'react'
import { Switch } from '@headlessui/react'
import { useDispatch } from "react-redux";

const ToggleSwitch = ({toggle,setToggle}) => {
  const dispatch = useDispatch();
    const [enabled, setEnabled] = useState(false)
    const handleToggle = () => {
      dispatch(setToggle(!toggle))
    }
  return (
    <div>
    <Switch
        checked={toggle}
        onChange={() => {handleToggle()}}
        className={`${toggle ? 'bg-[#2e90fa]' : 'bg-[#f0f2f3]'}
          relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${toggle ? 'translate-x-3' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[15px] transform rounded-full  bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
    </Switch>
    </div>
  )
}

export default ToggleSwitch