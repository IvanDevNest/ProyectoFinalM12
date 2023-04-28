import React from 'react'
import { useContext } from 'react';
import { UserContext } from './userContext';
import { Button } from 'react-native';

import Header from './Layout/Header'
import { Footer } from './Layout/Footer'

export const MainPage = () => {
    let { authToken, setAuthToken } = useContext(UserContext);

  return (
      <>
        <div>MAIN</div>
        <Button title="Logout" onPress={()=>setAuthToken("")} />

      </>
    // <>
    // <Header></Header>
    // {/* <Footer></Footer> */}
    // </>
    
  )
}
