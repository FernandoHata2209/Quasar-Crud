<template>
  <q-page padding class="flex justify-center">
    <q-card class="my-card" style="width: 80%">
      <div class="">

        <div class="row flex flex-center">
          <!-- para colocar o data do array na table, usamos o :columns -->
          <q-table title="Pedidos" :rows="products" :columns="columns" row-key="codigo" class="no-shadow col-11 q-mt-lg"
            bordered selection="multiple" v-model:selected="pedido" separator="cell"
            table-header-style="font-size: 1.1em" :visible-columns="['codigo', 'cliente', 'entrega', 'observacao']"
            @click="findIndex">
            <template v-slot:top>
              <p class="text-h5 q-ma-md">Pedidos</p>
              <q-space></q-space>
              <q-input class="" outlined label="Pesquisar">
                <template v-slot:append>
                  <q-icon name="search"></q-icon>
                </template>
              </q-input>
            </template>

            <!-- 
             -->

            <template 
             #body="props">
              <q-tr :props="props">
                <q-td class="flex flex-center">
                  <q-btn flat round :icon="props.selected ? 'check' : ''" @click='props.selected = !props.selected'
                    style="border: 2px solid gray; border-radius: 3px;" padding="none" size="10px">
                  </q-btn>
                </q-td>
                <q-td :props="props" key="codigo">
                  {{ props.row.codigo }}
                </q-td>
                <q-td :props="props" key="cliente">
                  {{ props.row.cliente }}
                </q-td>
                <q-td :props="props" key="entrega">
                  {{ props.row.entrega }}
                </q-td>
                <q-td :props="props" key="observacao">
                  {{ props.row.observacao }}
                  <span v-show="props.selected" class="q-ml-md">
                    <q-btn class="q-mr-sm" push icon="edit" color="primary" @click="showEdit = true"></q-btn>
                    <q-btn push color="red-9" icon="delete" @click="removeProducts(props.colsMap)"></q-btn>
                  </span>
                </q-td>
              </q-tr>

              <q-dialog  v-model="showEdit" persistent>
                <q-card>
                  <q-card-section class="flex flex-center justify-between col-11 q-mb-md"
                    style="border-bottom: 1px solid grey;">
                    <p class="text-h4 q-ma-sm">Editar Pedido</p>
                    <q-btn round class="q-ma-sm" v-close-popup>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#5f6368">
                        <path
                          d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </q-btn>
                  </q-card-section>
                  <q-card-section>
                    <form :props="props">
                      <div class="row">
                        <div class="col">
                          <q-input v-model="products[0].codigo" outlined label="Codigo" class="q-ma-md"></q-input>
                          <q-input v-model="products.cliente" outlined label="Cliente" class="q-ma-md"></q-input>
                        </div>
                        <div class="col">
                          <q-input v-model="products.entrega" outlined label="Data de Entrega"
                            class="q-ma-md"></q-input>
                          <q-input v-model="newDescription" outlined label="Observação" class="q-ma-md"></q-input>
                        </div>
                      </div>
                      <div class="flex justify-end q-mt-lg q-mb-sm">
                        <q-btn icon="check" push color="primary" outlined @click="editProducts(props.row)"></q-btn>
                      </div>
                    </form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </template>

          </q-table>
        </div>
        <div class="full-width flex justify-end ">
          <q-btn round color='blue-5' class="q-ma-lg" @click="dialog = true">
            <q-icon src="ListToDo\src\assets\add.svg">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fffff">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </q-icon>
          </q-btn>
        </div>
      </div>
    </q-card>

    <!-- q-dialog -->
    <q-dialog v-model="dialog" persistent>
      <q-card class='row col flex flex-center'>
        <q-card-section class="flex flex-center justify-between col-11 q-mb-md" style="border-bottom: 1px solid grey;">
          <p class="text-h4 q-ma-sm">Pedido</p>
          <q-btn round class="q-ma-sm" v-close-popup>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </q-btn>
        </q-card-section>

        <div class="row col-12 flex flex-center">
          <div class="col-11 row">
            <form @submit.prevent="addProducts" class="col-12">
              <div class="flex col-12 row justify-between wrap">
                <div class="col full-width">
                  <q-input v-model.trim="newCode" label="Código" :rules="['date']" outlined class="q-ma-sm"></q-input>
                </div>
                <div class="col full-width">
                  <q-input v-model.trim="newClient" label="Cliente" outlined class="q-ma-sm"></q-input>
                </div>
              </div>
              <div class="flex col-12 justify-between row">
                <div class="col full-width">
                  <q-input v-model.trim="date" mask label="Data de Entrega" outlined class="q-ma-sm">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="date" mask="DD/MM/YYYY">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col full-width">
                  <q-input v-model.trim="newDescription" label="Observação" outlined class="q-ma-sm "></q-input>
                </div>
              </div>
              <div class="col-12 q-mt-md">
                <q-table title="Produtos" :rows="products" :columns="columns" row-key="id"
                  class="no-shadow col-11 q-mt-lg" bordered selection="multiple" v-model:selected="pedido"
                  separator="cell" table-header-style="font-size: 1.1em" :visible-columns="['codigo', 'observacao']">
                  <template v-slot:top>
                    <p class="text-h5 q-ma-md">Pedidos</p>
                    <q-space></q-space>
                    <q-input class="" outlined label="Pesquisar">
                      <template v-slot:append>
                        <q-icon name="search"></q-icon>
                      </template>
                    </q-input>
                    <q-btn round color='blue-5' class="q-ml-lg" @click="dialog = true">
                      <q-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                          fill="#fffff">
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                      </q-icon>
                    </q-btn>
                  </template>
                </q-table>
              </div>
              <div class="q-mt-lg col-12" style="border-top: 1px solid grey">
                <q-card-actions align="right" class="q-pa-lg">
                  <q-btn type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                      fill="#5f6368" class="q-mr-sm">
                      <path
                        d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
                    </svg>
                    Salvar
                  </q-btn>
                </q-card-actions>
              </div>
            </form>
          </div>
        </div>
        <!-- Notice v-close-popup -->
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

  name: 'PageLogin',

  data() {
    return {
      columns: [
        { name: 'codigo', field: 'codigo', align: 'left', label: 'Codigo', sortable: true, headerStyle: 'font-size: 1.1em' },
        { name: 'cliente', field: 'cliente', align: 'left', label: 'Cliente', sortable: true, headerStyle: "font-size: 1.1em" },
        { name: 'entrega', field: 'entrega', align: 'center', label: 'Data de Entrega', sortable: true, headerStyle: "font-size: 1.1em" },
        { name: 'observacao', field: 'observacao', align: 'left', label: 'Observação', sortable: true, headerStyle: 'font-size: 1.1em' },
      ],
      dialog: false,
      showEdit: false,
      products: [{
        id: 1,
        codigo: '1',
        cliente: 'Fernando',
        entrega: '31/10/2023',
        observacao: 'Cuidado, produto perigoso!'
      }],
      newCode: '',
      newClient: '',
      date: '',
      newDescription: '',
      pedido: [],
    }
  },

  methods: {
    addProducts() {
      this.products.push({
        id: this.products.length + 1, codigo: this.newCode, cliente: this.newClient, entrega: this.date, observacao: this.newDescription
      })
      this.newCode = ''
      this.newClient = ''
      this.date = ''
      this.newDescription = ''
    },

    removeProducts(props) {
      this.products.splice(props, 1)
    },

    editProducts(props) {
      console.log(props.row)
    }


  },


})
</script>

<style type="scss"></style>
