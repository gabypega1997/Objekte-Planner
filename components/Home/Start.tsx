import { firestore, initializeApp } from 'firebase-admin';
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React from 'react'
import { useState,useEffect } from 'react';
import { db } from '../../utils/firebase';

// Firestore connection


const Start = () => {
  
  //States for object import 
  const [objects,setObjects] = useState(Array);
  
  // read firebase conlection Objescts
  useEffect(()=>{
    const collectionRef = collection(db,'Objects');
    
    const q = query(collectionRef, orderBy("Ort"));

    const data = onSnapshot(q, (querySnapshot)=> {
      setObjects(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    return data;
  },[]);


    // current week function

    const currentdate:any = new Date();
    const oneJan:any = new Date(currentdate.getFullYear(),0,1);
    const numberOfDays:any = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    const result:string= Math.ceil( numberOfDays / 7) + "";
  
    // state week
  
    const [week, setWeek] = useState(result);
  
  
    const getKeyByValue = (object:any, value:any) => {
      return Object.keys(object).find(key => object[key] === value);
    }

  // loop throw the Objekts and chose the right one for the week what i put in

    const objectsWeek = objects.filter((object:any) => {
      return Object.values(object).includes(Number(week)) ? object : null; 
    });

  
    // change week number 
    const changeWeekNumber = (e:any) => {
      setWeek(e.target.value);
    }
  
    //button to set that object was worked and i add a "F" to the week to know that was finished
  
    const  workedObjekt = async (object:any) => {
      console.log(getKeyByValue(object,Number(week))); 
      
      const docRef  = doc(db, 'Objects', object.id);
      
      

      
    }





  return (
    <div>
      <label>CurrentWeek: {week} </label>
      <input type='number' placeholder={week} onChange={changeWeekNumber}/>

        {objectsWeek.map((object:any) => {
          // console.log(Object.values(object).includes(15))
            return (
            <div key={object.id}>
              <p >{object.Ort}</p>
              <button onClick={() => workedObjekt(object)}>Gemacht</button>
            </div>
            
            )
          
          
        })}
    </div>
  )
}

export default Start