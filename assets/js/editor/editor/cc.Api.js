CanvasComposer.Interface = {
  save: function(){

    //Detach All
    canvas.deactivateAll().renderAll();

    //Save
  	var currentCanvas = JSON.stringify(canvas);
    var canvasThumb = canvas.toDataURL('png');
    var currentWorkID = $('#canvaseditor').data('workid');
  	//好像要來個驗證？
  	$.ajax({
  		url: '/works',
  		method: 'POST',
  		data: {author: user, data: currentCanvas, thumbnail: canvasThumb , public: false, workID: currentWorkID},
  		success: function(res){
        console.log(res);
  			$('#message').html('Saved !');
	  		$('#message').fadeIn().promise().done(function(){
	  			$(this).fadeOut();
	  		});
  		}
  	});
  }
};