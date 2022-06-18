import type { NextPage } from 'next'
import { resolve } from 'path'
import styles from '../styles/Home.module.css';
import * as XLSX from 'xlsx';
import { promises } from 'stream';

const Home: NextPage = () => {
  let objekte:any = {};
  const readExcel: any = (file:any) => {
    const promise = new Promise((resolv,reject) =>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e:any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, {type:'buffer'});

        const wsname = wb.SheetNames[0]; 

        const ws = wb.Sheets[wsname];

        const data:any = XLSX.utils.sheet_to_json(ws);

        resolv(data);

      };
      fileReader.onerror = ((error) => {
        reject(error);
      });
    });

    promise.then((data:any) => {
      objekte = data;
      console.log(objekte[0].Ort);
    })
  }


  return (
    <div className={styles.container}>
      <input type='file' onChange={(e:any)=>{
        const file = e.target.files[0]
        readExcel(file)
      }}/>
      <h1>{objekte ? `Name: ${objekte[0].Ort}`: null}</h1>
    </div>
  )
}

export default Home
