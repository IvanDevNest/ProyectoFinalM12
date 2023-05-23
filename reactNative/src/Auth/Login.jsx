import React from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useLogin } from '../Hooks/useLogin';
// import { useContext } from 'react';
// import { AuthContext } from '../AuthContext';
// import { UserContext } from '../userContext';

export default function Login({ setLogin }) {
  // const {test} = useContext(AuthContext)
  const { control, handleSubmit, formState: { errors }, } = useForm();

  const { doLogin, error, setError } = useLogin()
  const onSubmit = data => doLogin(data)
  // const {login} = useContext(AuthContext);
  return (

    <View class="login-form">
      <Text>Login</Text>
      {/* <Text>{test}</Text> */}

      <Text>Email:*</Text>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        rules={{ required: 'Email is required' }}
      />
            {errors.email && <Text>{errors.email.message}</Text>}


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
                  {errors.password && <Text>{errors.password.message}</Text>}

      {error?<Text>{error}</Text>:<></>}
      <Button title="Login"
        onPress={handleSubmit(onSubmit)}
      ></Button>
      


      <Button title="Crear una cuenta"
        onPress={() => setLogin(false)} />

    </View>

  );
}