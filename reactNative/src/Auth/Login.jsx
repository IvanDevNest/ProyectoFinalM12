import React from 'react'
import { useLogin } from '../Hooks/useLogin';
import { View, TextInput, Button, StyleSheet,Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../userContext';



export default function Login({ setLogin }) {
  //  const { control, handleSubmit, formState: { errors } } = useForm();

  // let { authToken, setAuthToken } = useContext(UserContext);
  // // let [error, setError] = useState("");
  // // const { formState, onTextInputChange } = useForm({

  // // email: "",
  // // password: "",

  // // });

  // // const {email,password} = formState

  //  const { doLogin, error, setError } = useLogin();
  //  const onSubmit = data => doLogin(data)

  // // const sendLogin = async (e) => {
  // //   e.preventDefault();

  // //   // Enviam dades a l'aPI i recollim resultat
  // //   try {
  // //     const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
  // //       headers: {
  // //         Accept: "application/json",
  // //         "Content-Type": "application/json"
  // //       },
  // //       method: "POST",
  // //       body: JSON.stringify({ email, password })
  // //     });


  // //     const resposta = await data.json();
  // //     if (resposta.success === true)       setAuthToken(resposta.authToken) ;
  // //     else alert("La resposta no ha triomfat");


  // //   } catch {
  // //     console.log("Error");
  // //     alert("catch");
  // //   }
  // // };






  return (

      <View class="login-form">
        <Text>Login</Text>

          <Text class="fa fa-user"></Text>
          <View class="form-group ">
            {/* <TextInput {...register("email")} 
            // name="email"
            placeholder="Email " 
            //  onChange={onTextInputChange} 
             /> */}
          </View>

        <View class="form-group log-status">
          {/* <TextInput {...register("password")} 
          // name="password"
         placeholder="Password"
          //  onChange={onTextInputChange}
          /> */}
          <Text class="fa fa-lock"></Text>
        </View>

        <Button title="Login" 
        // onPress ={ handleSubmit(onSubmit)}
        ></Button>
        
        {/* {error ? <View>{error}</View> : <></>} */}

      <Button title="Ya tengo una cuenta"
        //  onPress={() => {
        //     setLogin(false);
        //   }}
           >
         
        </Button>

      </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

