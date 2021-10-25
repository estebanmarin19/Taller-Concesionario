$(document).ready(function(){
    alert("Datos de Inicio de Session")
    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);
        let d11=$('.idusu').eq(btn);
        let d1=$('.nom').eq(btn);
        let d2=$('.ape').eq(btn);
        let d3=$('.tel').eq(btn);
        let d4=$('.cor').eq(btn);
    

        let a11=d11.val();
        let a1=d1.val();
        let a2=d2.val();
        let a3=d3.val();
        let a4=d4.val();
        alert("Datos actualizados");

        alert("Datos: "+ "Id: "+ a11 +"\n"+ a1 +"\n"+ a2 +"\n" + a3+"\n" + a4);
        
    
    
        $.ajax({
    
            type:"POST",
            url:'/actdatvendedor',
            data:{
                dat11:a11,dat1:a1,dat2:a2,dat3:a3,dat4:a4
            }
        });
    
    
    
    
    });
    
    
    });