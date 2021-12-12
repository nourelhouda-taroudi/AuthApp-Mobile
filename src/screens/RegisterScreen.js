import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import axios from 'axios'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    Alert.alert(
      "Confirmation",
      "Vous voulez validez votre information?",
      [
        {
          text: "Annuler",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Oui", onPress: async () => {
          //http://localhost=>http://10.0.2.2
          let data = await axios.post("http://10.0.2.2:8085/user/register",{
              name:name.value,
              email:email.value,
              password:password.value,
              phone:phone.value 
          });
            if(data){
              Alert.alert(
                "Inscription",
                "Votre compte à été créer",
                [
                  { text: "OK", onPress: () => navigation.reset({
                      index: 0,
                      routes: [{ name: 'LoginScreen' }],
                    }),
                    style:'default'
                  }
                ]
              );
              
            }else {
              Alert.alert(
                "Erreur d'inscription",
                "Une erreur survenue veuillez réessayer plus tard",
                [
                  { text: "OK", onPress: () => {} }
                ]
              );
            }
          } 
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Créer un compte</Header>
      <TextInput
        label="Nom"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Mot de passe"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
       <TextInput
        label="Téléphone"
        returnKeyType="done"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        keyboardType="numeric"
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        S'inscrire
      </Button>
      <View style={styles.row}>
        <Text>Vous avez déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>S'identifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
