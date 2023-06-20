import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import { getRole } from '../API/Auth'
import axios from 'axios';

export const AuthContext = createContext('')

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    if(user){
      getRole(user.email)
      .then(data =>setRole(data))
    }
  },[user])

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    localStorage.removeItem('access-token')
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)

      //normal fetch token generate

     //if(currentUser?.email){
      //fetch(`${import.meta.env.VITE_APP_URL}/jwt`,{
        //method:'POST',
       // headers:{
         // 'content-type':'application/json',
       // },
       // body:JSON.stringify({email:currentUser.email})
     // })
     // .then(res =>res.json())
     // .then(data => {
       // localStorage.setItem('access-token',data.token)
       // console.log(data)
      //})
     //}

     //use axios token generate

    if(currentUser){
      axios.post(`${import.meta.env.VITE_APP_URL}/jwt`,{
        email:currentUser?.email,
       }).then(data =>{
        localStorage.setItem('access-token',data.data.token)
        setLoading(false)
      })
    }else{
      localStorage.removeItem('access-token')
        setLoading(false)
    }


      console.log('current user', currentUser)
      //setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    role, 
    setRole,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
