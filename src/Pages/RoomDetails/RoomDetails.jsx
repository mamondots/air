import { useLoaderData } from "react-router-dom";
import Headers from "../../Componet/Rooms/Headers";
import RoomInfo from "../../Componet/Rooms/RoomInfo";
import RoomReservation from "../../Componet/Rooms/RoomReservation";
import Container from "../../Componet/Shared/Container";




const RoomDetails = () => {
    const roomData = useLoaderData()
    
    return (
        <Container>
             <div className="mt-5 max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                  <Headers roomData ={roomData}></Headers>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <RoomInfo roomData ={roomData}></RoomInfo>
                    <div className="mb-10 md:col-span-3 order-first md:order-last">
                    <RoomReservation roomData ={roomData}></RoomReservation>
                    </div>
                    </div>
                </div>
             </div>
        </Container>
    );
};

export default RoomDetails;