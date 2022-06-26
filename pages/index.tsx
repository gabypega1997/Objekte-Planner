import react from 'react';
import type { NextPage } from 'next'
import { resolve } from 'path'
import styles from '../styles/Home.module.css';
import { promises } from 'stream';
import {Objekte} from '../utils/localization.json';
import { useState } from 'react';

// Import Component
import Start from '../components/Home/Start';
import { ST } from 'next/dist/shared/lib/utils';
import Xlsx from '../components/Home/Xlsx';






const Home: NextPage = () => {

  // current week function

  const currentdate:any = new Date();
  const oneJan:any = new Date(currentdate.getFullYear(),0,1);
  const numberOfDays:any = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  const result:string = Math.ceil( numberOfDays / 7) + "";

  const getKeyByValue = (object:any, value:any) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  // states

  const [week, setWeek] = useState(result);


// loop throw the Objekts
  const ort = Objekte.filter((Objekt) => {
    return Object.values(Objekt).includes(week) ? Objekt : null; 
  });

  // change week number 
  const changeWeekNumber = (e:any) => {
    setWeek(e.target.value);
  }

  //button to set that object was worked and i add a "F" to the week to know that was finished

  const workedObjekt = (Objekt:any) => {
    console.log(getKeyByValue(Objekt,week));
    console.log(Objekte[0].P1)
    
  }

  return (
    <div className={styles.container}>
      <label>CurrentWeek: {week}</label>
      <input type='number' placeholder={week} onChange={changeWeekNumber}/>

      {ort.map((Objekt) => {
        return <div key={Objekt.WirtEinh}>
                  <p >{Objekt.Ort} {Objekt.PLZ} {Objekt.Straße}</p>
                  <button onClick={() => workedObjekt(Objekt)}>Gemacht</button>
                </div>
      })}
      <Start/>
      <Xlsx></Xlsx>

    </div>
  )
}

export default Home
