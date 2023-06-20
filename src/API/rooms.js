//add room
export const addRooms = async roomData =>{
    const res = await fetch('https://air-server-side.vercel.app/rooms',{
        method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(roomData)
    })
    const data = await res.json()
    return data
}

//get all data

export const getAllRooms = async roomData =>{
    const res = await fetch('https://air-server-side.vercel.app/rooms')
    const data = await res.json()
    return data
}

//get filter room by host
export const getRooms = async email =>{
    const res = await fetch(`https://air-server-side.vercel.app/rooms/${email}`,{
        headers:{
            authorization:`Bearer ${localStorage.getItem('access-token')}`
        },
    })
    const data = await res.json()
    return data
}


//get single room
export const getRoom = async id =>{
    const res = await fetch(`https://air-server-side.vercel.app/room/${id}`)
    const data = await res.json()
    return data
}

//delete a rooms

export const deleteRooms = async id =>{
    const res = await fetch(`https://air-server-side.vercel.app/rooms/${id}`,{
        method:'DELETE',
            headers:{
                'content-type':'application/json'
            },
            
    })
    const data = await res.json()
    return data
}