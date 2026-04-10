import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { insertContenedor } from "../database/db";

export default function NuevoContenedor() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const router = useRouter();

  const guardar = async () => {
    if (!nombre.trim() || !descripcion.trim() || !ubicacion.trim()) {
      Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
      return;
    }
    await insertContenedor(nombre.trim(), descripcion.trim(), ubicacion.trim());
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Caja cocina"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="¿Qué hay dentro?"
        multiline
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        value={ubicacion}
        onChangeText={setUbicacion}
        placeholder="Ej: Closet cuarto principal"
      />

      <TouchableOpacity style={styles.btn} onPress={guardar}>
        <Text style={styles.btnText}>Guardar contenedor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  label: { fontWeight: "bold", marginBottom: 4, marginTop: 16, color: "#333" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#4A90D9",
    borderRadius: 10,
    padding: 16,
    marginTop: 30,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
