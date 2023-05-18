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

  const { control, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = data => handleRegister(data, image)

  const handleRegister = async (dataa, image) => {
    const formData=new FormData();
    if (image){
      console.log("imagen: " +JSON.stringify(image.assets[0]))

      const fileName = image.assets[0].uri.split("/").pop();
      // var imageUri= image.assets[0].uri.replace('file://','')
      console.log("imagen url: " +image.uri)
      console.log("nombre: " +fileName)
      // console.log("tamaño: " +image.assets[0].fileSize)
  
      // console.log("imagenurl: " +imageUri)

      formData.append('imageUri', {
        uri: image.assets[0].uri,
        name:fileName,
        type: Platform === "ios" ? image.assets[0].uri.split(".").pop() :  "image/"+image.assets[0].uri.split(".").pop(),
  
      });
    }
    
    // formData.append('fileSize',image.fileSize)
    formData.append('name', dataa.name);
    formData.append('email', dataa.email.toLowerCase());
    formData.append('password', dataa.password);
    formData.append('gender', dataa.gender);

   
    console.log("Data antes de enviar"+JSON.stringify(dataa))
    console.log("FormData antes de enviar"+JSON.stringify(formData))

    try {

      const data = await fetch("http://equip04.insjoaquimmir.cat/api/register", {
        headers: {
          Accept: "application/json",
          "content-type":"multipart/form-data"
        },
        method: "POST",
        // Si els noms i les variables coincideix, podem simplificar
        // body: formData
        body: formData,

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
    } catch(e) {
      console.log("Error" +e.message);
      alert(e.message);
    };
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result: "+JSON.stringify(result));

    if (!result.canceled) {
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
      <Controller
          control={control}
          name="gender"
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              placeholder={{ label: 'Elige el genero:', value: null }}
              onValueChange={(selectedValue) => {
                onChange(selectedValue);
                setGender(selectedValue);
                console.log("Genero: " + selectedValue);
              }}
              onBlur={onBlur}
              items={[
                { label: 'Hombre', value: 'Hombre' },
                { label: 'Mujer', value: 'Mujer' }
              ]}
              value={gender}
            />

          )}
        />

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
