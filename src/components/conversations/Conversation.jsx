import React, { useEffect, useState } from 'react'
import "./conversation.css"
import axios from 'axios'

function Conversation({friendId,currentUser}) {
  const [user,setUser]=useState(null)
  const backendUrl=process.env.REACT_APP_BACKEND_URL
  

  useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await axios.get(backendUrl+"users?userId="+friendId)

        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[currentUser])
  
  return (
    <div className='conversation'>
        <img className='conversationImg'
        crossOrigin='anonymous' src={user?._id?backendUrl+`users/image/download/`+user?._id:""} alt="" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation



// import React, { useEffect, useState } from 'react'
// import "./conversation.css"
// import axios from 'axios'

// function Conversation({conversation,currentUser}) {
//   const [user,setUser]=useState(null)
//   const backendUrl=process.env.REACT_APP_BACKEND_URL
  

//   useEffect(()=>{
//     const friendId=conversation.member.find((m)=>m!=currentUser._id)
//     const getUser=async()=>{
//       try {
//         const res=await axios.get(backendUrl+"users?userId="+friendId)

//         setUser(res.data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getUser()
//   },[currentUser,conversation])
  
//   return (
//     <div className='conversation'>
//         <img className='conversationImg'
//         crossOrigin='anonymous' src={user?._id?backendUrl+`users/image/download/`+user?._id:""} alt="" />
//         <span className="conversationName">{user?.username}</span>
//     </div>
//   )
// }

// export default Conversation