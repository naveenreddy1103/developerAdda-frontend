import { useSelector } from "react-redux"
import { Editform } from "./EditProfile"



export const Profile=()=>{
    const user=useSelector(store=>store.user)
    // user is present it execute the jsx
    return(user&&<div>       
        <Editform user={user} />
    </div>)
}