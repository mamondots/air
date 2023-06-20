import { useContext, useState } from 'react';
import Button from '../Button/Button';
import Clander from '../Rooms/Clander'
import { AuthContext } from '../../Providers/AuthProviders';
import BookingModal from '../Modal/BookingModal';
import { formatDistance } from 'date-fns'
import { addBooking, updateStatus } from '../../API/Booking';


const RoomReservation = ({ roomData }) => {
    const { user, role } = useContext(AuthContext)
    const totalPrice = parseFloat(
        formatDistance(new Date(roomData.to), new Date(roomData.from)).split(' ')[0]
    )*roomData.price
   
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () =>{
        setIsOpen(false)
    }

    const [value, setValue] = useState({
        startDate: new Date(roomData?.from),
        endDate: new Date(roomData?.to),
        key:'selection'
    })
    const [bookingInfo, setBookingInfo] = useState({

        guest:{
            name:user.displayName, email:user.email, image:user.photoURL
        },
        host:roomData.host.email,
        location:roomData.location,
        title:roomData.title,
        roomId:roomData._id,
        image:roomData.image,
        price:totalPrice,
        to:value.endDate,
        from:value.startDate
    })
     const handleSelect = (ranges) =>{
        setValue({...value})
     }

     const modalHandler = () =>{
        addBooking(bookingInfo)
        .then(data => {
            updateStatus(roomData._id, true)
            .then(data =>{
                console.log(data)
                
                closeModal()
           })
            .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err)
        })
        console.log(bookingInfo)
     }

    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row gap-1 items-center p-4">
                <div className="text-2xl font-semibold">$ {roomData.price}</div>
                <div className="font-light text-neutral-200">night</div>
            </div>
            <hr />
            <div className='flex justify-center'>
                <Clander value={value} handleSelect={handleSelect}></Clander>
            </div>
            <hr />
            <div className='p-4'>
                <Button onClick={() => setIsOpen(true)} disabled={roomData.host.email === user.email || roomData.booked} 
                label='Reserv'></Button>
            </div>
            <div className='p-4 flex items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>${totalPrice}</div>
            </div>
            <BookingModal isOpen={isOpen} bookingInfo={bookingInfo}  closeModal={closeModal}></BookingModal>
        </div>
    );
};

export default RoomReservation;