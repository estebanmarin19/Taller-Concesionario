$(document).ready(function(){
    

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let doc=$('.a2').eq(btn);
    
    
        let d=doc.val();
    
    
        alert("Datos borrados")
    
        $.ajax({
    
            type:"POST",
            url:'/elidatusuarios',
            data:{
                dd:d
            }
        });
    
    
    
    
    });
    
    
});