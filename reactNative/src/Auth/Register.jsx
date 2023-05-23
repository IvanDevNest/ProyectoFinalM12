import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Button, PermissionsAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { handleRegister } from '../slices/users/thunks';
import { useDispatch } from 'react-redux';

const Register = ({ setLogin }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("");


  let { authToken, setAuthToken } = useContext(UserContext);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => dispatch(handleRegister(data, image, setAuthToken));



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <ImageBackground
      source={require('../login.jpg')}
      style={styles.container}
      resizeMode="cover"
      blurRadius={2}
    >
      <View style={styles.content}>

        <View style={styles.login}>
          <Text style={[styles.title, { color: 'white' }]}>Register</Text>
          <View style={styles.inputContainer}>

            <Text style={[styles.label, { color: 'white' }]}>Nombre:*</Text>
            <CustomInput
              name="name"
              placeholder="Nombre"
              control={control}
              rules={{ required: 'El nombre es obligatorio' }}
            />

            <Text style={[styles.label, { color: 'white' }]}>Primer Apellido:</Text>
            <CustomInput
              name="lastname"
              placeholder="Primer Apellido"
              control={control}

            />
            {errors.lastname && <Text style={{ color: 'red' }}>{errors.lastname.message}</Text>}

            <Text style={[styles.label, { color: 'white' }]}>Segundo Apellido:</Text>
            <CustomInput
              name="second_surname"
              placeholder="Segundo Apellido"
              control={control}

            />
            {errors.second_surname && <Text style={{ color: 'red' }}>{errors.second_surname.message}</Text>}

            <Text style={[styles.label, { color: 'white' }]}>Genero:*</Text>
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              rules={{ required: 'El género es obligatorio' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <RNPickerSelect
                  placeholder={{ label: 'Elige el género:', value: null }}
                  onValueChange={onChange}
                  onBlur={onBlur}

                  items={[
                    { label: 'Hombre', value: 'Hombre' },
                    { label: 'Mujer', value: 'Mujer' }
                  ]}
                  value={value}
                  style={{
                    inputIOS: {
                      color: 'white', // Cambia el color del texto en iOS
                    },
                    inputAndroid: {
                      color: 'white', // Cambia el color del texto en Android
                    },
                    placeholder: {
                      color: 'white', // Cambia el color del texto del marcador de posición
                    }}}
                />
              )}
            />
            {errors.gender && <Text style={{ color: 'red' }}>{alert('El genero es obligatorio')}</Text>}


            <Text style={[styles.label, { color: 'white' }]}>img_profile:</Text>
            <Button title="Escoje una foto de perfil" onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}


            <Text style={[styles.label, { color: 'white' }]}>Email:*</Text>
            <CustomInput
              name="email"
              placeholder="Email"
              control={control}
              rules={{ required: 'El correo electronico es obligatorio' }}
            />

            <Text style={[styles.label, { color: 'white' }]}>Contraseña:*</Text>
            <CustomInput
              name="password"
              placeholder="Contraseña"
              secureTextEntry
              control={control}
              rules={{
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message: 'La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula y un número',
                },
                required: 'La contraseña es obligatoria'
              }}
            />

          </View>

          <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
          <Button title="Ya tengo cuenta" onPress={() => { setLogin(true) }} />

        </View>
      </View>
    </ImageBackground>

  );
};

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
    textAlign: 'center'
  },
  label: {
    marginBottom: 5,
  },
  color: {
    color: 'white',
  },
  login: {
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
});

export default Register;
