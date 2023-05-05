import React from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useLogin } from '../Hooks/useLogin';

export default function Login({ setLogin }) {
  const { control, handleSubmit, formState: { errors }, } = useForm();

  const { doLogin, error, setError } = useLogin()
  const onSubmit = data => doLogin(data)
  return (

    <View class="login-form">
      <Text>Login</Text>

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
      <Button title="Login"
        onPress={handleSubmit(onSubmit)}
      ></Button>


      <Button title="Crear una cuenta"
        onPress={() => setLogin(false)} />

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

