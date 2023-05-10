import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useContext } from 'react';
import { UserContext } from '../userContext';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Register = ({ setLogin }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  let { authToken, setAuthToken } = useContext(UserContext);

  const { control, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = data => handleRegister(data, selectedImage)

  const handleRegister = async (dataa, selectedImage) => {
    console.log(JSON.stringify(dataa, selectedImage))
   
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

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setSelectedImage(response.uri);

        }
      },
    );
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
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <Button title="Select Image" onPress={handleSelectImage} />

      <CustomInput
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
