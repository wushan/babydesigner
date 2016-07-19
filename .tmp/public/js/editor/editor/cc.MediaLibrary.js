CanvasComposer.MediaLibrary = {
	init: function(){
		$('#imageLibrary').on('click', 'a', function(){
			//Send the Full URL to create image into canvas
			CanvasComposer.Artboard.Multimedia.image('https://crossorigin.me/' + $(this).data('full'));
		})
		//Upload Image
		document.getElementById('imageUploader').onchange = function handleImage(e) {
		    var reader = new FileReader();
		    reader.onload = function (event) {
		        var imgObj = new Image();
		        imgObj.src = event.target.result;
		        imgObj.onload = function () {
		            // start fabricJS stuff
		            
		            var image = new fabric.Image(imgObj);
		            image.set({
						'left': canvas.getWidth()/2-image.width/2,
						'top': canvas.getHeight()/2-image.height/2
		            });

		            //image.scale(getRandomNum(0.1, 0.25)).setCoords();
		            canvas.add(image);
		            image.center();
			        image.setCoords();
			        canvas.renderAll();
			        CanvasComposer.History.Update();
			        //Bind
			        bindEvents(image);
			        //Programmatically Select Newly Added Object
			        canvas.setActiveObject(image);
		            // end fabricJS stuff
		        }
		        
		    }
		    reader.readAsDataURL(e.target.files[0]);
		}
	}
};