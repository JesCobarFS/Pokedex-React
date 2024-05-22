import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native'
import { useFormik } from 'formik'; // Sistemna del formulario
import * as Yup from "yup"; // Sistema de validacion
import { user, userDetails } from "../../utils/userDB"
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {

    const [error, setError] = useState();

    const { login } = useAuth();

    console.log(useAuth());

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            setError("");
            const {userName, password} = formValue;

            if(userName !== user.userName || password !== user.password){
                console.log("---> El usuario o la contraseña son incorrectos");
                setError("El usuario o la contraseña son incorrectos")
            } else {

                login(userDetails)
            }

        }
    });

    return (
        <View>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                placeholder='Nombre de usuario'
                style={styles.input}
                autoCapitalize='none'
                value={formik.values.userName}
                onChangeText={(text) => formik.setFieldValue('userName', text)}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.input}
                autoCapitalize= 'none'
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={(text) => formik.setFieldValue('password', text)}
            />
            <Button title='Entrar' onPress={formik.handleSubmit} />

            <Text style={styles.error} >{formik.errors.userName}</Text>
            <Text style={styles.error} >{formik.errors.password}</Text>
            <Text style={styles.error} >{error}</Text>
        </View>
    )
}

function validationSchema() {
    return {
        userName: Yup.string().required("El usuario es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria")
    }
}

function initialValues() {
    return {
        userName: "",
        password: ""
    }
}
const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 50, 
        marginBottom: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10

    },
    error:{
        textAlign: "center",
        color: "red", 
        marginTop: 20
    }
});
