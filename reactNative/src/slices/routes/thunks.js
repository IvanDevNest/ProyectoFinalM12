import { setIsSaving, setIsLoading, setError, setLastPage, setRutas, setPage, setFilterValueName, setFilterValueVehicle, setTypeFilter, setSelectedVehicleType } from "./routeSlice"
import { useSelector } from "react-redux";
// import { useContext } from "react";
// import { UserContext } from "../../userContext";

export const createRoute = (formState, authToken, ShowRoute, date, usuari) => {
    return async (dispatch, getState) => {

        console.log("date" + JSON.stringify(date))

        let dateToSend = JSON.stringify(date).split('.')[0].replace('T', ' ').replace('"', '');
        console.log("modificada" + dateToSend)
        formState.date = dateToSend
        formState.author_id = usuari.id
        console.log(JSON.stringify(formState));
        try {
            const data = await fetch('http://equip04.insjoaquimmir.cat/api/routes', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                method: 'POST',
                body: JSON.stringify(formState),
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                // setRutas(resposta);
                console.log("resposta: " + JSON.stringify(resposta))
                console.log("resposta route id: " + (resposta.data.id))

                ShowRoute(resposta.data.id)
                // setReload(!reload)

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);

        }
    };
};


// export const getUser = async (setUsuari, authToken) => {
//     return async (dispatch, getState) => {

//     try {
//         const data = await fetch("http://equip04.insjoaquimmir.cat/api/user", {
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 'Authorization': 'Bearer ' + authToken,
//             },
//             method: "GET",
//         });
//         const resposta = await data.json();
//         if (resposta.success === true) {
//             console.log("RESPOSTA GETUSER" + JSON.stringify(resposta))
//             setUsuari(resposta.user)
//         }
//         else setError(resposta.message);
//     } catch (e) {
//         console.log(e.message);
//     };
// };


// }

export const unirseRuta = async (id, authToken, setReload, reload) => {
    console.log(id)
    return async (dispatch, getState) => {

    try {
        const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id + "/inscription", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + authToken,
            },
            method: "POST",
        });
        const resposta = await data.json();
        console.log("resposta unirse ruta" + JSON.stringify(resposta))

        if (resposta.success === true) {
            // setIsLoading(false)
            setReload(!reload)
        }
        else setError(resposta.message);
    } catch (e) {
        console.log("catch: " + e.message);
        // alert("Catchch");
    };
};
}

export const pasarPagina = (page, lastpage) => {
    return async (dispatch, getState) => {

        if (page !== lastpage) {
            dispatch(setPage(page + 1));

        }
    }
};

export const retrocederPagina = (page) => {
    return async (dispatch, getState) => {

        if (page !== 1) {
            dispatch(setPage(page - 1));

        }
    }
}
// export const sendLogout = () => {
//     return async (dispatch, getState) => {

//         try {
//             const data = await fetch("http://equip04.insjoaquimmir.cat/api/logout", {
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     'Authorization': 'Bearer ' + authToken,
//                 },
//                 method: "POST",
//                 body: JSON.stringify({})
//             });
//             const resposta = await data.json();
//             console.log(resposta)
//             if (resposta.success === true)
//                 setAuthToken("");
//             else alert("La resposta no ha triomfat");
//         } catch {
//             console.log("Error");
//             alert("Catchch");
//         };
//     }

// }

export const getRoutes = (page, filterName, filterVehicle) => {
    return async (dispatch, getState) => {

        try {
            dispatch(setIsLoading(true));
            if (filterName) {
                console.log("Entra por filtro Name: " + filterName)
                url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}&name=${filterName}`;
            }
            else if (filterVehicle) {
                console.log("Entra por filtro Vehicle: " + filterVehicle)
                url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}&type_vehicle=${filterVehicle}`;
            }
            else if (page) {
                console.log("Entra sin filtro")
                console.log("PAGINA: " + page)
                url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}`;
            }

            const data = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "GET",
            });
            const resposta = await data.json();
            console.log("Data: " + JSON.stringify(resposta.data))
            if (resposta.success === true) {
                console.log("resposta pages" + JSON.stringify(resposta))
                dispatch(setRutas(resposta.data.data))
                console.log("SetRutas: " + resposta.data.data)

                dispatch(setLastPage(resposta.data.last_page))
                console.log("last page: " + resposta.data.last_page)

                dispatch(setIsLoading(false))

            } else alert("La resposta no ha triomfat");


            // Resto del código
        } catch(e) {
            console.log("catch getRoutes: "+e.message)
        }
    }
}
 
export const handleFilterName = (filterValueName,setFilterVehicle,setFilterName) => {
    return async (dispatch, getState) => {
        console.log("entra?")
        dispatch(setPage(1));
        console.log("ultimo filtro name:" + filterValueName)
        setFilterName(filterValueName)
        setFilterVehicle("") // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
    }
}
export const handleFilterVehicle = (filterValueVehicle,setFilterVehicle,setFilterName) => {
    return async (dispatch, getState) => {
        dispatch(setPage(1));
        // console.log("ultimo filtro name:" + filterValueName)
        setFilterVehicle(filterValueVehicle)
        setFilterName("") // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
    }
}
export const deleteFilter = (setFilterVehicle,setFilterName) => {
    return async (dispatch, getState) => {
        setFilterVehicle("")
        setFilterName(""); // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
        dispatch(setPage(1))
        dispatch(getRoutes(page))
    }
}




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
        console.log("entra: " + filter.description, filter.author)

        dispatch(setisLoading(true));
        if (filter.description == "" && filter.author == "") {
            url =
                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page

                    : "https://backend.insjoaquimmir.cat/api/places";
        } else if (!filter.author == "" && filter.description == "") {
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/places?author=" + filter.author;
        } else if (!filter.author == "" && !filter.description == "") {
            console.log("entra al bueno")
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&description=" + filter.description + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description + "&author=" + filter.author;;
        }
        else if (filter.author == "" && !filter.description == "") {
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