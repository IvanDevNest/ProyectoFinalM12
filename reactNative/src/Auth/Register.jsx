import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useContext } from 'react';
import { UserContext } from '../userContext';

import * as ImagePicker from 'expo-image-picker';

const Register = ({ setLogin }) => {
  const [image, setImage] = useState(null);

  let { authToken, setAuthToken } = useContext(UserContext);

  const { control, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = data => handleRegister(data, image)

  const handleRegister = async (dataa, image) => {
    console.log("imagen: " +image)
    let imageUri = image;

    dataa.imageUri = imageUri
    console.log(JSON.stringify(dataa))
    try {

      const data = await fetch("http://equip04.insjoaquimmir.cat/api/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        // Si els noms i les variables coincideix, podem simplificar
        // body: formData
        body: JSON.stringify(dataa)

      });
      const resposta = await data.json();
      console.log("Resposta register"+ JSON.stringify(resposta))
      if (resposta.success === true) {
        setAuthToken(resposta.authToken);
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch {
      console.log("Error");
      alert("Catchch");
    };
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      

      {/* <CustomInput
        name="img_profile"
        placeholder="img"
        control={control}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <View>
              <TextInput
                value={selectedImage}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                />
            </View>
        )}  
      /> */}
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
