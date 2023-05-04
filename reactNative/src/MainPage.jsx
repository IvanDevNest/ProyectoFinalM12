import React from 'react'
import { useContext } from 'react';
import { UserContext } from './userContext';
import { Button } from 'react-native';

import Header from './Layout/Header'
import { Footer } from './Layout/Footer'
import RutasList from './RutasList'

export const MainPage = () => {

  return (
    <>
    <Header></Header>
    <RutasList></RutasList>
    <Footer></Footer>
    </>
    
  )
}
