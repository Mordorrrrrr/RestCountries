import React, { useEffect, useState, useReducer } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'

export default function Country() {

  const [borderCountries, setBorderCountries] = useState([])
  const [borderObj, setBorderObj] = useState([])
  const [currencies, setCurrencies] = useState([])
  const { countryName } = useParams()
  const location = useLocation().state

  const darkMode = useSelector((state) => state.dm.darkModeBool)
  
  const getCurrencies = () => {
    if (Object.values(location.currencies).length < 2) {
      setCurrencies(Object.values(location.currencies)[0]['name'])
    } else {
      Object.values(location.currencies).forEach(ele => {
        setCurrencies([...currencies, ele['name']])
      })
    }
  }
  const getBorders = async () => {
    const req = await fetch(`https://restcountries.com/v3.1/alpha?codes=${Array.from(location.borders).toString()}`)
    const res = await req.json()
    let arr = []
    res.forEach(ele => {
      arr.push(ele.name.common)
    })
    setBorderCountries(arr)
    setBorderObj(res)
  }
  const BorderDiv = () => {
    if (borderCountries.length > 0) {
      return (
        <div className=' h-[100px] w-full flex flex-wrap !items-start !justify-start flex-col [&>p]:font-bold [&>p>span]:font-normal [&>p>span]:pr-2 [&>p>span]:pl-2 [&>p>span]:bg-[#f2f2f2] [&>p>span]:drop-shadow-[0px_0px_1px_rgba(0,0,0,0.25)] '>
          <p className=' h-[100px]  overflow-hidden flex flex-row flex-wrap gap-4 justify-start items-center middleSect:w-[80vw] tablet:pb-8'>Border Countries: <BorderElement toRender={borderCountries.length} /><span></span> </p>
        </div>
      )
    }
  }
  const BorderElement = ({ toRender }) => {
    return (
      <>
        {Array(toRender)
          .fill(1)
          .map((border, index) => {
            return (
              <span key={index} className={`${darkMode ? ' !bg-darkModeEle   hover:!bg-[#516271]' : 'bg-white'} transition ease-in-out delay-50 select-none hover:scale-110`}> <Link to={`/Country/${borderCountries[index]}`} state={borderObj[index]} >{borderCountries[index]}</Link></span>
            )
          })
        }
      </>
    )
  }
  useEffect(() => {
    getBorders()
    getCurrencies()
  }, [location])
  return (
    <div className='flex flex-col items-center'>
      <Header />

      <div className='w-full flex flex-row flex-start items-center h-40'>
        <Link to='/' className={`flex flex-row items-center ${darkMode ? '[&>img]:invert text-white' : ''} `}>  <img src="../icons/arrow.png" className='h-[28px] pl-28 tablet:pl-20 middleSect:pl-10 singleCol:pl-6 phoneMd:pl-3' /><span className=' font-light pl-1'>Back</span></Link>
      </div>


      {location?.flags.png.length > 0 &&

        <div className={`pt-12 pl-20 flex flex-row flex-shrink gap-8 tablet:flex-col tablet:gap-y-2 tablet:w-full tablet:pl-0 tablet:pt-0 tablet:items-center`}>
          <img src={location.flags.svg} className='w-[40vw]  rounded-lg flex-shrink-0  tablet:w-[600px] middleSect:w-[550px] singleCol:w-[90vw]' />
          <div className={`ml-8 mt-12 flex flex-col flex-wrap h-[450px] gap-y-12 tablet:flex-nowrap tablet:h-full tablet:w-full tablet:ml-[20vw] tablet:flex-shrink-0 ${darkMode ? 'text-white' : ' text-darkModeText'}`}>
            <span className=' text-4xl font-black overflow-hidden'>{countryName}</span>
            <div className=' flex flex-col gap-3 h-[200px] flex-wrap tablet:h-full tablet:flex-nowrap tablet:gap-y-20 tablet:flex-shrink-0'>
            <div className='[&>p]:font-bold [&>p>span]:font-normal flex flex-col gap-3 '>
              <p>Native Name: <span>{Object.values(location.name.nativeName)[0].common}</span></p>
              <p>Population: <span>{location.population.toLocaleString()}</span></p>
              <p>Region: <span>{location.region}</span></p>
              <p>Sub Region: <span>{location.subregion}</span></p>
              <p>Capital: <span>{location.capital[0]}</span></p>
              </div>
              <div className='[&>p]:font-bold [&>p>span]:font-normal flex flex-col gap-3'>
              <p>Top Level Domain: <span>{location.tld[0]}</span></p>
              <p>Currencies: <span>{currencies}</span></p>
              <p>Languages: <span>{Array.from(Object.values(location.languages)).toString()}</span></p>
              </div>
            </div>
            <BorderDiv />
          </div>
        </div>
      }
    </div>
  )
}
