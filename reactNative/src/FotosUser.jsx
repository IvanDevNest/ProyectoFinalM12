import { View, Text, Button, Image } from 'react-native';
import Rutas from './Routes'
import Fotos from './Fotos'
import FotoUser from './FotoUser'
import { FlatList } from 'react-native'
import * as ImagePicker from 'expo-image-picker';


const FotosUser = ({ id }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  let { authToken, setAuthToken } = useContext(UserContext);

  const [error, setError] = useState([]);
  const getImagesPost = async () => {
    try {
      const data = await fetch(`http://equip04.insjoaquimmir.cat/api/users/${id}/posts`);
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("imagesUser: " + resposta)
        setImages(response.imageUrls);
      } else setError(resposta.message);
    } catch (e) {
      console.log("catch fetch Avatar: " + e.error);
    };
  }

  const uploadFoto = async (image) => {
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
      formData.append('id_user', id);

    } else {
      setError("No hay imagen para subir")
    }
    console.log("Data antes de enviar" + JSON.stringify(dataa))
    console.log("FormData antes de enviar" + JSON.stringify(formData))
    try {
      const data = await fetch("http://equip04.insjoaquimmir.cat/api/users/postuserfiles", {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data"
        },
        method: "POST",
        body: formData,

      });
      const resposta = await data.json();
      console.log("Resposta register" + JSON.stringify(resposta))
      if (resposta.success === true) {
        setReload(!reload)
        // setAuthToken(resposta.authToken);
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch (e) {
      console.log("Error" + e.message);
      alert(e.message);
    };
  }


  useEffect(() => {
    getImagesPost()
  }, []);

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
    <>
      <Button title="Ya tengo cuenta" onPress={() => { uploadFoto(image) }} />
      <FlatList data={Fotos} numColumns={2}
        renderItem={({ item: foto }) => (

          <FotoUser {...foto} />

        )}>
      </FlatList>
    </>



  );
};


export default FotosUser;