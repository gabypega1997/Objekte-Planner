//Function for periods

import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const counterPeriodsAndWeek = (type: string) => {
    let responseArray = [];
    if (type === "week") {
        for (let i = 14; i <= 48; i++) {
            responseArray.push(i);
        }
    } else if (type === "period") {
        for (let i = 1; i <= 7; i++) {
            responseArray.push(i);
        }
    }

    return responseArray;
};

// current week function

export const currentWeek = () => {
    const currentdate: any = new Date();
    const oneJan: any = new Date(currentdate.getFullYear(), 0, 1);
    const numberOfDays: any = Math.floor(
        (currentdate - oneJan) / (24 * 60 * 60 * 1000)
    );
    const result: string = Math.ceil(numberOfDays / 7) + "";

    return result;
};

export const currentDate = () => {
    const currentdate: any = new Date()
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/");
    return currentdate;
};

// Function for get key by value

export const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find((key) => object[key] === value);
};

// loop throw the Objekts and chose the right one for the week what i put in

export const objectsWeek = (
    objects: Object[],
    finishedObjects: Object[],
    week: number
) => {
    objects.filter((object: any) => {
        let booleanFinObj: boolean = true;
        finishedObjects.forEach((finobject: any) => {
            if (Object.values(finobject).includes(object.id)) {
                booleanFinObj = false;
            }
        });
        return Object.values(object).includes(Number(week)) && booleanFinObj
            ? object
            : null;
    });
};

// finished Object function
export const workedObjekt = async (
    object: any,
    weekOrPeriod: string,
    weekOrPeriodValue: string
) => {
    const { id } = object;
    let periodFin;
    const week = currentWeek();
    // console.log(id, week, currentdate.toLocaleDateString())
    const time = new Date().toLocaleDateString();
    // setFinishedObjects({id, week, time});
    if (weekOrPeriod === "week") {
        periodFin = Object.keys(object).filter((key) =>
            object[key] === weekOrPeriodValue ? key : null
        );
    } else if (weekOrPeriod === "period") {
        periodFin = weekOrPeriodValue;
    }

    const collectionRef = collection(db, "FinishedObjects");
    const docRef = await addDoc(collectionRef, {
        idObj: id,
        time,
        periodFin,
        week,

    });

    console.log(`Object with ${object.Ort} is added successfuly! `);
};

// Finished objects delete

const deleteFinishedObject = async (id: string) => {
    console.log(id);
    const docRef = doc(db, "FinishedObjects", id);
    await deleteDoc(docRef);
};

// Function to return week or period objects

export const objectsWeekOrPeriod = (
    type: string,
    value: string,
    objects: Object[],
    finishedObjects: Object[]
) => {
    const objectsReturned = objects.filter((object: any) => {
        let booleanFinObj: boolean = true;

        finishedObjects.forEach((finobject: any) => {
            if (Object.values(finobject).includes(object.id)) {
                booleanFinObj = false;
            }
        });
        return booleanFinObj
            ? type === "week"
                ? Object.values(object).includes(Number(value))
                    ? object
                    : null
                : Object.keys(object).includes(value)
                ? object
                : null
            : null;
    });

    return objectsReturned;
};
