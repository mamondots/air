import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Providers/AuthProviders"

import RoomDataRow from "./RoomDataRow"
import EmtyStay from "../Shared/EmtyStay"

import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../Hooks/useAxiosSecure"


const MyListings = () => {
  const { user } = useContext(AuthContext)
  const {axiosSecure} = useAxiosSecure()

  //const [rooms, setRooms] = useState([])
  //asiox fetcg

 // const fetchRooms = () => 
 // axiosSecure
 // .get(`/rooms/${user?.email}`)
 // .then(data => {
  //  setRooms(data.data)
  //  console.log(data)
 // })
 // .catch(error => console.log(error))

  // Normar fetcg
  //const fetchRooms = () => getRooms(user?.email).then(data => {
   // setRooms(data)
   // console.log(data)
  //})

  //useEffect(() => {
   // fetchRooms()
  //}, [user])

  //tanstric fetch

  const {data:rooms = [], refetch} = useQuery({ 
    queryKey: ['rooms',user?.email], 
    queryFn: async () =>{
     const res = await axiosSecure.get(`/rooms/${user?.email}`)
     console.log('data from axios',res.data)
     return res.data
    }
  
  })

  return (
    <>
      {
        rooms && Array.isArray(rooms) && rooms.length > 0 ?
          <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
              <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                  <table className='min-w-full leading-normal'>
                    <thead>
                      <tr>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Title
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Location
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Price
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          From
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          To
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Delete
                        </th>
                        <th
                          scope='col'
                          className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                        >
                          Update
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Table Data */}
                      {
                        rooms &&
                        rooms.map(room => <RoomDataRow

                          key={room._id}
                          room={room}
                          refetch={refetch}
                        >


                        </RoomDataRow>)
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> :
          <EmtyStay messags={'No RooM dATA HERE!'} address={'/dasboard/add-room'} label={'Add Room'}></EmtyStay>
      }
    </>
  )
}

export default MyListings