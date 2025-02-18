const page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <div>Bookmark Is id {id} </div>   
    )
}


export default page