import React, { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, collection, getDoc, query, where, getDocs, onSnapshot  } from "firebase/firestore";
import db from "./firebase";

export default function App_firestore() {
  const citiesRef = collection(db, "cities");

  // Add a new document in collection "cities"
  const clicked = async () => {
    console.log("in");
    await setDoc(doc(citiesRef), {
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"],
    });

    // await setDoc(doc(db, "cities", "LA"), {
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA"
    //   });
  };

  const update = async () => {
    const cityRef = doc(db, "cities", "LA");
    setDoc(cityRef, { capital: true }, { merge: true });
  };

  const deleteData = async () => {
    await deleteDoc(doc(db, "cities", "LA"));
  };

  // get specific doc
  const getData = async () => {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //  get data on condition
  const getDataOnCondition = async () => {
    const q = query(collection(db, "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  const [data, setData] = useState([]);

  // get all doc
  const getAllDoc = async () => {
    const querySnapshot = await getDocs(citiesRef);
    // console.log(querySnapshot.docs)
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setData(filteredData);
  };

  useEffect(() => {
    // getAllDoc();

    // const unsubscribe = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });

    const unsubscribe = onSnapshot((citiesRef), (snapshot) => {
      setData(snapshot.docs.map(doc => doc.data()));
    });
    // // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button onClick={clicked}>clicked</button>
      <button onClick={update}>update</button>
      <button onClick={deleteData}>deleteData</button>
      <button onClick={getAllDoc}>getAllDoc</button>
      <button onClick={getData}>getData</button>
      <button onClick={deleteData}>deleteData</button>
      {data.length > 0
        ? data.map((d) => {
            return (
              <div key={d.id}>
                <p>
                  {d.name} : {d.population}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
}
