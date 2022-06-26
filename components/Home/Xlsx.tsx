import React from "react";
import * as XLSX from 'xlsx';
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";


const Xlsx: React.FC = () => {
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
            
                data.forEach(async function(obj: any){
                    const collectionRef = collection(db,"Objects");
                    const docRef = await addDoc(collectionRef, {...obj});

                    console.log(`Object with name is added successfuly! `);
                })
            })
        }
        
        
        
        
        return (
            <div >
            <input type='file' onChange={(e:any)=>{
                const file = e.target.files[0]
                readExcel(file)
            }}/>
            </div>
        )
}


export default Xlsx;