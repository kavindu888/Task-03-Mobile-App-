import React from "react";
import {
    StyleSheet,Text,View,TouchableOpacity
} from 'react-native';

const CostemButton= ({text,onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} >
             
            <View style={{
            borderRadius:8,
             paddingVertical:14,
             paddingHorizontal:10,
             backgroundColor:'#277BC0',
                width:'80%',
                alignSelf:"center",
                marginTop:10

            }}>
              
              
                <Text style={style.buttonText}>{text}</Text>


            </View>
        </TouchableOpacity>
    )
}


const style=StyleSheet.create({
    button:{
        borderRadius:8,
        paddingVertical:14,
        paddingHorizontal:10,
        backgroundColor:'#277BC0',
        width:'80%',
        alignSelf:"center",
       
       

        
    },
    buttonText:{
        color:'#F7F6DC',
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center'
    }
})

export default CostemButton;