import react from 'react';
import type { NextPage } from 'next'
import { resolve } from 'path'
import styles from '../styles/Home.module.css';
import { promises } from 'stream';
import {Objekte} from '../utils/localization.json';
import { useState } from 'react';






const Home: NextPage = () => {

  // current week function

  const currentdate:any = new Date();
  const oneJan:any = new Date(currentdate.getFullYear(),0,1);
  const numberOfDays:any = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  const result:any = Math.ceil( numberOfDays / 7);

// states

  const [week, setWeek] = useState(result);


// loop throw the Objekts
  const ort = Objekte.filter((Objekt) => {
    return Object.values(Objekt).includes(week) ? Objekt : null; 
  });

  console.log(ort)
  return (
    <div className={styles.container}>
      <input type='number'/>

      {ort.map((Objekt) => {
        return <p key={Objekt.WirtEinh}>{Objekt.Ort} {Objekt.PLZ} {Objekt.Straße}</p>
      })}
    </div>
  )
}

export default Home
