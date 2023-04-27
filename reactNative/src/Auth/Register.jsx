import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
// import { useForm } from '../hooks/useForm';
import { useForm } from "react-hook-form";
import { TextInput, Button, View, Text} from 'react-native';


export default function Register({ setLogin }) {
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);
  const onSubmit = data => handleRegister(data)
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const { formState, onTextInputChange } = useForm({

  //   name: "",

  //   email: "",

  //   password: "",

  //   password2: "",


  //   });
  //   const {name,email,password,password2  } = formState

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   //let { name, password, password2, email } = formState;
  //   alert(
  //     "He enviat les Dades:  " +
  //     name +
  //     "/" +
  //     email +
  //     "/" +
  //     password +
  //     "/" +
  //     password2
  //   );
  const handleRegister = async (formState) => {
    let { name, password, password2, email } = formState;


    // if (password2 !== password) {
    //   setError("Els passwords han de coincidir");
    //   return false;
    // }


    fetch("http://127.0.0.1:8000/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      // Si els noms i les variables coincideix, podem simplificar
      body: JSON.stringify({ name, email, password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          alert(resposta.authToken);
          setAuthToken(resposta.authToken)
        }
        else {
          setError(resposta.message);
          console.log(resposta)
        }
      })

      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });

    alert("He enviat les Dades:  " + email + "/" + password);
  };

  return (
    <>
    <View>
      <div className="login-form">
        <Text>Register</Text>
        <div className="form-group ">
          <TextInput {...register("name", { required: true, maxLength: 20 })}
            // name="name"
            type="text" className="form-control" placeholder="Username " id="UserName"
          //  onChange={onTextInputChange} 
          />
        </div>
        <div className="form-group ">
          <TextInput {...register("email")}
            //name="email" 
            type="text" className="form-control" placeholder="Email " id="Email"
          // onChange={onTextInputChange}
          />
        </div>
        <div className="form-group log-status">
          <TextInput  placeholder="Password" {...register("password", {

            required: "Aquest camp és obligatori",

            minLength: {

              value: 8,

              message: "La contrasenya ha de tenir al menys 8 caràcters"

            },

            maxLength: {

              value: 20,

              message: "La contrasenya ha de tenir com a màxim 20 caràcters"

            },

            pattern: {

              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,

              message:

                "La contrasenya ha de contenir al menys una minúscula, una majúscula, i un número"

            }

          })}
            //name="password" type="password" className="form-control" placeholder="Password" id="Passwod"
            // onChange={onTextInputChange} 
            />
                      {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* <div className="form-group log-status">
          <TextInput {...register("password2")}
          //name="password2" type="password" className="form-control" placeholder="Password" id="Passwod2"
          // onChange={onTextInputChange}
          />

        </div> */}
        <Button title="enviar"
          onPress={handleSubmit(onSubmit)}
        />
          
        {error ? <div>{error}</div> : <></>}


        <Button title="Ja estas registrat?"
          onPress={() => {
            setLogin(true);
          }}
        />
        

      </div>
      </View>
    </>
  );
}