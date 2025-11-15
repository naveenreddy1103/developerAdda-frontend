
import { api } from "../utils/constants"
import { useDispatch } from "react-redux"
import {removeUserFromFeed} from "../utils/feedSlice"
import Cookies from "js-cookie"



export const UserCard = ({user}) => {
      const dispatch=useDispatch()
    const handleRequest=(status,id)=>{
        
       try{
        const response=fetch(`${api}/request/send/${status}/${id}`,{
        method:"POST",
        headers:{
            'token':Cookies.get('token')
        },
        credentials:"include"
       })
       dispatch(removeUserFromFeed(id))
       }
       catch(err){
        console.log(err)
       }
    }

    const {_id,firstName,lastName,profile,age,gender,about}=user || {}
    if(!user){
        return(
            <div className="flex justify-center my-9">
                <h2>No user Data avaible</h2>
            </div>
        )
    }
     return (
        <div key={_id} className="flex justify-center my-9">
            <div className="card bg-base-300 w-90 h-90 shadow-sm flex justify-center">
                <figure>
                    <img
                        src={profile}
                        alt="Profile" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName+" "+lastName}</h2>
                    <p>{age&& gender && age +", "+gender}</p>
                    <p>{about&& about}</p>
                    <div className="card-actions justify-center mx-1">
                        <button className="btn btn-primary"
                          onClick={()=>handleRequest("ignored",_id)}
                        >Ignore</button>
                        <button className="btn btn-secondary"
                        onClick={()=>handleRequest("interested",_id)}
                        >Intersted</button>
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}