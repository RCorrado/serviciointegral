$(document).ready(function(){
	checkNav();
	$('.listScroll').hide();

	//Cambios del comportamiento en móviles y tablets
  	if($(window).width() > 1024){
    	$('a[href*=tel]').removeAttr("href");
  	}if($(window).width() <= 768){
  		$(window).scroll(checkNav);
  		$('.listGrid').hide();
  		$('.listScroll').show();
	} else {
  		$(window).scroll(checkNav);
  	}
  	
	//SLIDER
	var imgPag = $('.slide li').length;//cantidad de elementos del slider
	var imgPos = 1;//primer elemento del slider
	for(i=1; i<=imgPag; i++){
		$('.pagination').append('<li><span class="fa fa-circle"></span></li>');//creamos los circulos de slide
	}
	cambiarSlide(imgPag, 1);
	setInterval(function(){
		nextSlider(imgPag, imgPos);
	}, 3000);
	$('.pagination li').click(pagination);

	//Animación al clickear sobre enlace menú
  	$('a[href*=\\#]').click(function() {
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    		&& location.hostname == this.hostname) {
    		if($('.burgerMenu').hasClass('active')){
      			esconderDrop();
      			despejarVentana('pop', 'dropdown');
      		}
      		var $target = $(this.hash);
     		$target = $target.length && $target
      		|| $('[name=' + this.hash.slice(1) +']');
      		if ($target.length) {
        		var targetOffset = $target.offset().top;
        		$('html,body')
        		.stop().animate({scrollTop: targetOffset}, 1300, '');
       			return false;
      		}
    	}
  	});

  	//menu hamburguesa
  	$('.burgerMenu').click(function(){
  		var altoNav = $('.listScroll').height() * 2;
  		var alturaBody = $("body").height();
  		if($(this).hasClass('active')){
  			esconderDrop();
  			despejarVentana('pop', 'dropdown');
  		} else{
  			$(this).addClass('active');
  			$('html').css("overflow", "hidden");
        if ($(window).width() <= 768){
          $("#pop").css('display','block');
          $("#pop").height(alturaBody);
        }
  			$('.dropdown').animate({
  				top: 0,
  				paddingTop: altoNav,
  			}).slideDown();
  		}
  	});

  	//Botón para volver al inicio
  	$('#subir').click(function(){
  		$("html, body").animate({ scrollTop: 0 }, 600);
           return false;
  	});

  	//Botón popup
  	$('.popup').click(function(){
  		var altura = $("#contact").offset().top + $('nav').height();
  		var alturaBody = $("body").height();
  		$("html, body").animate({scrollTop: altura}, 600);
  		$("html, body").css('overflow', 'hidden');
  		$("#pop").css('display','block');
  		$("#pop").height(alturaBody);
  		altura = altura + $('nav').height();
  		$("header").css({
        'position': 'relative',
        'z-index': '-1'});
      $("#subir").css("display", "none");
  		$("#formulario").css('display','block');
  		$("#formulario").animate({top: altura}, 600);
  		return false;
  	});

  	//FORMULARIO
  	//Click sobre el botón "Reset" del formulario
  	$('#reset').click(function(e){
  		e.preventDefault();
  		$('.fields').val('');
  		$('#mensaje').val('');
  	});

  	//Click fuera del formulario
  	$('#pop').click(function(e){
  		e.preventDefault();
  		var elem1 = 'pop';
  		var elem2;
  		if ($('burgerMenu').hasClass('active') && $(window).width() <= 768){
  			elem2 = 'dropdown';
  		} else {
  			elem2 = 'formulario';
  			esconderDrop();
  		}
      checkNav();
  		despejarVentana(elem1, elem2);
  	});

  	/*REMOVER SALTOS DE LINEA*/
  	if($(window).width() <= 700){
  		$('.slide li div p').children('br').remove();
  		$('#weare div p').children('br').after("<br>");
  	}

  	/*FUNCIONES*/
  	function checkNav(){
  		var altoInicio = $('#inicio').height() - $('#inicio').height()/2;
  		var altoNav = $('.listGrid').height();
  		var posDoc = $(window).scrollTop();
  		if($(window).width() > 768){
	  		if (posDoc >= altoNav){
	  			$('nav').css("background-color", "rgba(179, 179, 179, 1)");
	  			$('.listGrid').hide();
	  			$('.listScroll').show();
	  		} else {
	  			$('nav').css("background-color", "rgba(179, 179, 179, .6)");
	  			$('.listScroll').hide();
	  			$('.listGrid').show();
	  			esconderDrop();
	  		}
  		}
  		if (posDoc >= altoInicio){
  			$('#subir').fadeIn("fast");
  		} else{
  			$('#subir').fadeOut("fast");
  		}
  	}

	function pagination(){
		//permite cambiar la img del slide haciendo click en el circulo
		var pagPosition = $(this).index() + 1;
		cambiarSlide(imgPag, pagPosition);
		imgPos = pagPosition;
	}

	function nextSlider(){
		//permite ir a la siguiente img del slide haciendo click en la flecha
		imgPos++;
		if(imgPos <= imgPag){
			cambiarSlide(imgPag, imgPos);
		}else{
			cambiarSlide(imgPag, 1);
			imgPos = 1;
		}
	}

	function prevSlider(){
		//permite ir a la anterior img del slide haciendo click en la flecha
		imgPos--;
		if(imgPos > 0){
			cambiarSlide(imgPag, imgPos);
		}else{
			cambiarSlide(imgPag, imgPag);
			imgPos = imgPag;
		}
	}

	function cambiarSlide(cant, pos){
		//cambia la img correspondiente, colorea el circle asociado
		$('.slide li').fadeOut(100);
		$('.slide li:nth-child(' + pos + ')').fadeIn(150);
		$('.pagination li:nth-child(' + pos + ')').css({"color": "rgb(165, 28, 28)"});
		for (i=1; i<=cant; i++){
			if (i!=pos){
				$('.pagination li:nth-child('+i+')').css({"color": "rgba(50,50,50,.3"});
			}
		}
	}

	function esconderDrop(){
		$('.burgerMenu').removeClass('active');
      	$('.dropdown').slideUp();
      	$('html, body').css('overflow', 'auto');
	}

	function cambiarColor(elem, color){
		$('elem').hover(function(){
			$('elem').css("color", color);
		}, function(){
			$('elem').css("color", color);
		});
	}

	function despejarVentana(elem1, elem2){
		$('#' + elem2).css('display','none');
  		$('#' + elem1).fadeOut(500);
  		$('html, body').css('overflow', 'auto');
      $("header").css({
        'position': 'initial',
        'z-index': '2'});
	}
});