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

type ProgressItems = {
    value: number;
    icon: React.ReactNode;
    text: string;
}

interface Bookmark {
    owner: string,
    id: string,
    name: string,
    image: string,
    url: string,
    starred: boolean;
    onEdit: () => void,
    onDelete: () => void,
    createdAt: Date,
}
