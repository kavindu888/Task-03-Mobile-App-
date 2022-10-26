import React,{useState}from "react";
import { StyleSheet,TextInput,View,Text, Button, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation } from '@react-navigation/native';
import {URL} from '@env'
import CostemButton from'../componets/CostemButton';
import axios from "axios";
const Register=()=>{


    const [fn,setfn] = useState('');
    const [email,setemail] = useState('');
    const [tp,settp] = useState('');
    const [pw,setpw] = useState('');
    const [rpw,setrpw] = useState('');

    const navigation=useNavigation();
    const  register= async()=>{
        
        if(fn,email,tp,pw,rpw){
    if(pw==rpw){
        let fcmToken=await AsyncStorage.getItem('fcmToken');
        axios({
            method: 'post',
            url: URL+'/api/registrer',
            data: {
                "name":fn,
                "email":email,
                "password":pw,
                "tp":tp,
                "fcmToken":fcmToken
            }
          })  .then( async function (response) {
          
           if(response.status==201){
      
          navigation.navigate('Login');
           }else if(response.status==200){
            alert(response.data.msg);
            navigation.navigate('Login')
           }
    
           
          });
    }else{
        alert('password and re-type password not match!')
    }
}else{
    alert('enter all data')
}
 
 
    } 
  

    return(
        <ScrollView>
        <View style={style.body} >
             <Text style={style.text}>Register</Text>
             <View style={{flex:1}} >
             <Text style={{color:'black',fontSize:20,paddingLeft:20,paddingBottom:10,fontWeight:'500'}}>Details</Text> 
        
           
                <TextInput style={style.textInput} placeholder="Full Name" onChangeText={(fn) => setfn(fn)} value={fn} ></TextInput>
                <TextInput style={style.textInput} placeholder="Email"  onChangeText={(email) => setemail(email)} value={email} ></TextInput>
                <TextInput style={style.textInput} placeholder="Telephone"  onChangeText={(tp) => settp(tp)} value={tp} ></TextInput>

                <Text style={{color:'black',fontSize:20,paddingLeft:20,paddingBottom:10,paddingTop:20,fontWeight:'500'}}>Password</Text>


                <TextInput style={style.textInput} placeholder="Password" secureTextEntry  onChangeText={(pw) => setpw(pw)} value={pw}></TextInput>
                <TextInput style={style.textInput} placeholder="Re Enter password" secureTextEntry  onChangeText={(rpw) => setrpw(rpw)} value={rpw}></TextInput>
        
        <View style={{alignItems:'flex-end',paddingEnd:20}}>
        <CostemButton  text={'Submit'} color={'#1a8cff'} onPress={register}
        
     
        />
        </View>
                



         </View>

  
        
       
            </View>

            </ScrollView> 
    );



}

const style=StyleSheet.create({

    body:{
        flex:1,
        paddingBottom:10
      
        
    },
    textInput:{
        backgroundColor:'#ffffff',
        borderStyle:"solid",
        borderWidth:2,
        borderColor:'#D3D3D3',
        borderRadius:5,
        color:'#000000',
        width:'90%',
        paddingLeft:25,
        paddingRight:25,
        fontSize:25,
        marginBottom:10,
        textDecorationLine:"none",
        alignSelf:"center"

    },
    text:{
        color:'#0099ff',
        fontSize:40,
        paddingTop:30,
        paddingLeft:20,
        fontWeight:'500',
        paddingBottom:20
     },





})

export default Register;