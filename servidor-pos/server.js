// @ts-check
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

/* ==================== CONFIG ==================== */

// __dirname equivalente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');

/* ==================== MIDDLEWARE ==================== */
app.use(cors());
app.use(express.json());

/* ==================== INIT DATA ==================== */

// Conexión a MongoDB Atlas
mongoose
  .connect(
    'mongodb+srv://joelhuzuliakdev:Belgranodecordoba1905@cluster0.xxxx.mongodb.net/miDB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Crear carpeta data si no existe
async function initDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    const files = [
      'productos.json',
      'clientes.json',
      'pedidos.json',
      'ventas.json',
    ];

    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
      }
    }
  } catch (err) {
    console.error('Error creando data dir:', err);
  }
}

/* ==================== HELPERS ==================== */
async function readJSON(filename) {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJSON(filename, data) {
  await fs.writeFile(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2)
  );
}

/* ==================== PRODUCTOS ==================== */
app.get('/productos', async (req, res) => {
  const productos = await readJSON('productos.json');
  res.json(productos);
});

app.post('/productos', async (req, res) => {
  const productos = await readJSON('productos.json');

  const nuevoProducto = {
    id: Date.now(),
    ...req.body,
    fechaCreacion: new Date().toISOString(),
  };

  productos.push(nuevoProducto);

  await writeJSON('productos.json', productos);
  res.json(nuevoProducto);
});

app.put('/productos/:id', async (req, res) => {
  const productos = await readJSON('productos.json');
  const index = productos.findIndex(p => p.id == req.params.id);

  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    await writeJSON('productos.json', productos);
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.delete('/productos/:id', async (req, res) => {
  let productos = await readJSON('productos.json');
  productos = productos.filter(p => p.id != req.params.id);
  await writeJSON('productos.json', productos);
  res.json({ success: true });
});

/* ==================== CLIENTES ==================== */
app.get('/clientes', async (req, res) => {
  const clientes = await readJSON('clientes.json');
  res.json(clientes);
});

app.post('/clientes', async (req, res) => {
  const clientes = await readJSON('clientes.json');
  const nuevoCliente = {
    id: Date.now(),
    ...req.body,
    fechaCreacion: new Date().toISOString(),
  };

  clientes.push(nuevoCliente);

  await writeJSON('clientes.json', clientes);
  res.json(nuevoCliente);
});

/* ==================== PEDIDOS ==================== */
app.get('/pedidos', async (req, res) => {
  const pedidos = await readJSON('pedidos.json');
  const pendientes = pedidos.filter(p => p.estado === 'pendiente');
  res.json(pendientes);
});

app.post('/pedidos', async (req, res) => {
  const pedidos = await readJSON('pedidos.json');

  const nuevoPedido = {
    id: Date.now(),
    ...req.body,
    estado: 'pendiente',
    fecha: new Date().toISOString(),
    usuario: req.body.usuario || 'desconocido',
  };

  pedidos.push(nuevoPedido);

  await writeJSON('pedidos.json', pedidos);
  res.json(nuevoPedido);
});

app.put('/pedidos/:id/procesar', async (req, res) => {
  const pedidos = await readJSON('pedidos.json');
  const pedido = pedidos.find(p => p.id == req.params.id);

  if (pedido) {
    pedido.estado = 'procesado';
    pedido.fechaProcesado = new Date().toISOString();
    await writeJSON('pedidos.json', pedidos);
    res.json(pedido);
  } else {
    res.status(404).json({ error: 'Pedido no encontrado' });
  }
});

app.delete('/pedidos/:id', async (req, res) => {
  let pedidos = await readJSON('pedidos.json');
  pedidos = pedidos.filter(p => p.id != req.params.id);
  await writeJSON('pedidos.json', pedidos);
  res.json({ success: true });
});

/* ==================== VENTAS ==================== */
app.post('/ventas', async (req, res) => {
  const ventas = await readJSON('ventas.json');

  const nuevaVenta = {
    id: Date.now(),
    ...req.body,
    fecha: new Date().toISOString(),
  };

  ventas.push(nuevaVenta);

  await writeJSON('ventas.json', ventas);
  res.json(nuevaVenta);
});

app.get('/ventas', async (req, res) => {
  const ventas = await readJSON('ventas.json');
  res.json(ventas);
});

/* ==================== CIERRE DE CAJA ==================== */
app.get('/cierre', async (req, res) => {
  const ventas = await readJSON('ventas.json');

  const hoy = new Date().toISOString().split('T')[0];
  const ventasHoy = ventas.filter(v => v.fecha.startsWith(hoy));

  let efectivo = 0;
  let transferencia = 0;

  ventasHoy.forEach(v => {
    if (v.metodoPago === 'efectivo') efectivo += v.total;
    else if (v.metodoPago === 'transferencia') transferencia += v.total;
  });

  res.json({
    efectivo: efectivo.toFixed(2),
    transferencia: transferencia.toFixed(2),
    total: (efectivo + transferencia).toFixed(2),
    cantidadVentas: ventasHoy.length,
  });
});

/* ==================== FRONTEND ASTRO ==================== */

// Servir archivos estáticos del build de Astro
app.use(express.static(path.join(__dirname, 'dist')));

// Redirigir cualquier ruta desconocida al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/* ==================== SERVIDOR ==================== */
app.listen(PORT, async () => {
  await initDataDir();
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📁 Datos guardados en: ${DATA_DIR}`);
});

/* ==================== ERRORES ==================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});