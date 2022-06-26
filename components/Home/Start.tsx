import { firestore } from 'firebase-admin';
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React from 'react'
import { useState,useEffect } from 'react';
import { db } from '../../utils/firebase';

// Firestore connection


const Start = () => {
  const [objects,setObjects] = useState({});
  useEffect(()=>{
    const collectionRef = collection(db,'Object');
    
    const q = query(collectionRef, orderBy("Ort"));

    const data = onSnapshot(q, (querySnapshot)=> {
      console.log(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    return data;
  },[])

  return (
    <div>Start</div>
  )
}

export default Start