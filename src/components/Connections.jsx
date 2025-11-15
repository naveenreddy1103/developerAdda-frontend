import { useDispatch, useSelector } from "react-redux";
import { api } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

/*
  While console logging Redux data (connectionData) immediately after dispatch(addConnections())
  inside fetchConnections, the value may still be undefined or its previous value,
  because dispatch is asynchronous and React will not immediately update the value 
  from useSelector in the same render/frame. If you want to see the updated value in Redux after dispatch, 
  you should use a `useEffect` that listens for changes to `connectionData`:

  useEffect(() => {
    console.log("Updated connectionData from Redux:", connectionData, user);
  }, [connectionData, user]);

*/

export const Connections = () => {
  const connectionData = useSelector(store => store.connections);
  const user = useSelector(store => store.user)
  const [storeData, setStoreData] = useState([])
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await fetch(`${api}/user/connections`, {
        method: "GET",
        headers: {
          "token": Cookies.get("token")
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(addConnections(data.message));
        setStoreData(data.message)
      } else {
        console.error("Failed to fetch connections:", data);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Log connectionData whenever it actually updates!

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      {connectionData && (
        connectionData.map((conn, i) => {
          const { _id, profile, firstName, gender,about } = conn
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
                    <div className="badge badge-secondary">{gender?gender:"Not avaible"}</div>
                  </h2>
                  <p className="text-center text-sm">{
                    about ? (about.length > 60 ? about.slice(0,60)+"...":about):"No description available"
                    }</p>
                  
                </div>
              </div>
            </div>
          )
        }

        )
      )}
    </div>
  );
};
