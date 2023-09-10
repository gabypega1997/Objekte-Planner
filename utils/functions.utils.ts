//Function for periods

import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { get } from "http";

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

export const getKeyByValue = (object: any, value: any): string => {
    return Object.keys(object).find((key) => object[key] === value)!;
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
    finishedObjects: any,
    weekOrPeriod: string,
    weekOrPeriodValue: string
) => {
    const { id } = object;

    const periodFin: string =
        weekOrPeriod === "period"
            ? weekOrPeriodValue
            : getKeyByValue(object, weekOrPeriodValue);

    const weekFin: string =
        weekOrPeriod === "week" ? weekOrPeriodValue : object[weekOrPeriodValue];

    const curtWeek = currentWeek();
    const time = new Date().toLocaleDateString();
    const collectionRef = collection(db, "FinishedObjects");

    const itemExists = await checkIfDocumentExists(id);
    console.log(itemExists);
    if (itemExists) {
        const docRef = doc(db, "FinishedObjects", id);
        await updateDoc(docRef, {
            periodFin: {
                [periodFin]: weekFin,
            },
            curtWeek,
        });
    } else {
        const docRef = await addDoc(collectionRef, {
            id,
            time,
            periodFin: {
                [periodFin]: weekFin,
            },
            curtWeek,
        });
    }

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

export const checkIfDocumentExists = async (id: string) => {
    const docRef = doc(db, "FinishedObjects", id);

    try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            console.log(`Document with ID ${id} exists.`);
            return true;
        } else {
            console.log(`Document with ID ${id} does not exist.`);
            return false;
        }
    } catch (error) {
        console.error("Error checking if document exists:", error);
        return false;
    }
};
