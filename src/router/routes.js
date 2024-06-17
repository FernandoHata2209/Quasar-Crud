
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Pedidos', name: "crudPedidos", component: () => import('src/pages/CrudPedidos.vue') },
      { path: 'Produtos', name: "crudProdutos", component: () => import('src/pages/CrudProdutos.vue') },
      { path: 'BaterPonto', name: "baterPonto", component: () => import('src/pages/BaterPonto.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
