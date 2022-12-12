import { addDoc, updateDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
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

  const docRef = await addDoc(userCollectionRef, {
    email: auth.currentUser?.email,
    username: username,
    uid: auth.currentUser?.uid,
    createdAt: new Date().toLocaleDateString('en-US', {
      minute: '2-digit',
      hour: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    favoriteMovies: [],
  })

  await updateDoc(docRef, {
    docId: docRef.id,
  })
}

export const handleSignInUserWithEmailAndPassword = async ({ email, password }: LoginInfoProps) => {
  await signInWithEmailAndPassword(auth, email, password)
}
