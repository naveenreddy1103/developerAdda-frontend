import { useState } from "react"
import { api } from "../utils/constants"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('Naveen@123')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoginForm, setLoginForm] = useState(true)
    const [error, setError] = useState("")
    const [successToast,setSuccessToast]=useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${api}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailId: emailId, password: password }),
                credentials: 'include'
            })
            const data = await response.json()
            if (response.ok) {

                dispatch(addUser(data))
                Cookies.set('token', data.token)
                setSuccessToast(true)
                 setTimeout(()=>{
                    setSuccessToast(false)
                    navigate('/')
                },2000)
                

            }
            else {
                setError(data?.message || "Something went wrong")
                console.log(data)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    const handleSignUp=async(e)=>{
        e.preventDefault()  // Prevents the default form submission behavior
        console.log({firstName,lastName,emailId,password})
        try{
            const response = await fetch(`${api}/signup`, {
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({firstName,lastName,emailId,password}),
                credentials:"include"
            })
            // const data=await response.json()
            if(response.ok){
                
                setSuccessToast(true)
                setTimeout(()=>{
                    setSuccessToast(false)
                },3000)
                setLoginForm((value)=>!value)
                
            }
            else{
                setError(data?.message||"something went wrong")
                console.log(data)
            }
        }
        catch(err){
            console.log(err.message)
        }
    }
    return (
        <form onSubmit={isLoginForm? handleLogin:handleSignUp} className="flex justify-center">
            <div className="card bg-secondary-content text-primary-content w-96 my-10">
                <div className="card-body">
                    <h2 className="card-title text-neutral">{isLoginForm ? "Login" : "Sign Up"}</h2>

                    {!isLoginForm &&
                        <>
                            {/* First Name */}
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M4 4h16v16H4z" />
                                    </g>
                                </svg>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    required
                                />
                            </label>

                            {/* Last Name */}
                            <label className="input validator mt-2">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M4 4h16v16H4z" />
                                    </g>
                                </svg>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    required
                                />
                            </label>
                        </>
                    }

                    {/* Email field */}
                    <label className="input validator mt-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input
                            type="email"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            placeholder="mail@gmail.com"
                            required
                        />
                    </label>

                    {/* Password field */}
                    <label className="input validator mt-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            minLength={8}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                    </label>

                    <p style={{ color: "red" }}>{error}</p>

                    <div className="card-actions justify-center">
                        <button className="btn" type="submit">{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>

                    {/* // Toggles between Login form and Signup form when the user clicks the switch text. */}
                    <p className="m-auto" style={{color:"black",fontWeight:"bold",cursor:"pointer"}}
                    onClick={()=>setLoginForm((value)=>!value)}>If New User? Exist User Click Here</p>
                </div>
                {successToast &&
        <div className="toast toast-top toast-center">

          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      }
            </div>
        </form>

    )
}