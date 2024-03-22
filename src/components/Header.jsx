import { Link } from "react-router-dom";
import { darkModeToggle, onLoadInit } from "../redux/darkModeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export function Header() {
    const darkMode = useSelector((state) => state.dm.darkModeBool)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(onLoadInit())
    }, [])
    return (
        <div className={`${darkMode ? 'bg-darkModeEle' : 'bg-white'} h-[80px] w-full pt-2 flex flex-row items-center justify-between `}>
            <Link to='/'>  <h1 className={` ${darkMode ? 'text-white' : 'text-black'} font-extrabold text-2xl pb-2 pl-20 phoneLg:pl-8 phoneLg:pt-2 phoneLg:text-base phoneSm:pl-4`}>Where in the world?</h1></Link>
            <div className='flex flex-row hover:cursor-pointer items-center pr-12 phoneLg:pr-8 phoneSm:pr-4 ' onClick={() => dispatch(darkModeToggle())}>
                <img src={`../icons/${darkMode ? 'moon.png' : 'sun.png'}`} className={` h-[35px] pr-[1px] pt-[8px] pb-2 ${darkMode ? 'invert' : ''} phoneLg:h-[30px]`} /><span className={`font-bold ${darkMode ? `!text-white` : '!text-black'} phoneLg:text-sm`}>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
        </div>

    )
}
