import { firestore } from "./firebase";

const getProjects = async () => {
    const snapshot = await firestore.collection("Projects").get();

    const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return projects;
};

const getProject = async (id) => {
    const doc = await firestore.collection("Projects").doc(id).get();

    const user = {
        id:doc.id,
        ...doc.data(),
    };

    console.log(user);
    return user;
}

export  { getProjects };