const connection=require('../conexion/conexion');
const cnn=connection();
const {render}=require('ejs');
const bcryptjs=require('bcryptjs');
const controller={};


controller.index=(req,res,next)=>{
    res.render('login')
    res.send("error en contolador");
}
controller.indexprin=(req,res,next)=>{
    res.render('paginainicio')
    
}
/*
controller.vistaclientes=(req,res,next)=>{
    res.render('vclientes')
    
}
controller.vistaadministrador=(req,res,next)=>{
    res.render('vadministrador')
    
}*/

//BOQUE PARA INSERTAR USUARIOS

controller.login=async(req,res,next)=>{  
    const usu =  req.body.usu;  
    const cla = await req.body.cla;
    console.log(usu+cla);
    cnn.query('SELECT * FROM usuarios WHERE nomusu=?',[usu],async(err,results)=>{  
        if(err){
            next(new Error("Error de consulta",err)); 
    
        }
        else if(results!=0 && await(bcryptjs.compare(cla,results[0].clave))){
            idusu=results[0].idusu;
            console.log(idusu)
            
            cnn.query('SELECT * FROM usurol WHERE idusu=?',[idusu],async(err,results)=>{
                rol=results[0].rolid;
                console.log(rol)
                cnn.query('SELECT * FROM datosusu WHERE idusu=?',[idusu],async(err,results)=>{
                    iddat=results[0].iddat;
                    
                    req.session.Login=true; 
                    req.session.iddat=results[0].iddat;
                    idusu=results[0].idusu;
                    req.session.idusu=results[0].idusu;
                    if(rol=="1003"){
                        res.redirect('vadministrador');
                    }
                    else if(rol=="1001"){
                        res.redirect('vcomprador');
                    }
                    else if(rol=="1002"){
                        res.redirect('vvendedor')
                    }
                }) 
            })

        }
       else {
            console.log("Datos incorrectos"); 
            res.redirect('login');
        }
    })
}

controller.vehiculos=(req,res,next)=>{
    
   
   cnn.query('SELECT * FROM vehiculo',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('vehiculos',{datos:resbd});
       }
   }) 
   
    
}
controller.consultarventas=(req,res,next)=>{
  

    cnn.query('SELECT * FROM ventas WHERE vidvendedor=?',[idusu],(err,resbd)=>{
        if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
        }
        else{
            // console.log(resbd)
            res.render('ventavehiculo',{datos:resbd});
        }
    }) 

       
}


controller.insertarventas=async(req,res,next)=>{
const v1=req.body.idventa;
const v2=req.body.vplaca;
const v3=req.body.vidvendedor;
const v4=req.body.vidcategoria;
const v5=req.body.vcolor;
const v6=req.body.vestado;
const v7=req.body.vprecio;
const v8=req.body.vidcomprador;

//const password=await bcryptjs.hash(c,8)

             
cnn.query('INSERT INTO ventas SET?',{idventa:v1,vplaca:v2,vidvendedor:v3,vidcategoria:v4,vcolor:v5,vestado:v6,vprecio:v7,vidcomprador:v8},(err,resbd)=>{
    
    if(err){
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('ventavehiculo');
     }
 
 
});

}
controller.consultarventastotales=(req,res,next)=>{
    
   
    cnn.query('SELECT * FROM ventas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
           // console.log(resbd)
            res.render('ventastotales',{datos:resbd});
        }
    }) 
    
 }
controller.consultadatvendedor=(req,res,next)=>{
  

    cnn.query('SELECT * FROM datosusu WHERE idusu=?',[idusu],(err,resbd)=>{
        if(err){
            next(new Error(err))  
            console.log("Error en la consulta")
        }
        else{
            // console.log(resbd)
            res.render('dappersonvendedor',{datos:resbd});
        }
    }) 
        

       
}

controller.actualizardatven=async(req,res,next)=>{
    const idusu1=req.body.dat11;
    const nom1=req.body.dat1;
    const ape1=req.body.dat2;
    const tel1=req.body.dat3;
    const cor1=req.body.dat4;
    
   
    cnn.query('UPDATE datosusu SET  nom="'+nom1+'",apellido="'+ape1+'",telefono="'+tel1+'",correo="'+cor1+'" WHERE iddat="'+idusu1+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            
           
        }
        res.redirect('dappersonvendedor')
        




    })
}

controller.insertardatusuarios=async(req,res,next)=>{
    const h1=req.body.iddat;
    const h2=req.body.idusu;
    const h3=req.body.nom;
    const h4=req.body.apellido;
    const h5=req.body.tipodoc;
    const h6=req.body.numdoc;
    const h7=req.body.telefono;
    const h8=req.body.correo;
    
    //const password=await bcryptjs.hash(c,8)
    
                 
    cnn.query('INSERT INTO datosusu SET?',{iddat:h1,idusu:h2,nom:h3,apellido:h4,tipodoc:h5,numdoc:h6,telefono:h7,correo:h8},(err,resbd)=>{
        
        if(err){
             next(new Error(err));
         }
         else{
             //console.log(resbd);
    
             //res.render('index',{datos:respbd})
             res.redirect('datpersonalesusuarios');
         }
     
     
    });
    
    }

controller.datosusuarios=(req,res,next)=>{
  
   
   cnn.query('SELECT * FROM datosusu',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('datpersonalesusuarios',{datos:resbd});
       }
   }) 
   
}


controller.consultarusuariosc=(req,res,next)=>{
   
   
   cnn.query('SELECT * FROM Usuarios',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('usuarioscon',{datos:resbd});
       }
   }) 
   

}
controller.insertarusuarioscon=async(req,res,next)=>{
const e1=req.body.idusu;
const e2=req.body.nomusu;
const e3=req.body.clave;
const password=await bcryptjs.hash(e3,8);



             
cnn.query('INSERT INTO usuarios SET?',{idusu:e1,nomusu:e2,clave:password},(err,resbd)=>{
    
    if(err){
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('usuarioscon');
     }
 
 
});


}



controller.actualizarusuarioscon=async(req,res,next)=>{
    const cc1=req.body.l1;
    const cc2=req.body.l2;
    const cc3=req.body.l3;
    const password=await bcryptjs.hash(cc3,8);
    
    
    cnn.query('UPDATE usuarios SET nomusu="'+cc2+'",clave="'+password+'" WHERE idusu="'+cc1+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
        console.log("Actualizado")
        res.redirect('usuarioscon');
      }
    })
}

controller.eliminarusuarioscon=async(req,res,next)=>{
    const eqw=req.body.ele
    console.log(eqw)

    cnn.query('DELETE  FROM usuarios WHERE idusu="'+eqw+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Eliminado");
            res.redirect('usuarioscon');
        }
    })
}


controller.actualizardatpersonusuarios=async(req,res,next)=>{
const var1=req.body.j1;
const var2=req.body.j2;
const var3=req.body.j3;
const var4=req.body.j4;
const var5=req.body.j5;
const var6=req.body.j6;
const var7=req.body.j7;
const var8=req.body.j8;
console.log(var2)

cnn.query('UPDATE datosusu SET iddat="'+var1+'",nom"'+var3+'",apellido="'+var4+'", tipodoc="'+var5+'",numdoc="'+var6+'",telefono="'+var7+'",correo="'+var8+'" WHERE idusu="'+var2+'"', async(err,respbb)=>{
    if(err){
        next(new Error(err));
    }
    else{
      console.log("Actualizado")
      res.redirect('datpersonalesusuarios');
    }
})
}


controller.eliminardatpersonusuarios=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM datosusu WHERE idusu="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Eliminado");
            res.redirect('datpersonalesusuarios');
        }
    })
}




controller.cerrar=(req,res,next)=>{
req.session.destroy(()=>{
    res.redirect('/');
});


}




























controller.consultaclientes=(req,res,next)=>{
    if(req.session.login){
   
   cnn.query('SELECT * FROM clientes',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('clientes',{datos:resbd});
       }
   }) 
   
    }
    else{
        res.redirect('/');
    }
}







controller.insertarclientes=async(req,res,next)=>{
const j1=req.body.doccli;
const j2=req.body.nomcli;
const j3=req.body.apecli;
const j4=req.body.correocli;
const j5=req.body.celulra;
const j6=req.body.sexo;
const j7=req.body.fechanaccli;

             
cnn.query('INSERT INTO clientes SET?',{doccli:j1,nomcli:j2,apecli:j3,correocli:j4,celulra:j5,sexo:j6,fechanaccli:j7},(err,resbd)=>{
    
    if(err){
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('clientes');
     }
 
 
});


}


controller.actualizarclientes=async(req,res,next)=>{
    const docc=req.body.c1;
    const nomc=req.body.c2;
    const apec=req.body.c3;
    const corrc=req.body.c4;
    const celc=req.body.c5;
    const sexc=req.body.c6;
    const fecc=req.body.c7;
    
    cnn.query('UPDATE clientes SET nomcli="'+nomc+'",apecli="'+apec+'",correocli="'+corrc+'", celulra="'+celc+'",sexo="'+sexc+'", fechanaccli="'+fecc+'" WHERE doccli="'+docc+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
        console.log("Actualizado")
        res.redirect('clientes');
      }
    })
}


controller.eliminarclientes=async(req,res,next)=>{
    const tage=req.body.docu1cli
    console.log(tage)
    
    
    
    cnn.query('DELETE  FROM clientes WHERE doccli="'+tage+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Eliminado");
            res.redirect('clientes');
        }
    })
}
    

controller.consultarroles=(req,res,next)=>{
   
   
   cnn.query('SELECT * FROM usurol',(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('usuariorol',{datos:resbd});
       }
   }) 
  
}
controller.insertarroles=async(req,res,next)=>{
const da1=req.body.rolid;
const ua1=req.body.idusu;


             
cnn.query('INSERT INTO usurol SET?',{rolid:da1,idusu:ua1},(err,resbd)=>{
    
    if(err){
         next(new Error(err));
     }
     else{
         //console.log(resbd);

         //res.render('index',{datos:respbd})
         res.redirect('usuariorol');
     }
 
 
});


}


controller.vistacomprador=(req,res,next)=>{
    console.log(req.session.idusu)
    
   
   cnn.query('SELECT * FROM datosusu WHERE idusu=?',[req.session.idusu],(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('vcomprador',{datos:resbd});
       }
   }) 
   
    
}


controller.vistavendedor=(req,res,next)=>{
    console.log(req.session.idusu)
    
   
   cnn.query('SELECT * FROM datosusu WHERE idusu=?',[req.session.idusu],(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('vvendedor',{datos:resbd});
       }
   }) 
   
    
}


controller.vistaadministrador=(req,res,next)=>{
    console.log(req.session.idusu)
    
   
   cnn.query('SELECT * FROM datosusu WHERE idusu=?',[req.session.idusu],(err,resbd)=>{
       if(err){
         next(new Error(err))  
         console.log("Error en la consulta")
       }
       else{
          // console.log(resbd)
           res.render('vadministrador',{datos:resbd});
       }
   }) 
   
    
}



controller.cat=async(req,res,next)=>{
            
    res.render('categorias');
}
controller.catvehiculo=async(req,res,next)=>{
    const ct=req.body.catid;
    console.log(ct)
  


    cnn.query('SELECT * FROM vehiculo WHERE idcat= "'+ct+'"',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('consulta1',{datos:resbd});
        }
    })


}
controller.datosvendedor=async(req,res,next)=>{
    const di=req.body.iddat;
    console.log(di)




    cnn.query('SELECT * FROM datosusu WHERE iddat= "'+di+'"',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('consultav',{datos:resbd});
        }
    })


}

controller.cambioderoles=(req,res,next)=>{
   
   
    cnn.query('SELECT * FROM usurol',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
           // console.log(resbd)
            res.render('usuariorol',{datos:resbd});
        }
    }) 
}






 
controller.pre=async(req,res,next)=>{
            
    res.render('precio');
}

controller.prevehiculo=async(req,res,next)=>{
        const pvi=req.body.vi;
        const pvf=req.body.vf;
        console.log(pvi)
        console.log(pvf)
    
    
        cnn.query('SELECT * FROM vehiculo WHERE precio BETWEEN "'+pvi+'" AND "'+pvf+'" ',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('consulta2',{datos:resbd});
            }
        })
    
    
}
    
 controller.datosvendedor2=async(req,res,next)=>{
     const di=req.body.iddat;
     console.log(di)
     console.log(di)
     console.log(di)
     console.log(di)
    
    
     cnn.query('SELECT * FROM datosusu WHERE iddat= "'+di+'"',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('consultav2',{datos:resbd});
            }
        })
    
    
}



controller.cambiarrol=async(req,res,next)=>{
    const a=req.body.idusu;
    const d=req.body.rolid;

    cnn.query('UPDATE usurol SET  rolid="'+d+'" WHERE idusu="'+a+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Cambiado")
            res.redirect('cambioroldecomprador')
        }

    })
}

controller.cambiocompradorroles=(req,res,next)=>{
   
   
    cnn.query('SELECT * FROM usurol',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
           // console.log(resbd)
            res.render('cambioroldecomprador',{datos:resbd});
        }
    }) 
}




module.exports=controller;



