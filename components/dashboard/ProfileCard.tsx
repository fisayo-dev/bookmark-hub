import {ReactNode} from "react";

const ProfileCard = ({children, className = ''}: {children: ReactNode; className?: string;}) => {
    return (
        <div className={`profile-card ${className}`}>
            {children}
        </div>
    )
}
export default ProfileCard
