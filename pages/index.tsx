import react from 'react';
import type { NextPage } from 'next'
import { resolve } from 'path'
import styles from '../styles/Home.module.css';
import { promises } from 'stream';
import {Objekte} from '../utils/localization.json' 
const Home: NextPage = () => {
  const ort = Objekte[0].Ort;
  return (
    <div className={styles.container}>
      {Objekte.map((Objekt) => {
        return <p key={Objekt.WirtEinh}>{Objekt.Ort} {Objekt.PLZ} {Objekt.P2}</p>
      })}
    </div>
  )
}

export default Home
