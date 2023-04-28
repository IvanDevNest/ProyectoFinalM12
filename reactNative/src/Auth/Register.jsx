import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Button,TextInput
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import DocumentPicker from 'react-native-document-picker';
import { useState } from 'react';
const Register = ({ setLogin }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  let { authToken, setAuthToken } = useContext(UserContext);
  const [singleFile, setSingleFile] = useState(null);
  const onSubmit = data => handleRegister(data)

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err.message));
        throw err;
      }
    }
  };

  
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

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>

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
  fileInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fileInputButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  fileInputText: {
    color: "#333",
    fontWeight: "bold",
  },
  fileInputName: {
    flex: 1,
    color: "#333",
  },
});

export default Register;
