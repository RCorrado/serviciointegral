$(document).ready(function(){
    $('.form').on('submit', function (){
        var datos = $('.form').serialize();
        var url = "http://siserviciointegral.com/php/mandarCorreo.php";
        $.ajax({
            data: datos,
            type: "POST",
            url: url,
            success: function(result){
                $('#respuesta').html("Enviado con éxito");
                setTimeout(checkVentana,800);  
            },
            error: function(result){ 
                $('#respuesta').html("Fallo al enviar");
                setTimeout(checkVentana,800);
            }
        });

        return false;
    });

    function resetDatos(){
        $('.fields').val("");
        $('#mensaje').val("");
    }

    function checkVentana(){
        resetDatos();
        $('#respuesta').empty();
        if($(window).width() <= 768){
            $('#pop').css("display", "none");
            $('#formulario').css("display", "none");
            $("html, body").css('overflow', 'auto');   
        } 
    }
});