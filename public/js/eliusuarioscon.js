$(document).ready(function(){
    

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let cod=$('.id').eq(btn);
        
    
    
        let elcodi=cod.val();
    
        alert(elcodi)
        alert("Datos borrados")
    
        $.ajax({
    
            type:"POST",
            url:'/eliusuarioscon',
            data:{
                ele:elcodi
            }
        });
 
    
    });
    
});