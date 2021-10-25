$(document).ready(function(){
    alert("Registro de Usuarios")

$('.btnact').on('click',function(){
    

    let btn= $('.btnact').index(this);
    alert(btn)
    let a1=$('.a1').eq(btn);
    let a2=$('.a2').eq(btn);
    let a3=$('.a3').eq(btn);
    let a4=$('.a4').eq(btn);
    let a5=$('.a5').eq(btn);
    let a6=$('.a6').eq(btn);
    let a7=$('.a7').eq(btn);
    let a8=$('.a8').eq(btn);

    let a=a1.val();
    let b=a2.val();
    let c=a3.val();
    let d=a4.val();
    let e=a5.val();
    let f=a6.val();
    let g=a7.val();
    let h=a8.val();

    alert("datos "+a+b+c+d+e+f+g+h);
    


$.ajax({

    type:"POST",
    url:'/actdatusuarios',
    data:{
        j1:a,j2:b,j3:c,j4:d,j5:e,j6:f,j7:g,j8:h
    }
});




});


});