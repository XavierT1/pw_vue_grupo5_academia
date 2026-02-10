import axios from "axios";
import router from "@/router"

const BASE_URL = 'http://localhost:8081/matricula/api/v1.0/matriculas';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push({ name: 'login' });
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const manejarError = (error) => {
    if (error.response && error.response.status === 401) {
        console.warn("Sesión expirada (401). Redirigiendo...");
        localStorage.removeItem('token');
        router.push({ name: 'login' });
    }
    throw error;
};

// --- MÉTODOS CRUD ---

const consultarTodos = async () => {
    try {
        const config = getAuthConfig();
        const response = await axios.get(BASE_URL, config);
        return response.data;
    } catch (error) {
        manejarError(error);
    }
};

const consultarPorCedulaEstudiante = async (cedula) => {
    try {
        const config = getAuthConfig();
        const response = await axios.get(`${BASE_URL}/cedula/${cedula}`, config);
        return response.data;
    } catch (error) {
        manejarError(error);
    }
};

const matricular = async (body) => {
    try {
        const config = getAuthConfig();
        const response = await axios.post(BASE_URL, body, config);
        return response.data;
    } catch (error) {
        manejarError(error);
    }
};

const borrar = async (id) => {
    try {
        const config = getAuthConfig();
        const response = await axios.delete(`${BASE_URL}/${id}`, config);
        return response.data;
    } catch (error) {
        manejarError(error);
    }
};

// --- FACHADAS ---

export const mostrarTodosFachada = async () => {
    return await consultarTodos();
};

export const mostrarPorCedulaEstudianteFachada = async (cedula) => {
    return await consultarPorCedulaEstudiante(cedula);
};

export const matricularFachada = async (body) => {
    return await matricular(body);
};

export const borrarFachada = async (id) => {
    return await borrar(id);
};
