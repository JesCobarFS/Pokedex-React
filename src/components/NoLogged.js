import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function NoLogged() {

    const navigation = useNavigation();



  return (
   <View style={styles.content}>
     <Text style={styles.text}>Para ver esta pantalla tienes que iniciar Sesion</Text>
     <Button title='Ir al login' onPress={() => navigation.navigate("AccountNavigation") } />
   </View>
  )
}

const styles = StyleSheet.create({
    content: {
        marginVertical: 50,
        paddingHorizontal: 20
    },
    text: {
        textAlign: "center",
        marginBottom: 10
    }
})