//save booking

export const addBooking = async bookingData =>{
    const res = await fetch('https://air-server-side.vercel.app/bookings',{
        method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(bookingData)
    })
    const data = await res.json()
    return data
}

//update room status

export const updateStatus = async( id,status )=>{
    const res = await fetch(`https://air-server-side.vercel.app/rooms/status/${id}`,{
        method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status})
    })
    const data = await res.json()
    return data
}

//get all booking for a user by email

export const getBooking = async email =>{
    const res = await fetch(`https://air-server-side.vercel.app/bookings?email=${email}`)
    const bookings = await res.json()
    return bookings
}

//get all booking for a user by host

export const getHostBooking = async email =>{
    const res = await fetch(`https://air-server-side.vercel.app/bookings/host?email=${email}`)
    const bookings = await res.json()
    return bookings
}

// delete  booking by id

export const deleteBooking = async id =>{
    const res = await fetch(`https://air-server-side.vercel.app/bookings/${id}`,{
        method:'DELETE',
            headers:{
                'content-type':'application/json'
            },
            
    })
    const data = await res.json()
    return data
}

