import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const Register = () => {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View>
      <Text>Nombre:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="nombre"
        rules={{ required: true }}
        defaultValue="a"
      />
      {errors.nombre && <Text>El nombre es requerido.</Text>}

      <Text>Apellido:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="apellido"
        rules={{ required: true }}
        defaultValue="a"
      />
      {errors.apellido && <Text>El apellido es requerido.</Text>}

      <Text>Correo electrónico:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            keyboardType="email-address"
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue="a"
      />
      {errors.email && <Text>El correo electrónico es requerido.</Text>}

      <Text>Contraseña:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue="a"
      />
      {errors.password && <Text>La contraseña es requerida.</Text>}

      <Button title="Registrarse" onPress={()=>{handleSubmit(onSubmit)}} />
    </View>
  );
};

export default Register;
