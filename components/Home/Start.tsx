import { firestore, initializeApp } from 'firebase-admin';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React from 'react'
import { useState,useEffect } from 'react';
import { db } from '../../utils/firebase';

// Firestore connection


const Start = () => {
  
  //States for object import 
  const [objects,setObjects] = useState(Array);
  const [finishedObjects, setFinishedObjects] = useState(Array);

  // View State for buttons
  const [weekOrPeriod, setWeekOrPeriod] = useState("week");
  const [inWorkOrFinished, setInWorkOrFinished] = useState("inwork")


  
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
      setFinishedObjects(querySnapshot.docs.map(doc => ({ ...doc.data(),id: doc.id})))
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
    const [period, setPeriod] = useState('P1')
  
  
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
      const docRef = await addDoc(collectionRef, {idObj:id, time, week});

      console.log(`Object with ${object.Ort} is added successfuly! `);


      
    }

// Finished objects delete

  const  deleteFinishedObject = async (id:string)=> {
    console.log(id);
    const docRef = doc(db, 'FinishedObjects',id);
    await deleteDoc(docRef);
  }


//View buttons functions ==>
  // WeeekPeriod View function
  const weekOrPeriodView = () =>{
        weekOrPeriod === "week" ? setWeekOrPeriod("period") : setWeekOrPeriod('week');
    }
  // Inwork or finished objects
  const inWorkOrFinishedView = () => {
      inWorkOrFinished === "inwork"? setInWorkOrFinished('finished'): setInWorkOrFinished('inwork');
  }


  // Function to return week or period objects 

  const objectsWeekOrPeriod = (type:string,value:string) => {
    const objectsReturned = objects.filter((object:any) => {
      let booleanFinObj:boolean = true;
      finishedObjects.forEach((finobject:any) => {
        if(Object.values(finobject).includes(object.id)){
          booleanFinObj = false;
        }
      }
      );
      return  booleanFinObj ? type === 'week' ? 
          Object.values(object).includes(Number(value)) ? object : null 
          :
          Object.keys(object).includes(value) ? object : null 
        : null;
      
    });

    return objectsReturned
  }


  //Function for periods

  const counterPeriodsAndWeek = (type:string) => {
        let responseArray = [];
        if(type === 'week'){
          for(let i = 14 ; i <= 48; i++ ){
            responseArray.push(i);
          }
    } else if(type === 'period'){
      for(let i = 1; i <= 7; i++){
        responseArray.push(i);
      }
    }

    return responseArray;
  }



  // Function to read weeks and periods from buttons

  const changeWeeksOrPeriods = (type:string,val:any) => {
    type === 'week' ? setWeek(val) : setPeriod("P"+ val);
  }

  return (

    <div>


      <button onClick={weekOrPeriodView}>{weekOrPeriod === 'week' ? "Period": "Week" }</button>
     
     
      {weekOrPeriod === 'week' ? 
      <div>
        <label>CurrentWeek: {week} </label>
      </div>
      
      :
        <div>
          <label>Current Period: {period}</label>                
        </div>
    }
    {
    counterPeriodsAndWeek(weekOrPeriod).map((val) => <button key={val} onClick = {() => {changeWeeksOrPeriods(weekOrPeriod, val)}}>{val}</button>)
    }
      

      

{/* Hier we have objects */}

{inWorkOrFinished === 'inwork' ? <h1>in Arbeit</h1> : <h1>Gemachte</h1> }
{inWorkOrFinished === 'inwork' ? <button onClick={inWorkOrFinishedView}>Gemachte</button> : <button onClick={inWorkOrFinishedView}>in Arbeit</button> }
        {
          inWorkOrFinished === "inwork"? 
        // objectsWeek.map((object:any) => {
        //   // console.log(Object.values(object).includes(15))
        //     return (
        //     <div key={object.id}>
        //       <p >{object.Ort}</p>
        //       <button onClick={() => workedObjekt(object)}>Gemacht</button>
        //     </div>
            
        //     )
          
          
        // })

          objectsWeekOrPeriod(weekOrPeriod,weekOrPeriod === 'week' ? week : period ).map((object:any) => (
            <div key={object.id}>
              <p>{object.Ort}</p>
              <button onClick={() => workedObjekt(object)}>Gemacht</button>
    
            </div>
            ))
          
        :
          
          finishedObjects.map((object:any) => {
            return (
            <div key={object.idObj}>

              {objects.map((objecte:any) => {
                return Object.values(objecte).includes(object.idObj) ? <p key={object.id}>{objecte.Ort}</p>: null
              })}

              <button onClick={()=>{deleteFinishedObject(object.id)}}>Nichtgemacht</button>
            </div>
            )
          })
                
      }

      {/* Period Search */}
      {/* {
        objectsWeekOrPeriod(weekOrPeriod,weekOrPeriod === 'week' ? week : period ).map((object:any) => (
        <div key={object.id}>
          <p>{object.Ort}</p>
          <button onClick={() => workedObjekt(object)}>Gemacht</button>

        </div>
        ))
      } */}
      
    </div>
  )
}

export default Start