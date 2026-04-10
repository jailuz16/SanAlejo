import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteObjeto, getDb, getObjetos } from "../../database/db";

export default function Detalle() {
  const { id } = useLocalSearchParams();
  const [contenedor, setContenedor] = useState(null);
  const [objetos, setObjetos] = useState([]);
  const router = useRouter();

  const cargar = async () => {
    const db = await getDb();
    const cont = await db.getFirstAsync(
      "SELECT * FROM contenedor WHERE id = ?",
      [id],
    );
    setContenedor(cont);
    const objs = await getObjetos(id);
    setObjetos(objs);
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [id]),
  );

  const confirmarEliminarObjeto = (idObj) => {
    Alert.alert("Eliminar objeto", "¿Eliminar este objeto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deleteObjeto(idObj);
          cargar();
        },
      },
    ]);
  };

  if (!contenedor)
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nombre}>{contenedor.nombre}</Text>
        <Text style={styles.desc}>{contenedor.descripcion}</Text>
        <Text style={styles.ubicacion}>📍 {contenedor.ubicacion}</Text>
      </View>

      <Text style={styles.seccion}>Objetos en este contenedor:</Text>

      {objetos.length === 0 ? (
        <Text style={styles.empty}>
          Este contenedor está vacío.{"\n"}Agrega los objetos que hay dentro.
        </Text>
      ) : (
        <FlatList
          data={objetos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.objNombre}>{item.nombre}</Text>
                <Text style={styles.objDesc}>{item.descripcion}</Text>
              </View>
              <TouchableOpacity
                onPress={() => confirmarEliminarObjeto(item.id)}
              >
                <Text style={styles.eliminar}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push(`/nuevo-objeto/${id}`)}
      >
        <Text style={styles.fabText}>+ Agregar objeto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  nombre: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  desc: { color: "#555", marginBottom: 4 },
  ubicacion: { color: "#888" },
  seccion: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  empty: { textAlign: "center", marginTop: 40, color: "#888", fontSize: 15 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  objNombre: { fontWeight: "bold", fontSize: 15 },
  objDesc: { color: "#666", fontSize: 13 },
  eliminar: { fontSize: 20, paddingHorizontal: 8 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#27AE60",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    elevation: 5,
  },
  fabText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
