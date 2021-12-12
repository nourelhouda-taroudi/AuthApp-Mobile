import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'

export default function Dashboard({ navigation }) {
  const signOut = async ()=>{
    Alert.alert(
      'Déconnextion',
      'Vous voulez déconnecter?',
      [
        {
          text: "Annuler",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Oui", onPress: async () => {
          try{
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }catch(e){
            console.log(e)
            return;
          }
        }}
      ]
    )
  }
  return (
    <Background>
      <Logo />
      <Header>Bienvenue à AuthApp</Header>
      <Paragraph>
        Auth App
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => {signOut()}}
      >
        Déconnexion
      </Button>
    </Background>
  )
}
