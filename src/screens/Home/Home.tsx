import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Animated,
    Easing,
} from "react-native";
import * as Location from "expo-location";
import logoBatSinal from '../../../assets/logobatma.png'

export function Home() {
    const [nome, setNome] = useState("");
    const [contato, setContato] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [observacao, setObservacao] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Animação logo
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    // Pega localização + endereço
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permissão negada", "Não foi possível acessar a localização");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let geocode = await Location.reverseGeocodeAsync(location.coords);

            if (geocode.length > 0) {
                const place = geocode[0];
                setLocalizacao(`${place.street || ""}, ${place.city || ""} - ${place.region || ""}`);
            }
        })();
    }, []);

    const handleAnimate = () => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: -110, // empurra pro canto
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -150, // sobe
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 0.3, // diminui
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start(() => setShowForm(true));
    };

    const handleSubmit = () => {
        const dados = { nome, contato, localizacao, observacao };
        Alert.alert(`Batman se dirigindo a ${localizacao}`);
    };

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.title}>BAT SINAL</Text>
                {/* Logo animada fixa */}
                <Animated.Image
                    source={logoBatSinal}
                    style={[
                        styles.logo,
                        {
                            transform: [
                                { translateX: translateX },
                                { translateY: translateY },
                                { scale: scale },
                            ],
                        },
                    ]}
                />
            </View>


            {!showForm ? (
                <TouchableOpacity style={styles.button} onPress={handleAnimate}>
                    <Text style={styles.buttonText}>Enviar Sinal Para Batman</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.form}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite seu nome"
                    />

                    <Text style={styles.label}>Contato</Text>
                    <TextInput
                        style={styles.input}
                        value={contato}
                        onChangeText={setContato}
                        placeholder="Telefone ou Email"
                    />

                    <Text style={styles.label}>Localização Atual</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: "#eee" }]}
                        value={localizacao}
                        editable={false}
                    />

                    <Text style={styles.label}>Observação</Text>
                    <TextInput
                        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                        value={observacao}
                        onChangeText={setObservacao}
                        placeholder="Digite suas observações"
                        multiline
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#afafafff",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        position: "relative",
        fontSize: 50,
        fontWeight: "bold",
        top: 0,
        textAlign: "center",
        marginBottom: 0
    },

    logo: {
        margin: 20,
        position: "relative", // garante que fique visível
        top: 0, // posição inicial
        width: 250,
        height: 100,
    },
    button: {
        backgroundColor: "yellow",
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: "center"
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    form: {
        width: "100%",
        marginTop: -100
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
    },
});
