<template>
  <nav v-if="!$route.meta.hideNavbar">
    <router-link to="/mostrar/estudiantes">Estudiantes</router-link> |
    <router-link to="/mostrar/cursos">Cursos</router-link> |
    <router-link to="/mostrar/matricula">Matrícula</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 25px;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);

}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #4907ad;
}
</style>
