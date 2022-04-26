import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase.config'
import {
  updateDoc,
  doc,
  collection,
  query,
  getDocs,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
// import ListingItem from '../components/ListingItem'
function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  function onLogOut() {
    auth.signOut()
    navigate('/')
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('try again')
    }
  }

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  // const onDelete = async (listingId) => {
  //   if (window.confirm('are you shure you want to delete?')) {
  //     await deleteDoc(doc(db, 'listings', listingId))
  //   }
  // }
  return (
    <div className='app'>
      <header className='profileHeader'>
        <p className='pageHeader'>My profile</p>
        <button type='button' className='logOut' onClick={onLogOut}>
          log out
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prev) => !prev)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        {/* <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </ul>
          </>
        )} */}
      </main>
    </div>
  )
}

export default Profile
