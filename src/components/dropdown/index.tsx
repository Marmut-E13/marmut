"use client"

import { useState } from "react"
import { HiChevronDown } from "react-icons/hi"

export interface OptionProps {
    display: string
    value: string
}

export interface DropdownProps {
    options: OptionProps[]
    dropdownValue: string
    setDropdownValue: React.Dispatch<React.SetStateAction<string>>
}

export const Dropdown: React.FC<DropdownProps> = ({
    dropdownValue, options, setDropdownValue
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getDisplay = (value: string) => {
        const option = options.find((option) => option.value == value)
        return option ? option.display : null
    }

    return (
        <div className='border-[2px] rounded-md border-marmut-dark-green-300 relative min-w-[110px]'>
            <div className="flex flex-row items-center justify-between px-3 py-[6px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className={`${getDisplay(dropdownValue) == null && "text-marmut-300"} text-[16px] font-light`}>
                    {getDisplay(dropdownValue) == null ? `Select playlist` : 
                    <text className="flex flex-row gap-2 items-center">
                        {getDisplay(dropdownValue)}
                    </text>}
                </div>

                <div className={`transform ${isOpen ? 'rotate-180' : ''}  transition-transform duration-500 ease-in-out`}>
                    <HiChevronDown />
                </div>
            </div>

            <div className={`${isOpen ? "flex" : "hidden"} flex-col absolute top-[105%] w-full items-center max-h-[250px] overflow-y-auto rounded-b-md transition-all duration-300`}>
                {options.map(({display, value}, key) => (
                    <div key={key} className="flex flex-col w-full text-[16px]">
                        <div className={`${value != dropdownValue ? "block" : "hidden"} flex flex-row cursor-pointer bg-white hover:bg-marmut-100 gap-2 px-3 py-2 items-center font-medium`} onClick={() => {setDropdownValue(value), setIsOpen(false)}}>
                            {display}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}