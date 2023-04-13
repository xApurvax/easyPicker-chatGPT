import React from 'react'
import { Switch } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

interface ToggleSwitchProps {
  toggle: boolean
  setToggle: any
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ toggle, setToggle }) => {
  const dispatch = useDispatch()
  const handleToggle = () => dispatch(setToggle(!toggle))

  return (
    <div>
      <Switch
        checked={toggle}
        onChange={() => handleToggle()}
        className={classNames(
          'relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
          toggle ? 'bg-[#2e90fa]' : 'bg-[#f0f2f3]'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            'pointer-events-none inline-block h-[14px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
            toggle ? 'translate-x-3' : 'translate-x-0'
          )}
        />
      </Switch>
    </div>
  )
}

export default ToggleSwitch
