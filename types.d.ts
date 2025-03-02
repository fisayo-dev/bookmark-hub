interface AuthCredentials {
    email: string;
    password: string;
    profile_image_url?: string;
    fullName: string;
}


type SignupFormData = {
    fullName: string;
    email: string;
    password: string;
}
