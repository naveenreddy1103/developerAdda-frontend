import { useDispatch, useSelector } from "react-redux"
import { api } from '../utils/constants'
import { addRequests,removeRequests } from "../utils/requestSlice"
import { useEffect } from "react"
import Cookies from "js-cookie"


export const Requests = () => {
    const requestDate = useSelector(store => store.requests)
    const dispatch = useDispatch()

    const handleRequest=async(status,id)=>{
        try{
            const response=await fetch(`${api}/request/review/${status}/${id}`,{
                method:"POST",
                headers:{
                    'token':Cookies.get('token')
                },
                credentials:"include"
            })
            dispatch(removeRequests(id))
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchRequests = async () => {
        try {
            const response = await fetch(`${api}/user/request/received`, {
                method: "GET",
                headers: {
                    'token': Cookies.get('token')
                },
                credentials: "include"
            })
            const data = await response.json()
            if (response.ok) {
                dispatch(addRequests(data.message))
            }
            else {

            }
        }
        catch (err) {
            console.log(err.message)
        }

    }
    useEffect(() => {
        fetchRequests()
    }, [])
    return (
        <div>
            {requestDate && (

                requestDate.map((conn, i) => {
                    const {_id,profile,firstName,gender,about}=conn.fromUserId
                    return (
                        <div key={_id} className="flex justify-center mx-6 my-4">
                            <div className="card h-74 w-64 bg-base-300 shadow-sm flex flex-col items-center">
                                <figure className="p-4 flex justify-center mt-2">
                                    <div className="w-28 h-28 overflow-hidden border-2 border-gray-200">
                                        <img
                                            src={profile}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </figure>

                                <div className="card-body p-4">
                                    <h2 className="card-title justify-center">
                                        {firstName}
                                        <div className=" badge badge-secondary">{gender }</div>
                                    </h2>
                                    <p className="text-center text-sm">{
                                        // about.length > 60 ? about.slice(0, 60) + "..." : (about)
                                        about ? (about.length > 60 ? about.slice(0,60)+"...":about):"No description available"
                                        }</p>
                                    <div className="card-actions justify-center mt-2">
                                        <button className="badge badge-outline bg-success p-4 btn" 
                                         onClick={()=>handleRequest("accepted",conn._id)} >Accept</button>
                                        <button className="badge badge-outline bg-secondary p-4 btn"
                                         onClick={()=>handleRequest("rejected",conn._id)}
                                        >Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                )
            )}
        </div>)
} 