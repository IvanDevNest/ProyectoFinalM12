import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useContext } from 'react';
import { UserContext } from '../userContext';
  


const Register = ({setLogin}) => {
  let { authToken, setAuthToken } = useContext(UserContext);

  const { control, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = data => handleRegister(data)

  const handleRegister = async (formState) => {
    console.log(formState)
    try{
      
      const data = await fetch("http://127.0.0.1:8000/api/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        // Si els noms i les variables coincideix, podem simplificar
        body: JSON.stringify(formState)
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setAuthToken(resposta.authToken);
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);}
    }catch{
      console.log("Error");
      alert("Catchch");
    };
  }

  
  return (
    <View>
      <Text>Nombre:*</Text>
      <CustomInput
        name="name"
        placeholder="Name"
        control={control}
        rules={{ required: 'Name is required' }}
      />
      <Text>lastname:</Text>
      <CustomInput
        name="lastname"
        placeholder="lastname"
        control={control}

      />
      <Text>second_surname:</Text>
      <CustomInput
        name="second_surname"
        placeholder="second_surname"
        control={control}

      />
      <Text>img_profile:</Text>
    
   
   

      <CustomInput
        name="img_profile"
        placeholder="img_profile"
        control={control}

      /> 
      <Text>Email:*</Text>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{ required: 'Email is required' }}
      />
      <Text>Contraseña:*</Text>
      <CustomInput
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 3,
            message: 'Password should be minimum 3 characters long',
          },
        }}
      />

      <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
      <Button title="Ya tengo cuenta" onPress={() => { setLogin(true) }} />

    </View>
  );
};

export default Register;
