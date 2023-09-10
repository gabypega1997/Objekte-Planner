import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import {
    counterPeriodsAndWeek,
    currentWeek,
    currentDate,
    objectsWeekOrPeriod,
    workedObjekt,
} from "../utils/functions.utils";
import NavbarComponent from "./navbar.component";

// Firestore connection

const Start = () => {
    //States for object import
    const [objects, setObjects] = useState(Array);
    const [finishedObjects, setFinishedObjects] = useState(Array);

    // View State for buttons
    const [weekOrPeriod, setWeekOrPeriod] = useState("week");
    const [inWorkOrFinished, setInWorkOrFinished] = useState("inwork");

    // state week

    const [week, setWeek] = useState(currentWeek());
    const [period, setPeriod] = useState("P1");

    // read firebase conlection Objescts
    useEffect(() => {
        const collectionRefObj = collection(db, "Objects");

        const qObj = query(collectionRefObj, orderBy("PLZ"));

        const dataObj = onSnapshot(qObj, (querySnapshot) => {
            setObjects(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        const collectionRefFin = collection(db, "FinishedObjects");

        const qFinObj = query(collectionRefFin, orderBy("time"));

        const dataFinObj = onSnapshot(qFinObj, (querySnapshot) => {
            setFinishedObjects(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        return dataFinObj;
    }, []);
    console.log(finishedObjects);
    console.log(objects);
    // change week number

    const changeWeekNumber = (e: any) => {
        setWeek(e.target.value);
    };

    // WeeekPeriod View function
    const weekOrPeriodView = () => {
        weekOrPeriod === "week"
            ? setWeekOrPeriod("period")
            : setWeekOrPeriod("week");
    };
    // Inwork or finished objects
    const inWorkOrFinishedView = () => {
        inWorkOrFinished === "inwork"
            ? setInWorkOrFinished("finished")
            : setInWorkOrFinished("inwork");
    };

    // Function to read weeks and periods from buttons

    const changeWeeksOrPeriods = (type: string, val: any) => {
        type === "week" ? setWeek(val) : setPeriod("P" + val);
    };

    return (
        <div>
            <NavbarComponent />

            {weekOrPeriod === "week" ? (
                <div key={week}>
                    <button disabled> Woche</button>
                    <button onClick={weekOrPeriodView}>Period</button>
                </div>
            ) : (
                <div>
                    <button onClick={weekOrPeriodView}> Woche</button>
                    <button disabled>Period</button>
                </div>
            )}
            {weekOrPeriod === "week" ? (
                <div>
                    <label>CurrentWeek: {week} </label>
                </div>
            ) : (
                <div>
                    <label>Current Period: {period}</label>
                </div>
            )}

            {counterPeriodsAndWeek(weekOrPeriod).map((val) => (
                <button
                    key={val}
                    onClick={() => {
                        changeWeeksOrPeriods(weekOrPeriod, val);
                    }}
                >
                    {val}
                </button>
            ))}

            {/* Hier we have objects */}

            {inWorkOrFinished === "inwork" ? (
                <h1>in Arbeit</h1>
            ) : (
                <h1>Fertig</h1>
            )}
            {inWorkOrFinished === "inwork" ? (
                <button onClick={inWorkOrFinishedView}>Fertig</button>
            ) : (
                <button onClick={inWorkOrFinishedView}>in Arbeit</button>
            )}

            {/* Week Search */}
            {/* {
          inWorkOrFinished === "inwork"? 
        objectsWeek.map((object:any) => {
          console.log(Object.values(object).includes(15))
            return (
            <div key={object.id}>
              <p >{object.Ort}</p>
              <button onClick={() => workedObjekt(object)}>Gemacht</button>
            </div>
            
            )
          
          
        }):

          objectsWeekOrPeriod(weekOrPeriod,weekOrPeriod === 'week' ? week : period ).map((object:any) => (
            <div key={object.id}>
              <p>{object.Ort} {object.Straße}</p>
              <button onClick={() => workedObjekt(object)}>Gemacht</button>
    
            </div>
            ))
          
        :
          
          finishedObjects.map((object:any) => {
            return (
            <div key={object.idObj}>

              {objects.map((objecte:any) => {
                return Object.values(objecte).includes(object.idObj)  ? <p key={object.id}>{objecte.Ort} {objecte.Straße}</p>: null
              })}

              {/* <button onClick={()=>{deleteFinishedObject(object.id)}}>Nichtgemacht</button> */}

            {/* </div> */}
            {/* )
          })
                
      }  */}

            {/* Period Search */}

            {objectsWeekOrPeriod(
                weekOrPeriod,
                weekOrPeriod === "week" ? week : period,
                objects as Object[],
                finishedObjects as Object[]
            ).map((object: any) => (
                <div key={object.id}>
                    <p>{object.Ort}</p>

                    <button
                        onClick={() =>
                            workedObjekt(
                                object,
                                weekOrPeriod,
                                weekOrPeriod === week ? week : period
                            )
                        }
                    >
                        Gemacht
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Start;
