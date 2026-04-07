export const productos = [
    {
        id: 1,
        nombre: "Vasos plástico 250cc",
        precio: 1200,
        categoria: "Vasos",
        imagen: "/images/productos/vasos-250.jpg",
        descripcion: "Pack x 100 unidades. Ideales para eventos y uso gastronómico.",
        unidad: "pack x 100"
    },
    {
        id: 2,
        nombre: "Vasos plástico 350cc",
        precio: 1500,
        categoria: "Vasos",
        imagen: "/images/productos/vasos-350.jpg",
        descripcion: "Pack x 100 unidades. Tamaño grande, ideal para bebidas frías.",
        unidad: "pack x 100"
    },
    {
        id: 3,
        nombre: "Platos plástico blancos N°22",
        precio: 900,
        categoria: "Platos y bandejas",
        imagen: "/images/productos/platos-blancos.jpg",
        descripcion: "Pack x 50 unidades. Resistentes para comidas calientes y frías.",
        unidad: "pack x 50"
    },
    {
        id: 4,
        nombre: "Platos hondos blancos",
        precio: 1100,
        categoria: "Platos y bandejas",
        imagen: "/images/productos/platos-hondos.jpg",
        descripcion: "Pack x 50 unidades. Aptos para sopas y guisos.",
        unidad: "pack x 50"
    },
    {
        id: 5,
        nombre: "Cubiertos descartables x 50",
        precio: 800,
        categoria: "Cubiertos",
        imagen: "/images/productos/cubiertos.jpg",
        descripcion: "Set tenedor, cuchillo y cuchara. Pack x 50 juegos.",
        unidad: "pack x 50 juegos"
    },
    {
        id: 6,
        nombre: "Bolsas camiseta negras 35x45",
        precio: 650,
        categoria: "Bolsas",
        imagen: "/images/productos/bolsas-negras.jpg",
        descripcion: "Pack x 100 unidades. Resistentes y económicas.",
        unidad: "pack x 100"
    },
    {
        id: 7,
        nombre: "Bolsas camiseta blancas 40x55",
        precio: 750,
        categoria: "Bolsas",
        imagen: "/images/productos/bolsas-blancas.jpg",
        descripcion: "Pack x 100 unidades. Medida estándar para comercios.",
        unidad: "pack x 100"
    },
    {
        id: 8,
        nombre: "Cajas kraft hamburguesa chica",
        precio: 1800,
        categoria: "Packaging",
        imagen: "/images/productos/caja-hamburgesa.jpg",
        descripcion: "Pack x 50 unidades. Ideales para hamburguesas y sándwiches.",
        unidad: "pack x 50"
    },
    {
        id: 9,
        nombre: "Tapers rectangulares c/tapa",
        precio: 2200,
        categoria: "Packaging",
        imagen: "/images/productos/tapers.jpg",
        descripcion: "Pack x 25 unidades. Herméticos, aptos microondas.",
        unidad: "pack x 25"
    },
    {
        id: 10,
        nombre: "Servilletas blancas 30x30",
        precio: 500,
        categoria: "Servilletas y papel",
        imagen: "/images/productos/servilletas.jpg",
        descripcion: "Pack x 500 unidades. Doble hoja, alta absorción.",
        unidad: "pack x 500"
    },
    {
        id: 11,
        nombre: "Rollos papel film 45cm",
        precio: 1400,
        categoria: "Servilletas y papel",
        imagen: "/images/productos/film.jpg",
        descripcion: "Rollo de 300 metros. Para cocina y gastronomía.",
        unidad: "rollo x 300m"
    },
    {
        id: 12,
        nombre: "Guantes descartables x 100",
        precio: 1600,
        categoria: "Higiene",
        imagen: "/images/productos/guantes.jpg",
        descripcion: "Talle M. Pack x 100 unidades. Sin polvo, látex.",
        unidad: "pack x 100"
    },
];

// Categorías únicas (se generan automáticamente de la lista)
export const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];