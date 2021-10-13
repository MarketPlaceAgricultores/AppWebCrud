<template>
<div class="container">
        <h1>Productos</h1>

    <b-alert>
    :show="dismissCountDown"
    dismissible
    :variant="mensaje.color"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged">
    {{mensaje.texto}}
    </b-alert>
        
        <form @submit.prevent="editarProducto(productoEditar)" v-if="editar">
            <h3>Editar producto</h3>

            <input type="text" class="form-control my-2" placeholder="Nombre" v-model="productoEditar.nombre">
            <input type="text" class="form-control my-2" placeholder="Descripcion" v-model="productoEditar.descripcion">
            <b-button class="btn-success my-2 mx-2" type="submit">Editar</b-button>
            <b-button class="my-2" type="submit" @click="editar=false">Cancelar</b-button>
            
        </form>        
        <form @submit.prevent="agregarProducto()" v-if="!editar">
            <h3>Agregar un nuevo producto</h3>

            <input type="text" class="form-control my-2" placeholder="Nombre" v-model="producto.nombre">
            <input type="text" class="form-control my-2" placeholder="Descripcion" v-model="producto.descripcion">
            <b-button class="btn-success my-2" type="submit">Agregar</b-button>
            
        </form>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Productos</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in productos" :key="index">
                <th scope="row">{{item._id}}</th>
                <td>{{item.nombre}}</td>
                <td>{{item.descripcion}}</td>
                <td>
                    <button class="btn-danger mx-2" @click="eliminarProducto(item._id)">Eliminar</button>
                    <button class="btn-warning mx-2" @click="activarEdicion(item._id)">Editar</button>
                </td>

            </tr>
    
        </tbody>
    </table>
    
</div>

</template>

<script>
export default {
   
   data() {
       
       return{

           productos:[],
           mensaje: {color: 'success', texto: ''},
           dismissSecs: 5,
           dismissCountDown: 0,

           producto:{nombre:"", descripcion:""},
           editar: false,
           productoEditar: {},
       }

   },

   created(){

       this.listarProductos();

   },

   methods: {

       listarProductos(){

           this.axios.get('/producto')
           .then(res=>{

               this.productos=res.data;

           })
           .catch(e=>{

               console.log(e.reponse)

           })

       },

       agregarProducto(){


            this.axios.post('/nuevo-producto', this.producto)
            .then(res => {
            
                this.productos.push(res.data);
                this.producto.nombre="";
                this.producto.descripcion="";
                this.mensaje.texto = 'Producto Agregado!';
                this.mensaje.color = 'success';
                this.showAlert();
            
            })
            .catch( e => {
            
                console.log(e.reponse);


            })

       },

       eliminarProducto(id){

            this.axios.delete(`/producto/${id}`)
                .then(res=>{

                    const index = this.productos.findIndex(item=> item._id===res.data._id);
                    this.productos.splice(index, 1);
                    this.mensaje.color="success";
                    this.mensaje.texto="Producto Eliminado";
                    this.showAlert();


                })
                .catch(e=>{

                        console.log(e.response);
                })


       },
       activarEdicion(id){

            this.editar=true;
            this.axios.get(`/producto/${id}`)
            .then(res=>{

                this.productoEditar=res.data;

            })
            .catch(e=>{

                console.log(e.response);

            })
            
        },

        editarProducto(item){

            this.axios.put(`/producto/${item._id}`, item)
            .then(res=>{
                const index= this.productos.findIndex(n=> n._id===res.data._id);
                this.productos[index].nombre=res.data.nombre;
                this.productos[index].descripcion=res.data.descripcion;
                this.mensaje.color="success";
                this.mensaje.texto="Producto Editado";
                this.showAlert();
                this.editar=false;


            })
             .catch(e=>{

                // console.log(_id);
                // console.log(body);

                console.log(e.response);

            })
        },

       countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
    
   }
    
}
</script>