import react from 'react';
import type { NextPage } from 'next'
import { resolve } from 'path'
import styles from '../styles/Home.module.css';
import { promises } from 'stream';
import {Objekte} from '../utils/localization.json' 
const Home: NextPage = () => {
  const ort = Objekte.filter((Objekt) => {
    return Objekt.P2 === "25" ?  Objekt : null  
  });
  return (
    <div className={styles.container}>
      {ort.map((Objekt) => {
        return <p key={Objekt.WirtEinh}>{Objekt.Ort} {Objekt.PLZ}</p>
      })}
    </div>
  )
}

export default Home
