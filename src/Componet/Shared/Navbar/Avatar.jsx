import { useContext } from 'react';
import AvaterImg from '../../../assets/images/userImg.jpg'
import { AuthContext } from '../../../Providers/AuthProviders';

const Avatar = () => {
    const {user} = useContext(AuthContext)
    return (
        <img 
        className='rounded-full' 
        referrerPolicy='no-referrer'
        src={user && user.photoURL ? user.photoURL : AvaterImg} 
        alt="profile" 
        width='30' 
        height='30' 
        />
    );
};

export default Avatar;