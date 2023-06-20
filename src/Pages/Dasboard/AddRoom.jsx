import { useState } from "react";
import AddRoomForm from "../../Componet/Forms/AddRoomForm";
import { imageUpload } from "../../API/ImageUpload";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { addRooms } from "../../API/rooms";


const AddRoom = () => {
    const {user} = useContext(AuthContext)
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
    const [loading,setLoading] = useState(false)
    const [ uploadButtonText,setUploadButtonText] = useState('Upload Image')
    const handleSubmit = (event) =>{
        event.preventDefault()
        setLoading(true)
        const location = event.target.location.value
        const category = event.target.category.value
        const title = event.target.title.value
        const from = dates.startDate
        const to = dates.endDate
        const price = event.target.price.value
        const total_guest = event.target.total_guest.value
        const bedrooms = event.target.bedrooms.value
        const bathrooms = event.target.bathrooms.value
        const description = event.target.description.value
        const image = event.target.image.files[0]
        //upload image
        imageUpload(image)
        .then(data => {
            const roomData ={
                location,
                category,
                title,
                from,
                to,
                total_guest,
                bedrooms,
                bathrooms,
                description,
                price:parseFloat(price),
                image: data.data.display_url,
                host:{
                    name:user?.displayName,
                    image:user?.photoURL,
                    email:user?.email,
                },

               

            }

            //post roomdata

            addRooms(roomData)
            .then(data => console.log(data))
            .catch(err => console.log(err))


            
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
        
    }

    const handleImageChange = image =>{
        setUploadButtonText(image.name)
    }

    const handleDates = ranges =>{
        
        setDates(ranges.selection)
    }

    return (
        <div>
            <AddRoomForm handleSubmit ={handleSubmit} loading ={loading} handleImageChange ={handleImageChange} uploadButtonText={uploadButtonText} dates ={dates} handleDates ={handleDates}></AddRoomForm>
        </div>
    );
};

export default AddRoom;