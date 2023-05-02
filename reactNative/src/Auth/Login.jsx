import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
// import { useForm } from '../hooks/useForm';
import { useForm } from "react-hook-form"; 
import { useLogin } from '../Hooks/useLogin';
import { TextInput, Button, View, Text} from 'react-native';


export default function Login({ setLogin }) {

  let { authToken, setAuthToken } = useContext(UserContext);
    // let [error, setError] = useState("");
    const { register, handleSubmit } = useForm(); 
// const { formState, onTextInputChange } = useForm({

// email: "",
// password: "",

// });

// const {email,password} = formState

const { doLogin, error, setError} = useLogin();
const onSubmit = data => doLogin(data)

// const sendLogin = async (e) => {
    //   e.preventDefault();
    
    //   // Enviam dades a l'aPI i recollim resultat
    //   try {
    //     const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       method: "POST",
    //       body: JSON.stringify({ email, password })
    //     });
  
  
    //     const resposta = await data.json();
    //     if (resposta.success === true)       setAuthToken(resposta.authToken) ;
    //     else alert("La resposta no ha triomfat");
  
  
    //   } catch {
    //     console.log("Error");
    //     alert("catch");
    //   }
    // };
  





  return (
    <>

      <View class="login-form">
        <Text>Login</Text>

          <Text class="fa fa-user"></Text>
          <View class="form-group ">
            <TextInput {...register("email")} 
            // name="email"
            placeholder="Email " 
            //  onChange={onTextInputChange} 
             />
          </View>

        <View class="form-group log-status">
          <TextInput {...register("password")} 
          // name="password"
         placeholder="Password"
          //  onChange={onTextInputChange}
          />
          <Text class="fa fa-lock"></Text>
        </View>

        <Button title="Login" onPress ={ handleSubmit(onSubmit)}></Button>
        
        {error ? <View>{error}</View> : <></>}

      <Button title="Ya tengo una cuenta"
         onPress={() => {
            setLogin(false);
          }}
           >
         
        </Button>

      </View>
    </>
  );
}

