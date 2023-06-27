import React, { useEffect, useState } from 'react'
import { account } from '../appwrite/appwriteConfig'
import { useNavigate, Link} from 'react-router-dom'
import TodoForm from './TodoForm'
import Todos from './Todos'
import '../Apps.css'
import Thapa from './extra'


function Profile() {
    const navigate = useNavigate()
     const [userDetails, setUserDetails] = useState()

     useEffect(()=>{
        const getData = account.get()
        getData.then(
            function(response){
                setUserDetails(response)
                // console.log(userDetails)
            },
            function(error){
                console.log(error);
            }
        )
     }, [])

    const handleLogout = async () => {
         try {
        await account.deleteSession("current")
        navigate("/");
     } catch (error) {
        console.log(error);
     }
    }

  return (
    <>
    { userDetails ? (
          <>
          <nav>
          <div className="min-h-min max-w-7xL mx-auto shadow-md">
            <div>
                <h1 className="ml-12 md:ml-4 sm:ml-0 text-2xl py-3 font-medium text-white uppercase ">Hello {userDetails.name}</h1>
            </div>
            <div>
            <button className="block uppercase mx-auto shadow bg-blue-800 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
                     onClick={handleLogout}
                     >Logout</button>
            </div>
          </div>
          </nav>
        
          <TodoForm />
          <Todos/>
          </>
    ) : (
        <p className='mt-4'>
            Please login to get your profile{" "}
            <Link to="/">
                <span className="bg-blue-300 p-2 cursor-pointer text-white">
                    Login
                </span>
            </Link>
        </p>
    )
    }
    </>
  )
}

export default Profile
