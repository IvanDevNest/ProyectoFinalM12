import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    let { setAuthToken,setUsuariId } = useContext(UserContext);
    // localStorage = window.localStorage;


    async function checkAuthToken() {
        try {
            let localAuthToken = localStorage.getItem("authToken")
            console.log("LocalAuthToken: "+ localAuthToken)
            if (localAuthToken) {

                const data = await fetch("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localAuthToken,
                    },  
                    method: "GET",
                });
                const resposta =  await data.json();
                console.log("Resposta token:"+resposta)

                if (resposta.id) {
                    setAuthToken(localAuthToken)
                    console.log(resposta.user.id)
                    setUsuariId(resposta.user.id)
                } else {
                    console.log("INVALID local storage auth token")
                    localStorage.removeItem("authToken")
                }
            } else {
                console.log("No auth token at local storage")
            }
        } catch (e) {
            setError(e);
        }
    }
    const doLogin = async (formState) => {
        console.log(JSON.stringify(formState))
        //setError("");   
        try {
            const data = await fetch("http://127.0.0.1:8000/api/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify( formState ),
                
            });
            const resposta =  await data.json();
            if (resposta.success === true) {

                console.log("RESPOSTA:"+resposta)
                console.log("TOKEN:"+resposta.authToken)

                setAuthToken(resposta.authToken);
                localStorage.setItem("authToken",resposta.authToken)
                checkAuthToken();
            }
            else setError(resposta.message);
        } catch(e) {
            console.log(e.err);
            alert("Catchch");
        };
    }
    useEffect(() => {
        checkAuthToken();
    }, [])



    return { error, doLogin };
}