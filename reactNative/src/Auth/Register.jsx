import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const Register = ({ setLogin }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState([]);
  const [gender, setGender] = useState("");

  let { authToken, setAuthToken } = useContext(UserContext);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => handleRegister(data, image);

  const handleRegister = async (dataa, image) => {
    const formData = new FormData();
    if (image) {
      const fileName = image.assets[0].uri.split("/").pop();

      formData.append('imageUri', {
        uri: image.assets[0].uri,
        name: fileName,
        type: Platform.OS === "ios" ? image.assets[0].uri.split(".").pop() : "image/" + image.assets[0].uri.split(".").pop(),
      });
    }

    formData.append('name', dataa.name);
    formData.append('email', dataa.email.toLowerCase());
    formData.append('password', dataa.password);
    formData.append('gender', dataa.gender);

    try {
      const response = await fetch("http://equip04.insjoaquimmir.cat/api/register", {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data"
        },
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success === true) {
        setAuthToken(data.authToken);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("Error: ", error.message);
      alert(error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <View>
      <Text>Nombre:*</Text>
      <CustomInput
        name="name"
        placeholder="Name"
        control={control}
        rules={{required: 'El nombre es obligatorio'}}
      />

      <Text>lastname:</Text>
      <CustomInput
        name="lastname"
        placeholder="lastname"
        control={control}

      />
      {errors.lastname && <Text>{errors.lastname.message}</Text>}

      <Text>second_surname:</Text>
      <CustomInput
        name="second_surname"
        placeholder="second_surname"
        control={control}

      />
      {errors.second_surname && <Text>{errors.second_surname.message}</Text>}

      <Text>Genero:*</Text>
      <Controller
        control={control}
        name="gender"
        defaultValue=""
        rules={{ required: 'El género es obligatorio'}}
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
          />
        )}
      />
      {errors.gender && <Text>{alert('El genero es obligatorio')}</Text>}


      <Text>img_profile:</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}


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
        rules={{ required: 'El correo electronico es obligatorio'}}
      />

      <Text>Contraseña:*</Text>
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


      <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
      <Button title="Ya tengo cuenta" onPress={() => { setLogin(true) }} />

    </View>
  );
};

export default Register;
