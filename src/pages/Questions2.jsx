import React from 'react'
import { useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Questions2() {
  const [localDb, setlocalDb] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, 'questions1')
        const qSnap = await getDocs(questionsRef)

        const localQa = []
        qSnap.forEach((doc) => {
          return localQa.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setlocalDb(localQa)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error("Couldn't fetch listings")
      }
    }
    fetchQuestions()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return <div>Questions2</div>
}

export default Questions2
