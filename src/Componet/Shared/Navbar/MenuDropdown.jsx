import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useContext, useState } from 'react'

import { Link } from 'react-router-dom'

import HostModal from '../../Modal/HostRequestModal'
import { becomeHost } from '../../../API/Auth'
import { AuthContext } from '../../../Providers/AuthProviders'


const MenuDropdown = () => {
  const { user, logOut,  role, setRole,} = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  //const toggleOpen = useCallback(() => {
  // setIsOpen(value => !value)
  // }, [])

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
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        {/* Aircnc btn */}
        <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
          {
            !role && (
              <button disabled ={!user} onClick={() => setModel(true)} className='cursor-pointer'>AirCNC your home</button>
            )
          }
        </div>
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
              to='/'
              className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
            >
              Home
            </Link>
            {user ? (
              <>

                <Link
                  to='/dasboard'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Dasbord
                </Link>

                <div
                  onClick={() =>{
                    setRole(null)
                    logOut()
                  }
                    
                  }
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                >
                  Logout
                </div>

              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Login
                </Link>
                <Link
                  to='/singup'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <HostModal isOpen={model} modalHandler ={modalHandler} email={user?.email} closeModal ={closeModal }></HostModal>
    </div>
  )
}

export default MenuDropdown