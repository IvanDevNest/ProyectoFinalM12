import { setisSaving, setisLoading, setError, setPlace, setFavorite, setPlaces, setPages, setPage } from "./routeSlice"
import { useSelector } from "react-redux";
// import { useContext } from "react";
// import { UserContext } from "../../userContext";

export const addPlace = (formData, authToken, navigate) => {
    return async (dispatch, getState) => {
        
        dispatch(setisSaving(true))

        // dispatch(startLoadingReviews());
        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: formData
        };

        const url = "https://backend.insjoaquimmir.cat/api/places"

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("place creado: " + resposta.data)
            dispatch(setisSaving(false))

            // dispatch(setPlaces(resposta.data));
            navigate("/places/" + resposta.data.id)

        }

        else {
            console.log(resposta)
            dispatch(setError(resposta.message));

        }
    };

}
export const getPlace = (authToken, id) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading(true));
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            dispatch(setisLoading(false));
            dispatch(setPlace(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}
export const delPlace = (authToken, navigate, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("place eliminado");
            navigate("/places/list")
        } else {
            dispatch(setError(resposta.message));
        }

    };
};
export const comprovarFavorite = (authToken, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("favorite del principio ")
            console.log("Resposta:" + resposta)
            console.log(id)
            dispatch(eliminarFavorite(authToken, id))
        } else {
            dispatch(setFavorite(false))
            dispatch(setError(resposta.message));
        }

    };
};
export const darFavorite = (authToken, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("favorite añadido")
            dispatch(setFavorite(false))
        } else {
            dispatch(setError(resposta.message));
        }

    };
};
export const eliminarFavorite = (authToken, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id + "/favorites",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            dispatch(setFavorite(true))
            console.log("favorite eliminado")
        } else {
            dispatch(setError(resposta.message));
        }

    };
};

export const handleUpdate = (authToken, id, formulari, navigate) => {
    return async (dispatch, getState) => {
        console.log(formulari.name)
        let { name, description, upload, latitude, longitude, visibility = 1 } = formulari;

        console.log(upload)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (upload != undefined) formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);
        console.log(formData)
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: formData
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("place actualizado")
            navigate("/places/" + resposta.data.id)
        } else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }

    };
};
// export const getPlaces = (authToken,page=0) => {
//     return async (dispatch, getState) => {
//         dispatch(setisLoading(true));
//         const url =

//             page > 0

//                 ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page

//                 : "https://backend.insjoaquimmir.cat/api/places";
//         const headers = {
//             headers: {
//                 Accept: "application/json",
//                 Authorization: "Bearer " + authToken,
//             },
//             method: "GET",
//         };
//         // const url = "https://backend.insjoaquimmir.cat/api/places"
//         const data = await fetch(url, headers);
//         const resposta = await data.json();
//         if (resposta.success == true) {
//             if (page > 0) {
//                 dispatch(setPlaces(resposta.data.collection));

//                 dispatch(setPages(resposta.data.links));

//                 console.log(resposta.data.links);

//                 } else {

//                 dispatch(setPlaces(resposta.data));

//                 }
//             dispatch(setisLoading(false));
//             // dispatch(setPlaces(resposta.data));
//             console.log(resposta.data)
//         }
//         else {
//             dispatch(setError(resposta.message));
//         }
//     };
// }


export const getPlaces = (authToken, page = 0) => {

    return async (dispatch, getState) => {
        let url = "";
        const filter = getState().places.filter;
        console.log("entra: "+filter.description,filter.author)

        dispatch(setisLoading(true));
        if (filter.description == ""&&filter.author == "") {
            url =
                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page

                    : "https://backend.insjoaquimmir.cat/api/places";
        }else if (!filter.author == ""&&filter.description == ""){
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/places?author=" + filter.author;
        } else if (!filter.author == ""&&!filter.description == ""){
            console.log("entra al bueno")
            url =

            page > 0

                ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&description=" + filter.description+"&author="+ filter.author

                : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description+"&author=" + filter.author;;
        }
        else if (filter.author == ""&&!filter.description == ""){
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&description=" + filter.description

                    : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description;
        }

        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        // const url = "https://backend.insjoaquimmir.cat/api/places"
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            if (page > 0) {
                dispatch(setPlaces(resposta.data.collection));

                dispatch(setPages(resposta.data.links));

                console.log(resposta.data.links);

            } else {

                dispatch(setPlaces(resposta.data));

            }
            dispatch(setisLoading(false));
            // dispatch(setPlaces(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}