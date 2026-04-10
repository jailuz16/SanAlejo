import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "San Alejo 📦" }} />
      <Stack.Screen
        name="nuevo-contenedor"
        options={{ title: "Nuevo Contenedor" }}
      />
      <Stack.Screen name="detalle/[id]" options={{ title: "Detalle" }} />
      <Stack.Screen
        name="nuevo-objeto/[id_contenedor]"
        options={{ title: "Nuevo Objeto" }}
      />
    </Stack>
  );
}
