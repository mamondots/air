import Heading from "../Heading/Heading";


const Headers = ({ roomData }) => {

    return (
        <>
            <Heading
                title={roomData.title}
                subtitle={roomData.location}
                
            >
            </Heading>
            <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
                <img className=' object-cover w-full'src={roomData.image} alt="" />
            </div>
        </>
    );
};

export default Headers;