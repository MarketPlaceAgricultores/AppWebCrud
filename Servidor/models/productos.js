import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: {type: String, require:[true, 'Nombre obligatorio'] },
    descripcion: String,
    productoId: String,
    date: {type: Date, default: Date.now},
    activo: {type: Boolean, default: true}


})

//CONVERTIR A MODELO

const Producto = mongoose.model('Producto', productoSchema);
export default Producto;
