<template>
  <div class="container">
    <div class="crear">
      <button class="btncrea" v-show="bntCrear" @click="crear">+ Nueva Matrícula</button>
    </div>
    <div class="componets">
      <div>
        <h3 v-if="mensaje">{{ mensaje }}</h3>
      </div>

      <TablaMatricula
        v-if="!mostrar"
        @txt="recibeMensaje"
      />

      <FormMatricula
        v-show="mostrar"
        :guardar="guard"
        :visible="visi"
        @salir="mostrarComp"
        @txt="recibeMensaje"
      />
    </div>
  </div>
</template>

<script>
import TablaMatricula from "@/components/Matricula/TablaMatricula.vue";
import FormMatricula from "@/components/Matricula/FormMatricula.vue";

export default {
  components: {
    TablaMatricula,
    FormMatricula,
  },
  data() {
    return {
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
      this.visi = true; // Showing form
      this.bntCrear = false;
    },
    mostrarComp() {
      this.mostrar = false;
      this.guard = false;
      this.bntCrear = true;
    },
    recibeMensaje(msj) {
      this.guard = false;

      if (msj == 1) {
        this.mensaje = "Matrícula guardada con Éxito";
        this.tiempo();
      }
      if (msj == 3) {
        this.mensaje = "Matrícula anulada con éxito";
        this.tiempo();
      }
      if (msj == 4) {
        this.mensaje = "Registro no encontrado";
        this.tiempo();
      }
      if (msj == 5) {
        this.mensaje = "Error al guardar matrícula";
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

<style scoped>
.container {
  margin: 10px auto;
  padding: 5px 25px;
  background: #fff;
  border-radius: 12px;
  font-family: Arial, sans-serif;
}

.btncrea {
  height: 35px;
  width: 150px;
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
