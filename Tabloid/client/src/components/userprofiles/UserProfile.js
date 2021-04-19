import React, { useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"

// import "./User.css"


export const UserProfile = ({userProfile}) => {

  return (
    <section className="userProfile">
      <div className="user__fullName">{userProfile.fullName}</div>
      <div className="user__displayName">{userProfile.displayName}</div>
      <div className="user__userType">{userProfile.userType.Name}</div>
    </section>
  )
}