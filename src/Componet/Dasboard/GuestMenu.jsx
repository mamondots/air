import { NavLink } from 'react-router-dom'
import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Providers/AuthProviders'
import { becomeHost } from '../../API/Auth'
import HostModal from '../Modal/HostRequestModal'
const GuestMenu = () => {
  const {role,user,setRole} = useContext(AuthContext)
  const [model, setModel] = useState(false)

  const modalHandler = email =>{
    becomeHost(email)
    .then(data =>{
      console.log(data)
      setRole('host')
      closeModal()
    })
  }
  const closeModal = () =>{
    setModel(false)
  }
  return (

    <>
      <NavLink
        to='my-bookings'
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
          }`
        }
      >
        <BsFingerprint className='w-5 h-5' />

        <span className='mx-4 font-medium'>My Bookings</span>
      </NavLink>

      {
        !role &&
        <div onClick={() =>setModel(true) } className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </div>
      }
      <HostModal
       isOpen={model} modalHandler ={modalHandler} email={user?.email} closeModal ={closeModal }></HostModal>
    </>
  )
}

export default GuestMenu