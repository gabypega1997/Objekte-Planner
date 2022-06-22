import react from 'react';
import type { NextPage } from 'next'
import { resolve } from 'path'
import styles from '../styles/Home.module.css';
import { promises } from 'stream';
import {Objekte} from '../utils/localization.json' 





const Home: NextPage = () => {

  const week:string = '20';
  const ort = Objekte.filter((Objekt) => {
    return Object.values(Objekt).includes(week) ? Objekt : null; 
  });

  console.log(ort)
  return (
    <div className={styles.container}>
      <input type='number'/>

      {ort.map((Objekt) => {
        return <p key={Objekt.WirtEinh}>{Objekt.Ort} {Objekt.PLZ}</p>
      })}
    </div>
  )
}

export default Home
