import { collection } from 'firebase/firestore'
import { db } from '@services/firebase'

export const userCollectionRef = collection(db, 'users')
