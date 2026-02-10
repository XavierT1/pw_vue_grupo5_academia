<template>
  <div class="container">
    <h3>Nueva Matrícula</h3>
    <form action="">
      <div v-show="visible" class="datos">
        
        <label>Cédula Estudiante:</label>
        <input 
          type="number" 
          v-model="cedulaInput" 
          placeholder="Ingrese cédula"
        />

        <label>Código Curso:</label>
        <input 
          type="text" 
          v-model="codigoInput" 
          placeholder="Ingrese código de curso"
        />

      </div>

      <div class="botones">
        <button 
          type="submit" 
          v-show="guardar" 
          @click.prevent="guardarMatricula"
        >
          Guardar
        </button>
        <button @click.prevent="cancelar">Cancelar</button>
      </div>
      <h3>{{ mensaje }}</h3>
    </form>
  </div>
</template>


<script>
import { matricularFachada } from "@/clients/MatriculaClient";
import { mostrarPorCedulaFachada } from "@/clients/EstudianteClient";
import { mostrarPorCodigoFachada } from "@/clients/CursoClient";

export default {
  props: {
    guardar: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      matricula: {
        estudianteId: "",
        cursoId: "",
      },
      cedulaInput: "",
      codigoInput: "",
      mensaje: "",
    };
  },
  methods: {
    async guardarMatricula() {
      if (!this.cedulaInput || !this.codigoInput) {
        this.mensaje = "Ingrese cédula y código";
        this.tiempo();
        return;
      }

      try {
        // 1. Buscar Estudiante
        const est = await mostrarPorCedulaFachada(this.cedulaInput);
        if (!est || !est.id) {
          this.mensaje = "Estudiante no encontrado";
          this.tiempo();
          return;
        }

        // 2. Buscar Curso
        const cur = await mostrarPorCodigoFachada(this.codigoInput);
        if (!cur || !cur.id) {
          this.mensaje = "Curso no encontrado";
          this.tiempo();
          return;
        }

        // 3. Matricular
        this.matricula.estudianteId = est.id;
        this.matricula.cursoId = cur.id;

        await matricularFachada(this.matricula);
        this.$emit("salir");
        this.$emit("txt", 1);
        this.limpiar();
      } catch (error) {
        console.error(error);
        this.mensaje = "Error al guardar matrícula";
        this.tiempo();
      }
    },
    cancelar() {
      this.$emit("salir");
      this.limpiar();
    },
    limpiar() {
      this.matricula = {
        estudianteId: "",
        cursoId: "",
      };
      this.cedulaInput = "";
      this.codigoInput = "";
    },
    tiempo() {
      setTimeout(() => {
        this.mensaje = "";
      }, 4000);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 10px auto; 
  padding: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.datos {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.datos label {
  text-align: left;
  font-weight: bold;
  color: #555;
  margin-bottom: 4px;
}

input {
  height: 42px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #6c63ff;
  box-shadow: 0 0 6px rgba(108, 99, 255, 0.4);
  outline: none;
}

button {
  height: 35px;
  width: 100px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 25px;
}

.botones button:hover {
  transform: scale(1.05);
}

.botones button:nth-child(1) {
  background: #4caf50;
  color: white;
}

.botones button:nth-child(2) {
  background: #f95d52;
  color: white;
}

h3 {
  text-align: center;
  margin-top: 20px;
  color: #333;
}
</style>