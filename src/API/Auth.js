//save data into database

export const saveUser = user =>{
    const currentUser ={
        email: user.email
    }

    fetch(`https://air-server-side.vercel.app/users/${user?.email}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


//became host 

export const becomeHost = email =>{
    const currentUser ={
        role:'host'
    }

   return fetch(`https://air-server-side.vercel.app/users/${email}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    
}

//get role
export const getRole = async email =>{
    const res = await fetch(`https://air-server-side.vercel.app/users/${email}`)
    const user = await res.json()
    return user?.role
}