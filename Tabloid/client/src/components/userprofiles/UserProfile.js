import React, { useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"

// import "./User.css"


export const UserProfile = ({userProfile}) => {

  return (
    <section className="userProfile">
      <div class Name="user__fullName">{userProfile.fullName}</div>
      <div class Name="user__displayName">{userProfile.displayName}</div>
      <div class Name="user__userType">{userProfile.userType.Name}</div>
    </section>
  )
}