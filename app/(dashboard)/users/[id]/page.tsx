"use client"
const page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <div>My user id is: {id}</div>

    )
}

export default page