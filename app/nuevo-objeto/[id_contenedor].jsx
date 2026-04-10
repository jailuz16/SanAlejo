import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { insertObjeto } from "../../database/db";

export default function NuevoObjeto() {
  const { id_contenedor } = useLocalSearchParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const router = useRouter();

  const guardar = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      Alert.alert("Campos vacíos", "Por favor completa todos los campos.");
      return;
    }
    await insertObjeto(
      nombre.trim(),
      descripcion.trim(),
      parseInt(id_contenedor),
    );
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del objeto</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Cable HDMI"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Detalle adicional"
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={guardar}>
        <Text style={styles.btnText}>Guardar objeto</Text>
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
    backgroundColor: "#27AE60",
    borderRadius: 10,
    padding: 16,
    marginTop: 30,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
