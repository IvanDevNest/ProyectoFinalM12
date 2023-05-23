import React from 'react';
import { View, TextInput, Button, ImageBackground, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useLogin } from '../Hooks/useLogin';

export default function Login({ setLogin }) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const { doLogin, error, setError } = useLogin();
  const onSubmit = data => doLogin(data);

  return (
    <ImageBackground
      source={require('../login.jpg')}
      style={styles.container}
      resizeMode="cover"
      blurRadius={2}
    >
      <View style={styles.content}>
        <View  style={styles.login}>
          <Text style={[styles.title, { color: 'white' }]}>Iniciar Sesión</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: 'white' }]}>Email:*</Text>
            <CustomInput
              name="email"
              placeholder="Email"
              control={control}
              rules={{ required: 'Email is required' }}
            />
            {errors.email && <Text>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: 'white' }]}>Contraseña:*</Text>
            <CustomInput
              name="password"
              placeholder="Password"
              secureTextEntry
              control={control}
              style={styles.input}

              rules={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password should be minimum 3 characters long',

                },

              }}
            />
            {errors.password && <Text>{errors.password.message}</Text>}
          </View>

          {error && <Text>{error}</Text>}
          <Button
            title="Iniciar Sesión"
            onPress={handleSubmit(onSubmit)}
          />

          <Button
            title="Crear una cuenta"
            onPress={() => setLogin(false)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

  },
  content: {
    // backgroundColor: 'rgba(255, 255, 255, 0.4)', // Transparencia del fondo superpuesto
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparencia del fondo superpuesto
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center'
  },
  label: {
    marginBottom: 5,
  },
  color: {
    color: 'white',
  },
  login: {
    padding:30,
    borderRadius:20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'  },
});
