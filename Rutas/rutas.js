const express=require('express')//Requerir un modulo
const rutas=express.Router();//Requerir el modulo Router
const controller=require('../controlador/controller')////Requerir un modulo, Hecho por nosotross, requerido en controlador
rutas.get('/',controller.indexprin);//Atrapar metodo control index
rutas.get('/login',controller.index);//Atrapar metodo control index

rutas.post('/login',controller.login)//Atrapar metodo control login
rutas.get('/ventavehiculo',controller.consultarventas);//Llamar a la funcion consulta general
rutas.get('/ventastotales',controller.consultarventastotales);//Llamar a la funcion consulta general
rutas.post('/frminsertar',controller.insertarventas);//Informacion de tipo post, conectarse con el formulario, llamar la funcion insertar

rutas.get('/vvendedor',controller.vistavendedor);
rutas.get('/vcomprador',controller.vistacomprador);
rutas.get('/vadministrador',controller.vistaadministrador);

rutas.post('/actdatvendedor',controller.actualizardatven);
rutas.get('/dappersonvendedor',controller.consultadatvendedor);
rutas.get('/datpersonalesusuarios',controller.datosusuarios);
rutas.post('/frminsertarusu',controller.insertardatusuarios);

rutas.get('/usuarioscon',controller.consultarusuariosc);
rutas.post('/frminsertarusuco',controller.insertarusuarioscon);

rutas.post('/actusuarioscon',controller.actualizarusuarioscon);
rutas.post('/eliusuarioscon',controller.eliminarusuarioscon);

rutas.get('/vehiculos',controller.vehiculos);

rutas.post('/actdatusuarios',controller.actualizardatpersonusuarios);
rutas.post('/elidatusuarios',controller.eliminardatpersonusuarios);

rutas.get('/usuariorol',controller.consultarroles);
rutas.post('/frminsertarroles',controller.insertarroles);

rutas.get('/categorias',controller.cat);
rutas.post('/c1',controller.catvehiculo);
rutas.post('/datosvendedor',controller.datosvendedor);

rutas.get('/precio',controller.pre);
rutas.post('/pre',controller.prevehiculo);
rutas.post('/datos2',controller.datosvendedor2);

rutas.get('/cambioroldecomprador',controller.cambiocompradorroles);
rutas.post('/cambioderol',controller.cambiarrol);

rutas.get('/cerrar',controller.cerrar);










module.exports=rutas//exportar lo que se requiere en el app
