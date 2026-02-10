import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TablaCursosView from '@/views/CursoView/TablaCursosView.vue'
import EstudianteView from '@/views/EstudianteView/EstudianteView.vue'

import MatriculaView from '@/views/MatriculaView/MatriculaView.vue'

const routes = [


  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      hideNavbar: true,
    }
  },

  
  {
    path: '/mostrar/estudiantes',
    name: 'mostrarEstudiantes',
    component: EstudianteView,
    meta: {
      requiereAutorizacion: true
    }
  },
  {
      path: '/mostrar/cursos',
      name: 'mostrarCursos',
      component: TablaCursosView,
      meta: {
        requiereAutorizacion: true
      }
    },
    {
      path: '/mostrar/matricula',
      name: 'mostrarMatricula',
      component: MatriculaView,
      meta: {
        requiereAutorizacion: true
      }
    },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiereAutorizacion: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiereAutorizacion) {
    const estaAutenticado = localStorage.getItem("estaAutenticado");
    const token = localStorage.getItem("token");
    if (!estaAutenticado) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
