import { useDispatch, useSelector } from "react-redux"
import { api } from "../utils/constants"
import Cookies from "js-cookie"
import {addFeed} from "../utils/feedSlice"
import { useEffect, useState } from "react"
import { UserCard } from "./UserCard"


export const Feed=()=>{
     const feedData=useSelector(store=>store.feed)
    const dispatch=useDispatch()
    const [error,setError]=useState("")
   
    const fetchFeed=async()=>{
         if(feedData) return 
        try{
            const response=await fetch(`${api}/feed`,{
            method:"GET",
            headers:{
                'token':Cookies.get('token')
            },
            credentials:"include"
        })
        const data=await response.json()
        if(response.ok){
           dispatch(addFeed(data.message))
        }
        else{
            setError(data?.message)
        }
        }
        catch(error){
            console.log(error.message)
        }
        
    }
    useEffect(()=>{
            fetchFeed()
        },[])
    return(<>
    {feedData && <UserCard user={feedData[0]} />}
    </>)
}

