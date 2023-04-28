import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../userContext';

const Register = ({ setLogin }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { authToken, setAuthToken } = useContext(UserContext);

  const onSubmit = data => handleRegister(data)

  const handleRegister = async (formState) => {
    let { name, password, password2, email } = formState;

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
          console.log(resposta.authToken);
          setAuthToken(resposta.authToken)
        }
        else {
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
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="name"
        defaultValue=""
      />
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
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      <Button title="Ja estas registrat?"
          onPress={() => {
            setLogin(true);
          }}
        />
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

export default Register;
