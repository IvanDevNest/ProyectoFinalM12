import { current } from "immer";
import { useSelector } from "react-redux";
import RutasList from "../../RutasList";
import { setError} from "./userSlice"

// import { useContext } from "react";
// import { UserContext } from "../../userContext";
export const handleRegister = (dataa, image, setAuthToken) => {
    return async (dispatch, getState) => {

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
        dispatch(setError(data.message));
      }
    } catch (error) {
      console.log("Error: ", error.message);
      alert(error.message);
    }
}

  };
  
