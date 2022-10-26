import React from "react";
import {
    TextInput,
    StyleSheet

} from 'react-native';

const CusTestInput=({text})=>{


    <TextInput style={styles.textInput}>
text={text}
    </TextInput>

}

const styles=StyleSheet.create({

    textInput:{
        backgroundColor:'#ffffff',
        borderStyle:"solid",
        borderWidth:1,
        borderColor:'#0884d1',
        borderRadius:5,
        color:'#000000',
        width:'80%',
        paddingLeft:25,
        paddingRight:25,
        fontSize:25,
        marginBottom:20,
        textDecorationLine:"none"     
    },
})


export default CusTestInput;