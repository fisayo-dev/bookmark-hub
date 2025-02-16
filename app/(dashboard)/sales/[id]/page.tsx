const page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <div>Sales id is: {id}</div>

    )
}

export default page