import { useState } from "react";
import React from "react";
import Register from "./Register";
import Login from "./Login";
import { View} from 'react-native';




const LoginRegister = () => {

  let [login, setLogin] = useState(true);

  
  return (
    <div>
      <View>
        {login ? 
            <Login setLogin={setLogin}/>
          : 
            <Register setLogin={setLogin}/>        
        }
        </View>
      </div>
  );
}
export default LoginRegister;