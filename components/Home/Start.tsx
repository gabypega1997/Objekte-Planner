import { firestore, initializeApp } from 'firebase-admin';
import { addDoc, collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React from 'react'
import { useState,useEffect } from 'react';
import { db } from '../../utils/firebase';

// Firestore connection


const Start = () => {
  
  //States for object import 
  const [objects,setObjects] = useState(Array);
  const [finishedObjects, setFinishedObjects] = useState(Array);
  
  // read firebase conlection Objescts
  useEffect(()=>{
    const collectionRefObj = collection(db,'Objects');
    
    const qObj = query(collectionRefObj, orderBy("PLZ"));

    const dataObj = onSnapshot(qObj, (querySnapshot)=> {
      setObjects(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });


    
    const collectionRefFin = collection(db,'FinishedObjects');

    const qFinObj = query(collectionRefFin, orderBy("time"));

    const dataFinObj = onSnapshot(qFinObj,(querySnapshot) => {
      setFinishedObjects(querySnapshot.docs.map(doc => ({ ...doc.data()})))
    });
    
    return dataFinObj;
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
      let booleanFinObj:boolean = true;
      finishedObjects.forEach((finobject:any) => {
        if(Object.values(finobject).includes(object.id)){
          booleanFinObj = false;
        }
      }
      );
      return Object.values(object).includes(Number(week)) && booleanFinObj ? object : null; 
    });

  
    // change week number 
    
    const changeWeekNumber = (e:any) => {
      setWeek(e.target.value);
    }
  
    //button to set a list of finished places

    // state finished





// finished Object function
    const  workedObjekt = async (object:any) => {
      const {id} = object;
      // console.log(id, week, currentdate.toLocaleDateString())
      const time = currentdate.toLocaleDateString();
      // setFinishedObjects({id, week, time});

      const collectionRef = collection(db,"FinishedObjects");
      const docRef = await addDoc(collectionRef, {id, time, week});

      console.log(`Object with ${object.Ort} is added successfuly! `);


      
    }

//finished object function to give all 



console.log(finishedObjects);


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


        <h1>Finished Objects </h1>
        {
          finishedObjects.map((object:any) => {
            return (
            <div key={object.id}>
              <p>{object.id}</p>
            </div>)
          })
        }
    </div>
  )
}

export default Start