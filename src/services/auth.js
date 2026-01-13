export const users = [
    { user: "admin", pass: "1234", role: "ADMIN" },
    { user: "consulta", pass: "1234", role: "CONSULTA" },
];

export function login(username, password) {
    return users.find(
        (u) => u.user === username && u.pass === password
    );
}