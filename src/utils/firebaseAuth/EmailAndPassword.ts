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

type LoginInfoProps = Omit<RegisterInfosProps, 'username'>

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
    createdAt: new Date().toLocaleDateString('en-US', {
      minute: '2-digit',
      hour: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  })
}

export const handleSignInUserWithEmailAndPassword = async ({ email, password }: LoginInfoProps) => {
  await signInWithEmailAndPassword(auth, email, password)
}
