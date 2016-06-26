//全域
var canvas,
	grid,
	threshold,
	initRadius = 100;
//State
// current unsaved state
var state;
 // past states
var undo = [];
 // reverted states
var redo = [];

//區域
var CanvasComposer = {
	init: function(data, options){
		// console.log(this);
  //   console.log(JST);
  //   console.log(JST['.tmp/public/templates/artboard.html']());
		this.View();
    //Put Temp Loader
    $('body').append($('<div id=loader><div class=loader-inner><img src=images/components/boxloader.gif>Initializing</div></div'));

		$(document).on("files-loaded", function () {
			if (typeof data === 'object') {
        CanvasComposer.initCanvas.initWithData(data, options);
        //讀取
			} else if (data == 'new'){
        CanvasComposer.initCanvas.init();
			}
        //Hide Loader
        $('#loader').fadeOut();
        //Trigger History log on load.
        CanvasComposer.History();
        CanvasComposer.History.Update();

        //Menus
		    CanvasComposer.Menu();
		    CanvasComposer.Menu.Contextmenu();

        //Hotkey Bindings
		    CanvasComposer.Hotkey();

        //Attributes
		    CanvasComposer.Attributions();
        CanvasComposer.Attributions.canvas();
        
        //Presets
        CanvasComposer.Presets();
		    
        //MediaLibrary
        CanvasComposer.MediaLibrary.init();
        
		})
	},
	Save: {
    toObj: function(){
      var currentCanvas = JSON.stringify(canvas);
      // Welcome to real world.
      // console.log(currentCanvas);
    },
    toPng: function(){
      //Prevent saving image with a selected control points(borders).
      canvas.deactivateAll().renderAll();
      var png = canvas.toDataURL('png');
      //CROSS ORIGIN ISSUE
      window.open(png);
    },
    toSvg: function(){
      var svg = canvas.toSVG({suppressPreamble: true});
      console.log(svg);
    }
  }
};

function getThumbnails(id , callback) {
  var url = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&part=snippet&key=AIzaSyCjiWPLJdE-QbakmKin__3rDqOKLgKyCRY"
  $.getJSON(url,function(){
    console.log('success');
  }).done(function(res){
    console.log(res);
    var thumbnails;
    if (res.items[0].snippet.thumbnails.standard.url != '') {
      thumbnails = res.items[0].snippet.thumbnails.standard.url;
    } else {
      thumbnails = res.items[0].snippet.thumbnails.default.url;
    }
    return callback(thumbnails);
  }).fail(function(error){
    console.log(error);
  })
};



function validateYouTubeUrl(url) {
    if (url != undefined || url != '') {        
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        var mp4,
            webm;
        if (match && match[2].length == 11) {
            return match[2]; 
        } else {
            return false;
        }
    }
}