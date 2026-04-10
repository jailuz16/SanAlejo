import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { deleteContenedor, getContenedores } from "../database/db";

export default function Home() {
  const [contenedores, setContenedores] = useState([]);
  const router = useRouter();

  const cargar = async () => {
    const data = await getContenedores();
    setContenedores(data);
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, []),
  );

  const confirmarEliminar = (id) => {
    Alert.alert(
      "Eliminar contenedor",
      "¿Seguro? Se eliminarán también todos sus objetos.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteContenedor(id);
            cargar();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {contenedores.length === 0 ? (
        <Text style={styles.empty}>
          No hay contenedores.{"\n"}Agrega tu primera caja, maleta o cajón.
        </Text>
      ) : (
        <FlatList
          data={contenedores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/detalle/${item.id}`)}
              onLongPress={() => confirmarEliminar(item.id)}
            >
              <Text style={styles.nombre}>📦 {item.nombre}</Text>
              <Text style={styles.desc}>{item.descripcion}</Text>
              <Text style={styles.ubicacion}>📍 {item.ubicacion}</Text>
              <Text style={styles.hint}>Mantén presionado para eliminar</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/nuevo-contenedor")}
      >
        <Text style={styles.fabText}>+ Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  empty: { textAlign: "center", marginTop: 80, color: "#888", fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  nombre: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  desc: { color: "#555", marginBottom: 4 },
  ubicacion: { color: "#888", fontSize: 13 },
  hint: { color: "#ccc", fontSize: 11, marginTop: 6 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4A90D9",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    elevation: 5,
  },
  fabText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
