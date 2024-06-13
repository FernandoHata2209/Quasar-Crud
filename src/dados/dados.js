import { reactive } from "vue";

export const dados = reactive({
  colunasProdutos: [
    {
      name: "codigo",
      field: "codigo",
      align: "left",
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
    { name: "codigo", label: "Código", align: "left", headerStyle: "font-size: 1.1em", },
    { name: "cliente", label: "Cliente", align: "left", headerStyle: "font-size: 1.1em", },
    { name: "entrega", label: "Entrega", align: "center", headerStyle: "font-size: 1.1em", },
    { name: "observacao", label: "Observação", align: "left", headerStyle: "font-size: 1.1em", },
  ],
  pedidos: [
    {
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

  produtoSelecionadoAdcio: [],
  pedidoSelecionado: [],
  produtoSelecionadoEditar: [],
})
