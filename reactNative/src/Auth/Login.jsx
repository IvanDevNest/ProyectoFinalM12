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

      <div class="login-form">
        <h1>Login</h1>

          <i class="fa fa-user"></i>
          <div class="form-group ">
            <TextInput {...register("email")} 
            // name="email"
             type="text" class="form-control" placeholder="Email " id="UserName" 
            //  onChange={onTextInputChange} 
             />
          </div>

        <div class="form-group log-status">
          <TextInput {...register("password")} 
          // name="password"
           type="password" class="form-control" placeholder="Password" id="Password" 
          //  onChange={onTextInputChange}
          />
          <i class="fa fa-lock"></i>
        </div>

        <Button onPress ={ handleSubmit(onSubmit)}> Login </Button>
        
        {error ? <div>{error}</div> : <></>}

        <br></br><Button
         onPress={() => {
            setLogin(false);
          }}
          type="Button" class="log-btn" >
          Crea una conta
        </Button>

      </div>
    </>
  );
}

