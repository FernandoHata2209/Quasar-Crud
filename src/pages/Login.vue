<template>
  <q-page padding class="flex justify-center">
    <q-card class="my-card" style="width: 80%">
      <div class="">

        <div class="row flex flex-center">
          <!-- para colocar o data do array na table, usamos o :columns -->
          <q-table title="Pedidos" :rows="product" :columns="columns" row-key="codigo" class="no-shadow col-11 q-mt-lg"
            bordered selection="multiple" v-model:selected="teste" separator="cell"
            table-header-style="font-size: 1.1em" :visible-columns="['codigo', 'cliente', 'entrega', 'observacao']">
            <template v-slot:top>

              <p class="text-h5 q-ma-md">Pedidos</p>
              <q-space></q-space>
              <q-input class="" outlined label="Pesquisar">
                <template v-slot:append>
                  <q-icon name="search"></q-icon>
                </template>
              </q-input>
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
            <form @submit.prevent="addProduct" class="col-12">
              <div class="flex col-12 row justify-between wrap">
                <div class="col full-width">
                  <q-input v-model.trim="product.codigo" label="Código" outlined class="q-ma-sm"></q-input>
                </div>
                <div class="col full-width">
                  <q-input v-model.trim="newClient" label="Cliente" outlined class="q-ma-sm"></q-input>
                </div>
              </div>
              <div class="flex col-12 justify-between row">
                <div class="col full-width">
                  <q-input type="date" v-model.trim="newDate" label="Data de Entrega" outlined class="q-ma-sm ">
                        
                  </q-input>
                </div>
                <div class="col full-width">
                  <q-input v-model.trim="newDescription" label="Observação" outlined class="q-ma-sm "></q-input>
                </div>
              </div>
              <div class="col-12 q-mt-md">
                <q-table title="Produtos" :rows="product" :columns="columns" row-key="id"
                  class="no-shadow col-11 q-mt-lg" bordered selection="multiple" v-model:selected="teste"
                  separator="cell" table-header-style="font-size: 1.1em"
                  :visible-columns="['codigo', 'observacao']">
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
                  <q-btn type="submit" :disabled="newClient == '' || newDescription == '' || newDate == '' || product == ''">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                      fill="#5f6368" class="q-mr-sm" >
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
      teste: [],
      product: [{
        codigo: 1,
        cliente: 'Fernando',
        entrega: '29/10/2023',
        observacao: 'Cuidado, produto perigoso!'
      }],
      newClient: '',
      newDate: '',
      newDescription: ''
    }
  },

  methods: {
    arrayName() {
      console.log(this.product)
    },

    addProduct() {
      this.product.push({
        codigo: this.product.length + 1, cliente: this.newClient, entrega: this.newDate, observacao: this.newDescription
      })
      
      this.newClient = ''
      this.newDate = ''
      this.newDescription = ''
    }
  }

})
</script>

<style type="scss"></style>
