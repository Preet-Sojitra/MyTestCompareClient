import React from "react"
import {Icon} from "@iconify/react"

import MiniNav from "../components/MiniNav"
import Nav from "../components/Nav"
import DiscountStrip from "../components/DiscountStrip"
import SelectedTest from "../components/chooseLab/SelectedTest"
import IndividualSelectedTest from "../components/SelectedTests/IndividualSelectedTest"
import Footer from "../components/Footer"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import time from "../data/time"
import {useNavigate, useLocation} from "react-router-dom"
import LoginPopup from "../components/LoginPopup"
import ReactModal from "react-modal"
import qs from "qs"
import axios from "axios"

export default function SelectedTests() {
  // const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(
  //   localStorage.getItem("token") ? true : false
  // )

  const isUserLoggedIn = localStorage.getItem("token") ? true : false

  // console.log(localStorage.getItem("token"))

  const navigate = useNavigate()
  const location = useLocation()
  const search = location.search

  const params = new URLSearchParams(search)

  const lab = params.get("lab")

  const [value, onChange] = React.useState(new Date())

  const [response, setResponse] = React.useState({})

  const [appoint, setTime] = React.useState("")

  const [visible, setVisible] = React.useState(false)

  function showDateAndTime() {
    setVisible(!visible)
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
      height: "fit-content",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      width: "75vw",
    },
  }

  function openModal() {
    isUserLoggedIn ? navigate("/booking") : setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const queryParams = qs.parse(search, {ignoreQueryPrefix: true})
  const {tests} = queryParams

  React.useEffect(() => {
    const getTestDeatils = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/lab/test",
          {
            params: {
              name: lab,
              tests: tests,
            },
          }
        )
        setResponse(response.data.data)
        // console.log(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getTestDeatils()
  }, [])

  // console.log(response.test)
  // console.log(response.labDetails)

  // const selectedTests = response.data.test

  // document.body.style.overflow = modalIsOpen ? "hidden" : "auto"

  const timingArr = time.map((item, index) => {
    const handleClick = (e) => {
      setTime(e.target.innerHTML)
    }

    return (
      <button
        key={index}
        className="border-[1px] border-secondary rounded px-3"
        onClick={(e) => handleClick(e)}
      >
        {item}
      </button>
    )
  })

  return (
    <div className="font-Roboto bg-background">
      <MiniNav />
      <Nav />
      <DiscountStrip />

      {/* Whole container */}
      <div className="my-8 px-2">
        <div className="flex items-center gap-3" onClick={() => navigate(-1)}>
          <Icon
            icon="carbon:chevron-left"
            color="black"
            inline={true}
            className="text-3xl sm:text-4xl"
          />
          <h3 className="text-2xl font-medium lg:text-3xl">Choose Other Lab</h3>
        </div>
        <div className="flex bg-secondary-withOpacity gap-2 py-2 px-3 rounded mt-4 w-[90%] mx-auto md:w-[98%] md:mx-3">
          <Icon
            icon="ic:baseline-search"
            color="black"
            inline={true}
            className="text-3xl sm:text-4xl"
          />
          <input
            type="text"
            className="bg-transparent rounded w-full "
            placeholder="Add more tests or health packages"
          />
        </div>

        <div className="md:flex md:gap-5 md:items-center md:mt-4">
          <div className="text-center pt-4 md:pt-0 text-xl font-medium md:mt-3 sm:text-left sm:mx-4 md:flex-shrink-0">
            <h1>Selected Lab: {response.labDetails.labName}</h1>
          </div>

          <div className="sm:flex sm:px-3 sm:items-center">
            <p className="text-center pt-4 md:pt-0 text-xl font-medium md:mt-3">
              Selected Tests
            </p>
            <div>
              <SelectedTest />
            </div>
          </div>
        </div>

        <div className="mt-3 sm:px-4 sm:mt-8">
          <h1 className="text-lg sm:text-left sm:text-xl font-medium text-center">
            Enter Patient Details:
          </h1>
          <div className="px-4 sm:px-0 sm:flex sm:flex-wrap sm:justify-between sm:gap-x-4 lg:w-3/4 xl:w-[55%]">
            <div className="flex gap-2 items-center justify-between mt-2">
              <h1 className="font-medium text-lg">1. Name:</h1>
              <input
                type="text"
                className="bg-transparent border border-secondary px-2 py-1 rounded"
                placeholder="Patient Name"
              />
            </div>
            <div className="flex gap-2 justify-between items-center mt-2">
              <h1 className="font-medium text-lg ">2. Address:</h1>
              <textarea
                className="bg-transparent border border-secondary px-2 py-1 rounded"
                placeholder="Address"
              />
            </div>
          </div>

          {/* For date & time */}
          <div className="mt-3">
            <h1 className="text-lg gap-2 flex font-semibold text-center items-center px-4 sm:px-0">
              3. Select Date & Time
              <Icon
                icon="tabler:chevron-down"
                color="black"
                className="text-3xl cursor-pointer"
                onClick={showDateAndTime}
              />
            </h1>
            {/* Date and Time Container */}
            <div className={` ${visible ? "md:flex" : "hidden"}`}>
              {/* Date Container */}
              <div className="mx-4 mt-4">
                <Calendar
                  onChange={onChange}
                  value={value}
                  minDate={new Date()}
                />
              </div>
              {/* Time Container */}
              <div className="mx-4 my-4">
                <h1 className="font-bold text-lg">Time</h1>
                <div className="flex gap-3 mt-2 flex-wrap xl:w-[90%]">
                  {timingArr}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid with 2 columns */}
        <div className="lgGrid:grid lgGrid:grid-cols-[75%_25%] 2xl:w-[90%]">
          {/* Left Side */}
          <div className="md:mt-8 lgGrid:mt-4">
            <IndividualSelectedTest filteredTests={response.test} />
          </div>
          {/* End of Left Side */}
          {/* Right Side */}
          <div>
            {/* about Lab */}
            <div className="border-[1px] rounded border-borderGray mt-4 mx-2 sm:w-1/2 sm:mx-auto lgGrid:w-full">
              <div className="p-3">
                <h1 className="font-medium text-lg">
                  {response.labDetails.labName}
                </h1>
                <div className="space-y-1 mt-2">
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon={"bxs:certification"}
                      color={"#E97F0E"}
                      className="text-lg"
                    />
                    <h3>Certified by NABL</h3>
                  </div>
                  {/* <div className="flex gap-1 items-center">
                    <Icon
                      icon={"material-symbols:group"}
                      color={"#E97F0E"}
                      className="text-lg"
                    />
                    <h3>15 booked this week</h3>
                  </div> */}
                </div>
              </div>
              {/* <div className="border-t border-borderGray">
                <div className="flex items-center justify-between px-3 py-1">
                  <h2 className="text-lg">About Lab</h2>
                  <Icon
                    icon="tabler:chevron-down"
                    color="black"
                    className="text-3xl"
                  />
                </div>
              </div> */}
            </div>
            {/* end about lab*/}

            {/* selected date time */}
            <div className="mx-3 mt-3 sm:text-center lgGrid:text-left">
              <h2 className="text-lg font-medium">Selected Date & Time</h2>
              <h3 className="">Date: {value.toLocaleDateString()}</h3>
              <h3>Time: {appoint}</h3>
            </div>
            {/* end selected date time */}

            {/* Booking Summary */}
            <div className="mt-4 sm:w-3/4 md:w-3/5 lg:w-1/2 sm:mx-auto lgGrid:w-full">
              <h1 className="text-center font-bold text-xl">Booking Summary</h1>
              <div className="border-[1px] border-borderGray px-3 py-4 space-y-1 rounded mt-3 mx-2  ">
                {/* Test prices div */}
                {tests.map((test) => {
                  return (
                    <div className="flex gap-1 justify-between">
                      <h1 className="font-medium">{test}</h1>
                      <h1>{test.price}</h1>
                    </div>
                  )
                })}
                {/* Test Prices Div end */}

                {/* Discount div */}
                <div className="border-t border-b border-borderGray py-3 space-y-2">
                  <div className="flex gap-1 justify-between">
                    <h1 className="font-semibold text-lg">Total MRP</h1>
                    <h1 className="font-medium text-lg">
                      ₹
                      {response.test.map((entry) => (
                        <span key={entry._id}>{entry.price}</span>
                      ))}
                    </h1>
                  </div>
                  <div className="flex gap-1 justify-between">
                    <h1 className="font-medium text-base">Discount (20%)</h1>
                    <h1 className="font-medium text-base">₹180</h1>
                  </div>
                  <div className="flex gap-1 justify-between">
                    <input
                      type="text"
                      placeholder="Apply Coupon"
                      className="font-medium text-base border-[1px] rounded border-borderGray placeholder:font-light px-1"
                    />
                    <button className="font-medium text-base bg-primary text-white px-2 rounded">
                      Apply
                    </button>
                  </div>
                </div>
                {/* Discount div end */}

                {/* Total Price */}
                <div className="pt-2">
                  <div className="flex gap-1 justify-between">
                    <h1 className="font-semibold text-lg">Total Amount</h1>
                    <h1 className="font-medium text-lg">₹720</h1>
                  </div>
                </div>
                {/* Total Price END */}
              </div>
              {/* <Link to="/booking"> */}
              <div className="flex justify-center mx-3 my-4">
                <button
                  className="bg-secondary text-white font-medium text-xl px-2 rounded-lg py-1 w-full"
                  onClick={openModal}
                >
                  Continue
                </button>
                <ReactModal
                  isOpen={modalIsOpen}
                  style={customStyles}
                  ariaHideApp={false}
                >
                  <LoginPopup
                    closeModal={closeModal}
                    whereToNavigate="/booking"
                    type="user"
                  />
                </ReactModal>
              </div>
              {/* </Link> */}
            </div>
            {/* End Booking Summary */}

            {/* End of Right Side */}
          </div>

          {/* End of Grid */}
        </div>

        {/* End of Whole Container . Add all things before this */}
      </div>

      <Footer />
    </div>
  )
}
