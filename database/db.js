import * as SQLite from "expo-sqlite";

let db;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("sanAlejo.db");
    await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS contenedor (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        ubicacion TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS objeto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        id_contenedor INTEGER NOT NULL,
        FOREIGN KEY (id_contenedor) REFERENCES contenedor(id) ON DELETE CASCADE
      );
    `);
  }
  return db;
}

export async function getContenedores() {
  const db = await getDb();
  return await db.getAllAsync("SELECT * FROM contenedor ORDER BY id DESC");
}

export async function insertContenedor(nombre, descripcion, ubicacion) {
  const db = await getDb();
  return await db.runAsync(
    "INSERT INTO contenedor (nombre, descripcion, ubicacion) VALUES (?, ?, ?)",
    [nombre, descripcion, ubicacion],
  );
}

export async function deleteContenedor(id) {
  const db = await getDb();
  await db.runAsync("DELETE FROM contenedor WHERE id = ?", [id]);
}

export async function getObjetos(id_contenedor) {
  const db = await getDb();
  return await db.getAllAsync(
    "SELECT * FROM objeto WHERE id_contenedor = ? ORDER BY id DESC",
    [id_contenedor],
  );
}

export async function insertObjeto(nombre, descripcion, id_contenedor) {
  const db = await getDb();
  return await db.runAsync(
    "INSERT INTO objeto (nombre, descripcion, id_contenedor) VALUES (?, ?, ?)",
    [nombre, descripcion, id_contenedor],
  );
}

export async function deleteObjeto(id) {
  const db = await getDb();
  await db.runAsync("DELETE FROM objeto WHERE id = ?", [id]);
}
