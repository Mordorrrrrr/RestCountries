import { useEffect, useState } from 'react'
import './index.css'
import "@fontsource/nunito-sans";
import { Link } from "react-router-dom";
import Country from './pages/Country';
import Skeleton from '@mui/material/Skeleton';
import { Header } from './components/Header'
import { useSelector } from 'react-redux';

const ListSkeleton = ({ toRender }) => {
  return (
    <>
      {Array(toRender)
        .fill(1)
        .map((card, index) => {
          return (
            <Skeleton
              key={index}
              sx={{ bgcolor: 'grey.500', marginTop: '-42px', marginRight: '0px' }}
              varian="rectangular"
              animation="wave"
              width={265}
              height={560}
            />
          )
        })
      }
    </>
  )

}
const LoadingGreyOut = () => {
  return (
    <div >
      <div className='flex flex-row gap-x-56 flex-wrap justify-center items-start !mb-[-100px]'>
        <ListSkeleton toRender={4} />
      </div>
      <div className='flex flex-row gap-x-56 flex-wrap justify-center'>
        <ListSkeleton toRender={12} />
      </div>
    </div>
  )
}

const App = () => {
  const [defaultCountries, setDefaultCountries] = useState()
  const [countries, SetCountries] = useState()
  const darkMode = useSelector((state) => state.dm.darkModeBool)
  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {

  }, [darkMode])


  const Body = () => {
    if (countries == undefined) {
      return (
        <LoadingGreyOut />
      )
    }
    return (
      <div className={`pt-20 flex flex-row flex-wrap gap-x-56 gap-y-20 justify-center min-w-full`}>
        {countries && countries.map((ele, index) => {
          return (

            <div key={ele.altSpellings[0]} className={` h-[336px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col rounded-t${darkMode ? '[&_p]: text-white !bg-darkModeEle' : ' text-darkModeText'}`}>
              <Link to={`Country/${ele.name.common}`} state={countries[index]}
              ><img country={ele.name.common} src={ele.flags.png} className='w-[264px] h-[160px] rounded-t hover:cursor-pointer' /></Link>
              <h4 className='pt-4 pl-6 font-extrabold '>{ele.name.common}</h4>
              <div className='pt-4 flex flex-col gap-2 [&_p]:font-extrabold [&_p]:pl-6 [&_span]:pl-1 [&_span]:font-normal ' >
                <p className=' text-sm'>Population:<span>{ele.population.toLocaleString()}</span></p>
                <p className=' text-sm'>Region:<span>{ele.region}</span></p>
                <p className=' text-sm'>Capital:<span>{ele.capital}</span></p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const handleRegionSelect = (e) => {
    SetCountries(defaultCountries)
    if (e.target.value == 'Default') return
    let retArr = defaultCountries.filter(function (ele) { return ele.region == e.target.value });
    SetCountries(retArr)
  }
  const handleSearchQuery = (e) => {
    if (e.target.value.length < 1) SetCountries(defaultCountries)
    let retArr = defaultCountries.filter(function (ele) { return ele.name.common.toLowerCase().startsWith(e.target.value.toLowerCase().trim()) });
    SetCountries(retArr)
  }
  const getCountries = async () => {
    const req = await fetch('https://restcountries.com/v3.1/all')
    const res = await req.json()
    SetCountries(res)
    setDefaultCountries(res)
  }

  return (
    <>
      < Header />

      {/* Filter */}
      <div className='mt-10 flex flex-row items-center justify-between'>
        <div className={` flex flex-row items-center w-fit pl-4 pr-4 rounded ml-32 tablet:ml-8 phoneMd:ml-4 phoneMd:pl-3 phoneMd:pr-4 phoneSm:ml-2 ${darkMode ? 'bg-darkModeEle' : 'bg-white'}`}>
          <img src="./icons/mag.png" className={` h-[20px] ${darkMode ? 'invert' : ''} singleCol:h-[14px]`} />
          <input type="text" className={` w-[380px] h-[56px] focus:outline-none focus:pl-4 pl-4 text-xl placeholder:text-base ${darkMode ? 'bg-darkModeEle placeholder:text-white text-white' : 'bg-white'} tabletSmall:w-[250px] singleCol:w-[180px] singleCol:placeholder:text-sm phoneLg:w-[150px] phoneMd:placeholder:text-xs phoneMd:w-[130px] phoneSm:pl-2 phoneSm:w-[120px]`} placeholder='Search for a country...' onChange={(e) => handleSearchQuery(e)} />
        </div>
        <div className=' mr-32 text-sm tablet:mr-8 phoneMd:mr-3 phoneSm:mr-2'>
          <select className={`h-[56px] w-[180px] p-1 indent-2 [&_*]: border-r-8 border-transparent rounded border-none ${darkMode ? 'bg-darkModeEle text-white' : 'bg-white'} singleCol:w-[150px] phoneMd:text-xs phoneSm:w-[130px]`} onChange={(e) => handleRegionSelect(e)}>
            <option className=' hidden' >Filter by Region</option>
            <option value="Default">Default</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>


      <Body />

    </>

  )

}

export default App
