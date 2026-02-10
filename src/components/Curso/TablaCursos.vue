<template>
  <div class="container">
    <div class="container_buscar">
      <p class="buscar">
        <input
          type="text"
          id="codigo_buscar"
          v-model="codigoBuscar"
          placeholder="buscar por código"
        />
        <button class="btn" @click="buscar">Buscar</button>
      </p>
    </div>
    <div class="datos">
      <table class="table">
        <thead class="thead">
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Cupos</th>
            <th v-show="acciones">Acción</th>
            <th v-show="acciones">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="curso in curso" :key="curso.id">
            <td>{{ curso.codigoCurso }}</td>
            <td>{{ curso.nombre }}</td>
            <td>{{ curso.cupos }}</td>
            <td v-show="acciones">
              <button class="edi" @click="editar(curso.id)">Editar</button>
            </td>
            <td v-show="acciones">
              <button class="eli" @click="eliminar(curso.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button v-show="acciones" @click="regresar">Regresar</button>
  </div>
</template>


<script>
import {
  mostrarPorIdFachada,
  mostrarPorCodigoFachada,
  mostrarTodosFachada,
  borrarFachada,
} from "@/clients/CursoClient";
export default {
  data() {
    return {
      acciones: false,
      codigoBuscar: "",
      curso: {
        id: "",
        codigoCurso: "",
        nombre: "",
        cupos: "",
      },
    };
  },
  mounted() {
    this.Todos();
  },
  methods: {
    async Todos() {
      const resp = await mostrarTodosFachada();
      if (resp) {
        console.log(resp);
        this.curso = resp;
      }
    },
    async buscar() {
      try {
        const resp = await mostrarPorCodigoFachada(this.codigoBuscar);
        if (resp) {
          this.curso = [resp];
          this.acciones = true;
          this.codigoBuscar = "";
        }
      } catch {
        this.codigoBuscar = "";
        this.$emit("txt", 4);
      }
    },
    regresar() {
      this.Todos();
      this.acciones = false;
      console.log("buscar", this.curso);
    },
    editar(id) {
      this.$emit("editar", id);
    },

    async eliminar(id) {
      await borrarFachada(id);
      this.Todos();
      this.acciones = false;
      this.idBuscar = "";
      this.$emit("txt", 3);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
}

.datos {
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.container-buscar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
input {
  flex: 1;
  height: 42px;
  width: 250px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
button.btn {
  height: 35px;
  width: 100px;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}
button.btn:hover {
  background: #574b90;
  transform: scale(1.03);
}
.datos {
  margin: 30px auto;
  max-width: 800px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.table thead th {
  padding: 12px 15px;
  text-align: center;
  background-color: #847fe0;
  color: white; 
  font-weight: bold;
}

.table td {
  padding: 8px 11px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
button.edi {
  background: #4caf50; 
  color: white;
  border: 5px;
  border-radius: 8px;
  width: 80px;
}

.table button.edi:hover {
  background: #357a37;
}

button.eli {
  background: #ca1306;
  color: white;
  border: 5px;
  border-radius: 8px;
  width: 80px;
}

.table button.eli:hover {
  background: #891f1f;
  border: none;
}

button[v-show="acciones"] {
  margin-top: 15px;
  padding: 10px 20px;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
</style>