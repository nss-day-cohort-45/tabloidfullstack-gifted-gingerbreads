import React, { useContext } from "react"
import { UserProfileContext } from "../../providers/UserProfileProvider"
import { Link } from "react-router-dom"

// import "./User.css"


export const UserProfile = ({userProfile}) => {

  return (
    <section className="userProfile">
      <h3 className="userProfileTitle">
        <Link to={`/userProfiles/detail/${userProfile.id}`}>
          { userProfile.displayName}
        </Link>
      </h3>
    </section>
  )
}