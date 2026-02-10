<template>
  <div class="container">
    <div class="crear">
      <button class="btncrea" v-show="bntCrear" @click="crear">+ Crear Estudiante</button>
    </div>
    <div class="componets">
      <div>
        <h3 v-if="mensaje">{{ mensaje }}</h3>
      </div>

      <TablaEstudiantes
        v-if="!mostrar"
        @editar="recibecodigo"
        @txt="recibeMensaje"
      />
      <br/>
      <FormEstudiante
        v-show="mostrar"
        :idBuscar="idBuscar"
        :guardar="guard"
        :visible="visi"
        @salir="mostrarComp"
        @txt="recibeMensaje"
      />
    </div>
  </div>
</template>


<script>
import TablaEstudiantes from "@/components/Estudiante/TablaEstudiantes.vue";
import FormEstudiante from "@/components/Estudiante/FormEstudiante.vue";

export default {
  components: {
    TablaEstudiantes,
    FormEstudiante,
  },
  data() {
    return {
      idBuscar: "",
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
      this.idBuscar = id;
      this.mostrar = true;
      this.visi = true;
      this.bntCrear = false;
    },
    mostrarComp() {
      this.mostrar = false;
      this.guard = false;
      this.idBuscar = "";
      this.bntCrear = true;
    },
    recibeMensaje(msj) {
      this.guard = false;

      if (msj == 1) {
        this.mensaje = "Se guardó con Éxito";
        this.tiempo();
      }
      if (msj == 2) {
        this.mensaje = "Se Actualizó con Éxito";
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