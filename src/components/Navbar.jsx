import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { removeUser } from "../utils/userSlice"

export const Navbar = () => {
  const dispatch=useDispatch()

   const user=useSelector((store)=>store.user)
   const navigate=useNavigate()
  //  console.log(user)
  const logoutClick=()=>{
    Cookies.remove('token')
    dispatch(removeUser())
    navigate('/login')
  }

  return (<>
    <div className="navbar bg-primary shadow-sm ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">🧑‍💻 developer Adda</Link>
      </div>
      <div className="flex gap-2">
        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
        <div>
         {user&& <h2 className="mt-2">{(user?.firstName)?.toUpperCase()}</h2>}
        </div>
        {user&&
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.profile} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link  to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><div onClick={logoutClick}>Logout</div></li>
          </ul>
        </div>}
      </div>
    </div>
  </>)
}