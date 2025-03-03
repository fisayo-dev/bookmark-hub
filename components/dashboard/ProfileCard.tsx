import {ReactNode} from "react";

const ProfileCard = ({children}: {children: ReactNode}) => {
    return (
        <div className='profile-card'>
            {children}
        </div>
    )
}
export default ProfileCard
