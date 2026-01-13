const API_URL = "http://localhost:3001";

export async function getProductos() {
    const res = await fetch(`${API_URL}/productos`);
    return res.json();
}