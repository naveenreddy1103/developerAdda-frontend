import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { api } from "../utils/constants"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"



export const Body=()=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userData=useSelector(store=>store.user)
  const token=Cookies.get('token')

  const fetchUser=async()=>{
    try{
      const response=await fetch(`${api}/profile/view`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          'token':Cookies.get('token')
        },
        credentials:"include"
      })
      if(!response.ok){
        navigate('/login')
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data= await response.json()
      if(data){
        dispatch(addUser(data))
      }
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    if( token){
      fetchUser()
    }
    else{
      navigate('/login')
    }
  },[token])

    return(
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
    )
}