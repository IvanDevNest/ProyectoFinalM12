import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text ,Platform} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../userContext';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../CustomInput';
const CreateMessage = () => {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState([]);

    let { authToken, setAuthToken, usuari, myAvatarUrl, setReload, reload } = useContext(UserContext);

    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => createMessage(data, image)


    const createMessage = async (dataa, image) => {
        //file
        const formData = new FormData();
        if (image) {
            console.log("imagen: " + JSON.stringify(image.assets[0]))
            const fileName = image.assets[0].uri.split("/").pop();
            console.log("imagen url: " + image.uri)
            console.log("nombre: " + fileName)
            formData.append('imageUri', {
                uri: image.assets[0].uri,
                name: fileName,
                type: Platform === "ios" ? image.assets[0].uri.split(".").pop() : "image/" + image.assets[0].uri.split(".").pop(),

            });
        }

        formData.append('user_id', usuari.id)
        formData.append('route_id', usuari.route_id)
        formData.append('text', dataa.text)

        formData.append('author_name', usuari.name)
        formData.append('img_author_message', myAvatarUrl)

        console.log(formData);
        try {
            const data = await fetch('http://equip04.insjoaquimmir.cat/api/messages', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                method: 'POST',
                body: formData,
            });
            const resposta = await data.json();
            console.log("resposta: " + JSON.stringify(resposta))
            if (resposta.success === true) {

                console.log("resposta message: " + resposta.message)
                reset();
                setImage(null)
                setReload(!reload)

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.err);

        }
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log("Result: " + JSON.stringify(result));
        if (!result.canceled) {
            setImage(result);
        }
    };

    return (
        <View style={{backgroundColor:'white'}}>
            {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}

            <View style={styles.container}>


                <Controller
                    control={control}
                    rules={{
                        required: 'No se puede enviar un mensaje vacío',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Escribe un mensaje..."
                            style={styles.input}
                        />
                    )}
                    name="text"
                />
                {errors.text && <span>{errors.text.message}</span>}
                <Ionicons name="ios-camera" size={24} color="black" onPress={() => pickImage()} />
                <Feather name="send" size={24} color="black" style={styles.sendButton} onPress={handleSubmit(onSubmit)} />


            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 20,
        paddingHorizontal: 16,
    },

    sendButton: {
        marginLeft: 8,
    },
    sendIcon: {
        width: 24,
        height: 24,
    },

});

export default CreateMessage;
