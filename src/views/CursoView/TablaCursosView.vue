<template>
  <div class="container">
    <div class="crear">
      <button class="btncrea" v-show="bntCrear" @click="crear">+ Crear Curso</button>
    </div>
    <div class="componets">
      <div>
        <h3>{{ mensaje }}</h3>
      </div>

      <TablaCursos
        v-if="!mostrar"
        @editar="recibecodigo"
        @txt="recibeMensaje"
      />
      <br>
      <FormCurso
        v-show="mostrar"
        :codigoBuscar="codigoBuscar"
        :guardar="guard"
        :visible="visi"
        @salir="mostrarComp"
        @txt="recibeMensaje"
      />
    </div>
  </div>
</template>

<script scoped>
import TablaCursos from "@/components/Curso/TablaCursos.vue";
import FormCurso from "@/components/Curso/FormCurso.vue";
export default {
  components: {
    TablaCursos,
    FormCurso,
  },
  data() {
    return {
      codigoBuscar: "",
      mostrar: false,
      mensaje: "",
      guard: false,
      visi: true,
      bntCrear: true,
    };
  },

  methods: {
    crear() {
      this.mostrar = true;
      this.guard = true;
      this.visi = false;
      this.bntCrear = false;
    },
    recibecodigo(id) {
      this.codigoBuscar = id;
      this.mostrar = true;
      this.visi = true;
      this.bntCrear = false;

      console.log("padres", this.codigoBuscar);
    },
    mostrarComp() {
      console.log("salio");
      this.mostrar = false;
      this.guard = false;
      this.codigoBuscar = "";
      this.bntCrear = true;
    },
    recibeMensaje(msj) {
      this.guard = false;

      if (msj == 1) {
        this.mensaje = "Se guardo con Exito";
        this.tiempo();
      }
      if (msj == 2) {
        this.mensaje = "Se Actualizo con Exito";
        this.tiempo();
      }
      if (msj == 3) {
        this.mensaje = "Registro eliminado";
        this.tiempo();
      }
      if (msj == 4) {
        this.mensaje = "Registro no encontrado";
        this.tiempo();
      }
    },
    tiempo() {
      setTimeout(() => {
        this.mensaje = "";
      }, 4000);
    },
  },
};
</script>

<style >
.container {
  margin: 10px auto;
  padding: 5px 25px;
  background: #fff;
  border-radius: 12px;
  font-family: Arial, sans-serif;
}

.btncrea {
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

button:hover {
  background: #574b90;
  transform: scale(1.03);
}
</style>