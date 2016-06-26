CanvasComposer.Interface = {
  save: function(){
  	var currentCanvas = JSON.stringify(canvas);

  	//好像要來個驗證？
  	$.ajax({
  		url: '/works',
  		method: 'POST',
  		data: {author: user, data: currentCanvas, public: true},
  		success: function(res){
        console.log(res);
  			$('#message').html('Saved !');
	  		$('#message').fadeIn().promise().done(function(){
	  			setTimeout({
	  				function(){
	  					$('#message').fadeOut();
	  				}
	  			}, 2000);
	  		});
  		}
  	});
  }
};