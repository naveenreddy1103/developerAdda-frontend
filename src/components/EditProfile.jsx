import { useState } from "react"
import { UserCard } from "./UserCard"
import { api } from "../utils/constants"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"


export const Editform = ({ user }) => {

  const [firstName, setFirstName] = useState(user.firstName || "")
  const [lastName, setLastName] = useState(user.lastName || "")
  const [profile, setProfileUrl] = useState(user.profile || "")
  const [age, setAge] = useState(user.age || 0)
  const [gender, setGender] = useState(user.gender || "")
  const [about, setAbout] = useState(user.about || "")
  const [error, setError] = useState("")
  const [successToast, setSuccessToast] = useState(false)
  const dispatch = useDispatch()

  async function saveProfile(e) {
    e.preventDefault()
    // clear error
    setError("")
    try {
      const response = await fetch(`${api}/profile/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': Cookies.get('token')
        },
        body: JSON.stringify({
          firstName, lastName, profile, age, gender, about
        }),
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok) {
        dispatch(addUser(data))
        setSuccessToast(true)
        setTimeout(() => {
          setSuccessToast(false)
        }, 4000)
      }
      else {
        setError(data.message)
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <div style={{ marginTop: "20px", marginBottom: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 me-4">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Edit profile</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={saveProfile} className="space-y-6">

              {/* firstName */}
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">
                  FirstName
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}

                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* lastName */}
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}

                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">
                  Profile
                </label>
                <div className="mt-2">
                  <input
                    id="profile"
                    name="profile"
                    type="text"
                    value={profile}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">
                  Gender
                </label>

                <select
                  className="select select-info mt-1"
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>

              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-100">
                  About
                </label>
                <textarea className="textarea" placeholder="Bio"
                  id="about"
                  name="about"
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="age" className="block text-sm/6 font-medium text-gray-100">
                    Age
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <p style={{ color: "red" }}>{error}</p>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save Profile
                </button>
              </div>
            </form>


          </div>
        </div>
        <div>
          <UserCard user={{ firstName, lastName, profile, age, gender, about }} />
        </div>
      </div>
      {successToast &&
        <div className="toast toast-top toast-center">

          <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
          </div>
        </div>
      }
    </div>
  )
}