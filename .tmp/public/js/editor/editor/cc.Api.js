CanvasComposer.Interface = {
  save: function(){
    $('#message').html('Saving...');
    $('#message').fadeIn();
    //Detach All
    canvas.deactivateAll().renderAll();
    //Save
  	var currentCanvas = JSON.stringify(canvas);
    var canvasThumb = canvas.toDataURL('png');
    var currentWorkID = $('#canadEditor').data('workid');
    // var sizeS = $('#subcategory-selector option:selected').data('size');
    // console.log(sizeS);
    var canvaswidth = $('#subcategory-selector option:selected').data('width');
    var canvasheight = $('#subcategory-selector option:selected').data('height');
    var privacy = $('#privacysetting').prop("checked");
    var category = $('#category-selector').val();
    var subcategory = $('#subcategory-selector').val();
  	//好像要來個驗證？
  	$.ajax({
  		url: '/works',
  		method: 'PUT',
  		data: {author: user, data: currentCanvas, thumbnail: canvasThumb , public: privacy, workwidth: canvaswidth, workheight: canvasheight, workid: currentWorkID, category: category, subcategory: subcategory},
  		success: function(res){
        console.log(res);
  			$('#message').html('Saved !');
	  		$('#message').fadeOut('slow');
  		}
  	}).fail(function(err){
      $('#message').html('Error' + err.status + ', try again.')
    });
  }
};