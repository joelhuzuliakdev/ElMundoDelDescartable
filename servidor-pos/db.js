import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("pos.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT UNIQUE,
            nombre TEXT,
            rubro TEXT,
            menor REAL,
            mayor REAL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        descuento REAL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS ventas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha TEXT,
            total REAL,
            pago TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha TEXT,
            total REAL,
            estado TEXT
        )
        `);

    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pedido_id INTEGER,
            producto TEXT,
            cantidad INTEGER,
            precio REAL,
            subtotal REAL
        )
    `);
});