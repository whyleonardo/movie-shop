import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { auth } from '@services/firebase'
import { userCollectionRef } from '@utils/firestoreCalls'

interface RegisterInfosProps {
  email: string
  password: string
  username: string
}

export const handleRegisterUserWithEmailAndPassword = async ({
  email,
  password,
  username,
}: RegisterInfosProps) => {
  await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(auth.currentUser, {
    displayName: username,
  })

  await addDoc(userCollectionRef, {
    email: auth.currentUser?.email,
    username: auth.currentUser?.displayName,
    uid: auth.currentUser?.uid,
  })
}

export const handleSignInUserWithEmailAndPassword = async ({
  email,
  password,
}: RegisterInfosProps) => {
  await createUserWithEmailAndPassword(auth, email, password)
}
