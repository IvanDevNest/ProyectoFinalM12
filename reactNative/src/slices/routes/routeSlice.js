import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    error: "",
    isSaving: false,
    isLoading: false,

    rutas: [],
    page: 1,
    lastpage: "",
    filterValueName: "",
    filterValueVehicle: "",
    typeFilter: "",
    selectedVehicleType: "",






    // pages: [], 

    // formulari:[],
    ruta: {
        name: "",
        description: "",
        date: 0,
        estimated_duration: 0,
        type_vehicle: "",
        distance: 0,
        url_maps: "",
        num_stops: 0,
        max_users: 0,
        id_route_style: 0,
        author_id: 0
    }
    // place:{ 

    //     name: "",
    //     description: "",
    //     file: { filepath: "" },
    //     author: { name: "" },
    //     latitude: 0,
    //     longitude: 0,
    //     visibility:0,
    // },

    // favorite:true,


    // filter: { description: "", author: ""},

}
export const routeSlice = createSlice({

    name: "routes",

    initialState,

    reducers: {

        setIsSaving: (state, action) => {

            //console.log("ABA")
            // state.isLoading = true;
            state.isSaving = action.payload;
        },

        setIsLoading: (state, action) => {

            state.isLoading = action.payload;
        },

        setError: (state, action) => {

            state.error = action.payload

        },

        setLastPage: (state, action) => {

            state.lastpage = action.payload

        },
        setRutas: (state, action) => {

            state.rutas = action.payload

        },
        setPage: (state, action) => {

            state.page = action.payload

        },
        setFilterValueName: (state, action) => {

            state.filterValueName = action.payload

        },
        setFilterValueVehicle: (state, action) => {

            state.filterValueVehicle = action.payload

        },
        setTypeFilter: (state, action) => {

            state.typeFilter = action.payload

        },
        setSelectedVehicleType: (state, action) => {

            state.selectedVehicleType = action.payload

        },
        setRuta: (state, action) => {

            state.ruta = action.payload

        },



        // setFavorite: (state, action) => {

        //     state.favorite = action.payload

        // },

        // setPages: (state,action) => {

        //     state.pages = action.payload

        // },
        // setFilter: (state,action) => {

        //     state.filter = action.payload

        // }

    }

});

export const { setIsSaving, setIsLoading, setError, setLastPage, setRutas, setPage, setFilterValueName, setFilterValueVehicle, setTypeFilter, setSelectedVehicleType,setRuta } = routeSlice.actions;

export default routeSlice.reducer
