import { supabase } from './supabase';

export async function getProductos() {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error(error);
        return [];
    }

    // 👇 MAPEO IMPORTANTE
    return data.map(p => ({
        nombre: p.name,
        precio: p.price,
        descripcion: "", // no tenés en la DB (podés agregar después)
        categoria: p.category,
        imagen: "", // podés agregar después
        unidad: "" // opcional
    }));
}