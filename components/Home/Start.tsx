import React from 'react'
import { useState,useEffect } from 'react';


// Firestore connection
import { getProjects } from '../../utils/projects';


const Start = () => {
  const [projectes, setProjectes] = useState([])
    useEffect(() => {
        getProjects().then(token => setProjectes(previousState => {   return token  }))

    
    },[]);

    console.log(projectes[1])

  return (
    <div>Start</div>
  )
}

export default Start