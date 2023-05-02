import React from 'react'
import { useLogin } from '../Hooks/useLogin';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../userContext';



export default function Login({ setLogin }) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  let { authToken, setAuthToken } = useContext(UserContext);
  // let [error, setError] = useState("");
  // const { formState, onTextInputChange } = useForm({

  // email: "",
  // password: "",

  // });

  // const {email,password} = formState

  const { doLogin, error, setError } = useLogin();
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

    <View style={styles.container}>
        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>This field is required</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text style={styles.error}>This field is required</Text>}
      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      {error ? <div>{error}</div> : <></>}

      <Button title="Crea una conta"
        onPress={() => {
          setLogin(false);
        }}
        type="Button" class="log-btn" />
    </View>

  )

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

