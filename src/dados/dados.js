import { reactive } from "vue";

export const dados = reactive({
  colunasProdutos: [
    {
      name: "codigo",
      field: "codigo",
      align: "center",
      label: "Codigo",
      sortable: true,
      headerStyle: "font-size: 1.1em",
    },
    {
      name: "descricao",
      field: "descricao",
      align: "left",
      label: "Descrição",
      sortable: true,
      headerStyle: "font-size: 1.1em",
    },
  ],
  produtos: [
    {
      id: 1,
      codigo: "1",
      descricao: "Camisa",
    },
    {
      id: 2,
      codigo: "2",
      descricao: "Calça",
    },
    {
      id: 3,
      codigo: "3",
      descricao: "Sapato",
    },
    {
      id: 4,
      codigo: "4",
      descricao: "Boné",
    },
    {
      id: 5,
      codigo: "5",
      descricao: "Jaqueta",
    },
    {
      id: 6,
      codigo: "6",
      descricao: "Meias",
    },
    {
      id: 7,
      codigo: "7",
      descricao: "Cinto",
    },
    {
      id: 8,
      codigo: "8",
      descricao: "Gravata",
    },
    {
      id: 9,
      codigo: "9",
      descricao: "Relógio",
    },
    {
      id: 10,
      codigo: "10",
      descricao: "Óculos de Sol",
    },
  ],

  colunasPedidos: [
    { name: "codigo", field: "codigo", label: "Código", align: "left", headerStyle: "font-size: 1.1em", sortable: true, },
    { name: "cliente", field: "cliente", label: "Cliente", align: "left", headerStyle: "font-size: 1.1em", sortable: true, },
    { name: "entrega", field: "entrega", label: "Entrega", align: "center", headerStyle: "font-size: 1.1em", sortable: true, },
    { name: "observacao", field: "observacao", label: "Observação", align: "left", headerStyle: "font-size: 1.1em", sortable: true, },
  ],
  pedidos: [
    {
      id: 1,
      codigo: "1",
      cliente: "Fernando",
      entrega: "06/06/2024",
      observacao: "Perigo, tomar cuidado!",
      produto: [
        {
          id: 2,
          codigo: "2",
          descricao: "Calça",
        }
      ]
    },
    {
      id: 2,
      codigo: "2",
      cliente: "Henrique",
      entrega: "20/10/2024",
      observacao: "Cuidado, produto muito perigoso!",
      produto: [
        {
          id: 2,
          codigo: "2",
          descricao: "Calça",
        }
      ]
    },
  ],

  produtoSelecionadoAdicionar: [],
  pedidoSelecionado: [],
  produtoSelecionadoEditar: [],
  produtoSelecionado: [],

  // Dados do Bater Ponto

  colunas: [{
    name: "dia",
    label: "Dia",
    field: "dia",
    align: "left",
    sortable: true,
    filterable: true,
    headerStyle: "color: grey;"
  },
  {
    name: "previstas",
    label: "Previstas",
    field: "previstas",
    align: "left",
    sortable: true,
    filterable: true,
    headerStyle: "color: grey"
  },
  {
    name: "realizadas",
    label: "Realizadas",
    field: "realizadas",
    align: "left",
    sortable: true,
    filterable: true,
    headerStyle: "color: grey;"
  },
  {
    name: "resultado",
    label: "Resultado",
    field: "resultado",
    align: "left",
    sortable: true,
    filterable: true,
    headerStyle: "color: grey;"
  }
  ],
  horas: [
    {
      id: 1,
      previstas: "06:00",
      realizadas: "08:00",
      resultado: "02:00:00",
      horario: [
        {
          id: 1,
          horario: "07:54",
          descrição: "Inicio",
          dia: "01/01/2021",
        },
        {
          id: 2,
          horario: "14:07",
          descrição: "Final",
          dia: "01/01/2021"
        }
      ]
    }
  ],
  login: [
    {
      username: "Fernando",
      senha: "123"
    },
    {
      username: "Henrique",
      senha: "123"
    },
    {
      username: "Carlos",
      senha: "123"
    },
    {
      username: "Pedro",
      senha: "123"
    }
  ]
})
