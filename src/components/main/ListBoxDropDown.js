import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsCheck2 } from 'react-icons/bs';
import { HiChevronUpDown } from 'react-icons/hi2';
import { setSelectedLanguage } from "../../redux/slices/generateHeadlineSlice";
import { useSelector, useDispatch } from "react-redux";

const people = [
    { name: 'english' },
    { name: 'afar' },
    { name: 'abkhazian' },
    { name: 'afrikaans' },
    { name: 'akan' },
    { name: 'albanian' },
    { name: 'amharic' },
    { name: 'arabic' },
    { name: 'aragonese' },
    { name: 'armenian' },
    { name: 'assamese' },
    { name: 'avaric' },
    { name: 'avestan' },
    { name: 'aymara' },
    { name: 'azerbaijani' },
    { name: 'bashkir' },
    { name: 'bambara' },
    { name: 'basque' },
    { name: 'belarusian' },
    { name: 'bengali' },
    { name: 'bihari languages' },
    { name: 'bosnian' },
    { name: 'breton' },
    { name: 'bulgarian' },
    { name: 'burmese' },
    { name: 'catalan; valencian' },
    { name: 'czech' },
    { name: 'chamorro' },
    { name: 'chechen' },
    { name: 'chinese' },
    { name: 'chuvash' },
    { name: 'cornish' },
    { name: 'corsican' },
    { name: 'cree' },
    { name: 'chinese' },
    { name: 'czech' },
    { name: 'danish' },
    { name: 'german' },
    { name: 'greek' },
    { name: 'esperanto' },
    { name: 'estonian' },
    { name: 'basque' },
    { name: 'ewe' },
    { name: 'faroese' },
    { name: 'persian' },
    { name: 'fijian' },
    { name: 'finnish' },
    { name: 'french' },
    { name: 'western frisian' },
    { name: 'fulah' },
    { name: 'georgian' },
    { name: 'german' },
    { name: 'gaelic' },
    { name: 'irish' },
    { name: 'galician' },
    { name: 'manx' },
    { name: 'greek' },
    { name: 'guarani' },
    { name: 'gujarati' },
    { name: 'haitian' },
    { name: 'hausa' },
    { name: 'hebrew' },
    { name: 'herero' },
    { name: 'hindi' },
    { name: 'hiri motu' },
    { name: 'croatian' },
    { name: 'hungarian' },
    { name: 'armenian' },
    { name: 'igbo' },
    { name: 'icelandic' },
    { name: 'ido' },
    { name: 'sichuan yi' },
    { name: 'inuktitut' },
    { name: 'interlingue' },
    { name: 'interlingua' },
    { name: 'indonesian' },
    { name: 'inupiaq' },
    { name: 'icelandic' },
    { name: 'italian' },
    { name: 'javanese' },
    { name: 'japanese' },
    { name: 'kalaallisut' },
    { name: 'kannada' },
    { name: 'tibetan' },
    { name: 'kashmiri' },
    { name: 'georgian' },
    { name: 'kanuri' },
    { name: 'kazakh' },
    { name: 'central khmer' },
    { name: 'kikuyu' },
    { name: 'kinyarwanda' },
    { name: 'kirghiz' },
    { name: 'komi' },
    { name: 'kongo' },
    { name: 'krean' },
    { name: 'kuanyama' },
    { name: 'kurdish' },
    { name: 'lao' },
    { name: 'latin' },
    { name: 'latvian' },
    { name: 'limburgan' },
    { name: 'lingala' },
    { name: 'lithuanian' },
    { name: 'luxembourgish' },
    { name: 'luba-katanga' },
    { name: 'ganda' },
    { name: 'macedonian' },
    { name: 'marshallese' },
    { name: 'malayalam' },
    { name: 'maori' },
    { name: 'marathi' },
    { name: 'malay' },
    { name: 'burmese' },
    { name: 'panjabi' },
    { name: 'persian' },
    { name: 'pali' },
    { name: 'polish' },
    { name: 'portuguese' },
    { name: 'pushto' },
    { name: 'quechua' },
    { name: 'romansh' },
    { name: 'romanian' },
    { name: 'tamil' },
    { name: 'telugu' },
    { name: 'welsh' },
    { name: 'zulu' },
  ]

const ListBoxDropDown = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(people[0])
  const { selectedLanguage } = useSelector((state) => ({
    selectedLanguage: state.generateHeadlineSlice.selectedLanguage,
  }));
  
  useEffect(() => {
    setSelected && dispatch(setSelectedLanguage(selected))
  }, [selected])

  return (
    <div className="group">
        <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
            <Listbox.Button className="relative w-full min-w-[150px] cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-[#2E90FA] font-semibold">{selected.name.charAt(0).toUpperCase()+selected.name.slice(1)}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                size={20}
                color="#252728"
                />
            </span>
            </Listbox.Button>
            <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3">
                {people.map((person, personIdx) => (
                <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4 ${
                        active ? 'bg-blue-100 text-amber-900' : 'text-gray-900'
                    }`
                    }
                    value={person}
                >
                    {({ selected }) => (
                    <>
                        <span
                        className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                        }`}
                        >
                        {person.name.charAt(0).toUpperCase()+person.name.slice(1)}
                        </span>
                        {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <BsCheck2 size={18} color="#252728" />
                        </span>
                        ) : null}
                    </>
                    )}
                </Listbox.Option>
                ))}
            </Listbox.Options>
            </Transition>
        </div>
        </Listbox>
    </div>
  )
}

export default ListBoxDropDown


