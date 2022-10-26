import React, { useEffect } from "react";
import AppRouter from "./src/screen/router/router";
import Submit from "./src/screen/submit";
import Home from "./src/screen/Home";
import {requestUserPermission,notificationListner} from './src/Utils/NotificationServer'

const App=()=>{

      useEffect( ()=>{
            requestUserPermission()
            notificationListner()
          
           
      },[]);
   
   return (
<AppRouter/>

 
 
      );
    

}
export default App;
