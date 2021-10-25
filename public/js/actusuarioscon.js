$(document).ready(function(){
    alert("Usuarios")

$('.btnact').on('click',function(){
    

    let btn= $('.btnact').index(this);
    alert(btn)
    let id=$('.id').eq(btn);
    let nom=$('.nom').eq(btn);
    let clave=$('.clave').eq(btn);
    
    

    let ac1=id.val();
    let ac2=nom.val();
    let ac3=clave.val();
  
    
    

    alert("Datos: "+ ac1 +"\n"+ ac2 +"\n" + ac3  );
    


$.ajax({

    type:"POST",
    url:'/actusuarioscon',
    data:{
        l1:ac1,l2:ac2,l3:ac3
    }
});




});


});