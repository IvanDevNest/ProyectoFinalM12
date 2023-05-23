import { current } from "immer";
import { setIsSaving, setInscripciones, setIsLoading, setError, setLastPage, setRutas, setPage, setFilterValueName, setFilterValueVehicle, setTypeFilter, setSelectedVehicleType, setRuta } from "./routeSlice"
import { useSelector } from "react-redux";
import RutasList from "../../RutasList";
// import { useContext } from "react";
// import { UserContext } from "../../userContext";
export const eliminarRuta = (id, authToken, setReload, reload, RutasList) => {
    return async (dispatch, getState) => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            console.log(resposta)
            if (resposta.success === true) {
                console.log("Ruta eliminada correctament")
                RutasList()

                dispatch(setReload(!reload))
            }
            else setError("La resposta no ha triomfat");
        } catch (e) {
            console.log("Catch: " + e.message);
        };
    };
}

export const obtenerInscripciones = (id, authToken) => {
    return async (dispatch, getState) => {

        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/inscriptions?route_id=${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            console.log("Inscripciones: " + JSON.stringify(resposta.data))
            if (resposta.success === true) {
                dispatch(setInscripciones(resposta.data))
                dispatch(setIsLoading(false))

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
            // alert("Catchch");
        };
    };
}


export const createRoute = (formState, authToken, ShowRoute, date, usuari, startCoords, endCoords,setReload, reload) => {
    return async (dispatch, getState) => {

        console.log("date" + JSON.stringify(date))

        let dateToSend = JSON.stringify(date).split('.')[0].replace('T', ' ').replace('"', '');
        console.log("modificada" + dateToSend)
        formState.date = dateToSend
        formState.author_id = usuari.id

        formState.startLatitude = startCoords.latitude
        formState.startLongitude = startCoords.longitude

        formState.endLatitude = endCoords.latitude
        formState.endLongitude = endCoords.longitude
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
            console.log("resposta: " + JSON.stringify(resposta))

            if (resposta.success === true) {
                // setRutas(resposta);
                console.log("resposta route id: " + (resposta.data.id))

                ShowRoute(resposta.data.id)
                setReload(!reload)

            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);

        }
    };
};

export const salirseRuta = (id, authToken, setReload, reload) => {
    return async (dispatch, getState) => {

        console.log(id)
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + id + "/uninscription", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            console.log("resposta salirse ruta" + JSON.stringify(resposta))
            if (resposta.success === true) {
            console.log("resposta true" + JSON.stringify(resposta))

                setReload(!reload)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log("catch: " + e.message);
        };
    };
}

export const getUser = (authToken, setUsuari) => {
    return async (dispatch, getState) => {

        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/user", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("RESPOSTA GETUSER" + JSON.stringify(resposta))
                setUsuari(resposta.user)
            }
            else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
        };
    };
}

export const unirseRuta = (id, authToken, setReload, reload) => {
    return async (dispatch, getState) => {
        console.log(id)
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
            console.log("resposta succes?" + JSON.stringify(resposta))

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

export const getRoute = (objectId, authToken, setStartCoords, setEndCoords, setInitialRegion) => {
    return async (dispatch, getState) => {
        try {
            const data = await fetch("http://equip04.insjoaquimmir.cat/api/routes/" + objectId, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                console.log("resposta getRoute" + JSON.stringify(resposta))
                dispatch(setRuta(resposta.data))
                setStartCoords({ latitude: resposta.data.startLatitude, longitude: resposta.data.startLongitude })
                setEndCoords({ latitude: resposta.data.endLatitude, longitude: resposta.data.endLongitude })
                setInitialRegion({
                    latitude: resposta.data.startLatitude,
                    longitude: resposta.data.startLongitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                })
                dispatch(setIsLoading(false))
            }
            else {
                dispatch(setError(resposta.message))
            }
        } catch (err) {
            console.log("catch" + err.message);
        };
    }
}

export const updateRoute = (formState, id, authToken, ShowRoute, setReload, reload) => {
    return async (dispatch, getState) => {

        console.log("formulari" + JSON.stringify(formState));
        try {
            const data = await fetch('http://equip04.insjoaquimmir.cat/api/routes/' + id, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken,
                },
                method: 'PUT',
                body: JSON.stringify(formState),
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                // setRutas(resposta);
                console.log("resposta: " + JSON.stringify(resposta))

                ShowRoute(resposta.data.id)
                setReload(!reload)

            }
            else{dispatch(setError(resposta.message))
            }
        } catch (e) {
            console.log(e.err);

        }
    }

};
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

export const getRoutes = (page, filterName, filterVehicle, latitudeUser, longitudeUser) => {
    return async (dispatch, getState) => {
        console.log("lat " + latitudeUser, "long " + longitudeUser)
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
                url = `http://equip04.insjoaquimmir.cat/api/routes?page=${page}&latitudeUser=${latitudeUser}&longitudeUser=${longitudeUser}`;
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
                
                dispatch(setRutas(resposta.data))
                console.log("SetRutas: " + JSON.stringify(resposta.data))

                dispatch(setLastPage(resposta.last_page))
                console.log("last page: " + resposta.last_page)
                // console.log("distance to route: " + resposta.data.distanceToRoute)
                // dispatch(setPage(resposta.data.current_page))
                dispatch(setIsLoading(false))

            } else alert("La resposta no ha triomfat" + resposta.message);


            // Resto del código
        } catch (e) {
            console.log("catch getRoutes: " + e.message)
        }
    }
}

export const handleFilterName = (filterValueName, setFilterVehicle, setFilterName) => {
    return async (dispatch, getState) => {
        console.log("entra?")
        dispatch(setPage(1));
        console.log("ultimo filtro name:" + filterValueName)
        setFilterName(filterValueName)
        setFilterVehicle("") // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
    }
}
export const handleFilterVehicle = (filterValueVehicle, setFilterVehicle, setFilterName) => {
    return async (dispatch, getState) => {
        dispatch(setPage(1));
        // console.log("ultimo filtro name:" + filterValueName)
        setFilterVehicle(filterValueVehicle)
        setFilterName("") // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
    }
}
export const deleteFilter = (setFilterVehicle, setFilterName, setTypeFilter) => {
    return async (dispatch, getState) => {
        setTypeFilter("")
        setFilterVehicle("")
        setFilterName(""); // Actualiza el estado 'filter' con el valor actual antes de llamar a 'getRoutes'
        dispatch(setPage(1))
        dispatch(getRoutes(page))
    }
}

