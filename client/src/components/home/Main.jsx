import React from "react"
import {Icon} from "@iconify/react"
import "../../style.css"
import {Link, useNavigate} from "react-router-dom"
import Success from "../../pages/Success"

import Select from "react-select"
import cityNames from "../../data/cityNames"
import testsFromExcel from "../../data/testsFromExcel"
import qs from "qs"

export default function Main() {
  const navigate = useNavigate()

  const location = navigator.geolocation.getCurrentPosition(Success, Error)
  // console.log(location)
  const [pincode, setPincode] = React.useState("")
  const [city, setCity] = React.useState("")
  const [test, setTest] = React.useState([])
  const [bookNowDisabled, setBookNowDisabled] = React.useState(
    city == "" || test.length == 0 ? true : false
  )

  const handleCity = (city) => {
    setCity(city.value)
    setBookNowDisabled(test.length == 0 ? true : false)
    // console.log(city.value)
  }

  const handleTest = (selectedTests) => {
    const testNames = selectedTests.map((test) => test.value)
    setTest(testNames)
    // console.log(testNames)
    setBookNowDisabled(city == "" ? true : false)
  }

  const testNames = [...testsFromExcel.values()].map((test) => ({
    value: test.name,
    label: test.name,
  }))

  const handleClick = () => {
    const queryParams = {
      city: city,
      tests: test,
    }
    const queryString = qs.stringify(queryParams)
    navigate({
      pathname: "/chooseLab",
      search: `?${queryString}`,
    })

    if (city == "") {
      alert("Please select a city")
      return
    }
    if (test.length == 0) {
      alert("Please select a test")
      return
    }
    navigate({
      pathname: "/chooseLab",
      search: `?${queryString}`,
    })
  }

  // console.log(test)

  // const cityNames = [
  //   {value: "Ahd", label: "Ahd"},
  //   {value: "New York", label: "New York"},
  //   {value: "London", label: "London"},
  //   {value: "Los Angeles", label: "Los Angeles"},
  //   {value: "Chicago", label: "Chicago"},
  //   {value: "Houston", label: "Houston"},
  //   {value: "Philadelphia", label: "Philadelphia"},
  //   {value: "Phoenix", label: "Phoenix"},
  //   {value: "San Antonio", label: "San Antonio"},
  //   {value: "San Diego", label: "San Diego"},
  //   {value: "Dallas", label: "Dallas"},
  //   {value: "San Jose", label: "San Jose"},
  // ]

  const selctStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      border: "none",
      fontFamily: "Roboto",
      fontSize: "18px",
      fontWeight: "500",
      cursor: "pointer",
    }),
  }

  const credebility = [
    {
      id: 0,
      icon: "mingcute:safety-certificate-fill",
      h3: "Certified Labs",
    },
    {
      id: 1,
      icon: "ic:outline-access-time",
      h3: "OnTime Reports",
    },
    {
      id: 2,
      icon: "mdi:google",
      h3: "Rated 4.9/5",
      h4: "Customer love us!",
    },
  ]

  const credebilityArr = credebility.map((item) => {
    return (
      <div
        key={item.id}
        className={`flex items-center gap-2 mb-5 sm:gap-2 lg:mb-0 ${
          item.h3 == "OnTime Reports" ? "hidden sm:flex" : ""
        } `}
      >
        <div className="bg-background rounded-full p-[6px]">
          <Icon icon={item.icon} color="#000000" className="text-3xl" />
        </div>
        <div className="text-lg sm:text-xl md:text-2xl">
          <h3 className="font-medium ">{item.h3}</h3>
          {item.h4 && <h3 className="font-medium">{item.h4}</h3>}
        </div>
      </div>
    )
  })

  return (
    <div className=" mainBg  pt-8 lg:relative">
      <div className="hidden lg:block lg:absolute lg:w-36 lg:right-16 lg:top-24">
        <img src="images/home/bestPrice.png" alt="Our Promise, Best Price" />
      </div>
      <h1 className="text-white font-bold text-4xl w-[70%]  m-auto text-center lg:text-6xl lg:w-full ">
        Book Any Test at Best Price
      </h1>
      <div className="bg-primary p-4 my-6 rounded-md w-[90%] mx-auto xs:w-4/5 sm:w-3/5 sm:px-8 lg:w-[38%] 2xl:w-[30%]">
        {/* Location input */}
        <div className="flex bg-background py-2 px-5 gap-2 items-center rounded-md my-3">
          <Icon
            icon="material-symbols:my-location-rounded"
            color="#22242e"
            className="opacity-50 text-2xl"
          />
          {/* <input
            type="text"
            className="pl-3 w-full text-lg bg-transparent"
            placeholder="Enter Location"
          /> */}
          <Select
            options={cityNames}
            styles={selctStyles}
            className="w-full"
            isMulti={false}
            placeholder="Select City"
            // value={city}
            onChange={handleCity}
          />
          {/* {console.log(city)} */}
        </div>

        {/* Test input */}
        <div className="flex bg-background gap-2 py-2 px-5 items-center rounded-md my-3">
          <Icon
            icon="mdi:test-tube"
            color="#22242e"
            className="opacity-50 text-2xl"
          />
          {/* <input
            type="text"
            className="pl-3 w-full text-lg bg-transparent"
            placeholder="Select Tests"
          /> */}
          <Select
            options={testNames}
            styles={selctStyles}
            className="w-full"
            placeholder="Select Tests"
            isMulti={true}
            // value={{value: test, label: test}}
            onChange={handleTest}
          />
        </div>

        {/* Book Now */}
        <div className="flex justify-center">
          <button
            className={`bg-secondary text-white font-bold flex justify-center items-center py-1 px-4 rounded-md w-3/5 lg:w-1/2 text-xl  group ${
              bookNowDisabled
                ? "opacity-75 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            } `}
            disabled={bookNowDisabled}
            onClick={handleClick}
          >
            Book Now
            <Icon
              icon="material-symbols:arrow-right-alt"
              color="white"
              className="text-2xl ml-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
          </button>
        </div>
      </div>

      {/* Credibility */}
      <div className="bg-primary mt-12 lg:mt-8">
        <div className="pt-4 pb-1 flex mx-2 lg:mx-0 justify-evenly items-center gap-1 sm:gap-7 lg:justify-evenly lg:w-full lg:pt-2">
          {credebilityArr}
        </div>
      </div>
    </div>
  )
}
