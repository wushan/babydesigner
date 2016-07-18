
CanvasComposer.Artboard = {
  addRect : function(){
    var rect = new fabric.Rect({
      left: canvas.getWidth()/2-initRadius/2,
      top: canvas.getHeight()/2-initRadius/2,
      fill: '#'+Math.floor(Math.random()*16777215).toString(16),
      width: initRadius,
      height: initRadius,
      padding: 0,
      strokeWidth: 0
    });
    rect.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          link: this.link
        });
      };
    })(rect.toObject);
    rect.perPixelTargetFind = true;
    canvas.add(rect);
    CanvasComposer.History.Update();
    canvas.renderAll();
    //Bind
    bindEvents(rect);
    //Programmatically Select Newly Added Object
    canvas.setActiveObject(rect);
    //Refresh log
    
  },
  addCircle : function(){
    var circle = new fabric.Circle({
      left: canvas.getWidth()/2-initRadius/2,
      top: canvas.getHeight()/2-initRadius/2,
      fill: '#'+Math.floor(Math.random()*16777215).toString(16),
      radius: initRadius/2
    });
    circle.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          link: this.link
        });
      };
    })(circle.toObject);
    circle.perPixelTargetFind = true;
    canvas.add(circle);
    canvas.renderAll();
    CanvasComposer.History.Update();
    //Bind
    bindEvents(circle);
    //Programmatically Select Newly Added Object
    canvas.setActiveObject(circle);
    //Refresh log
    
  },
  addText : function(){
    var text = new fabric.Textbox('Default Text',{
      //options
      left: 200,
      top: 200,
      width: 300,
      height: 300,
      fontSize: 24,
      fontFamily: 'Open Sans'
    })
    text.toObject = (function(toObject) {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          link: this.link
        });
      };
    })(text.toObject);
    canvas.add(text);
    text.center();
    text.setCoords();
    CanvasComposer.History.Update();
    //Bind
    bindEvents(text);
    //Programmatically Select Newly Added Object
    canvas.setActiveObject(text);    
  },
  dispose : function() {
    var obj;
    for (var i=0; i<canvas._objects.length; i++) {
      // obj = canvas._objects[i];
      if (canvas._objects[i]._element !== undefined && canvas._objects[i]._element.localName === 'video') {
        canvas._objects[i].getElement().pause();
      }
    }
    canvas.clear();    
  },
  duplicateObject: function() {
    var obj = canvas.getActiveObject();
    canvas.add(obj.clone());
    canvas.renderAll();
  },
  lockObject: function() {
    var obj = canvas.getActiveObject();
    if (obj.lockMovementY === true) {
      obj.lockMovementY = false;
      obj.lockMovementX = false;
      obj.lockRotation = false;
      obj.lockScalingX = false;
      obj.lockScalingY = false;
    } else {
      obj.lockMovementY = true;
      obj.lockMovementX = true;
      obj.lockRotation = true;
      obj.lockScalingX = true;
      obj.lockScalingY = true;
    }
  },
  removeObject: function() {

      if(canvas.getActiveGroup()){
        canvas.getActiveGroup().forEachObject(function(o){
          if (o._element !== undefined && o._element.localName === 'video') {
            o.getElement().pause();
            canvas.remove(o);
          } else {
            canvas.remove(o);
          }
        });
        canvas.discardActiveGroup().renderAll();
      } else {
        var singleObj = canvas.getActiveObject();
        if (singleObj._element !== undefined && singleObj._element.localName === 'video') {
            singleObj.getElement().pause();
            canvas.remove(singleObj);
          } else {
            canvas.remove(singleObj);
          }
        
      };

  },
  reset : function() {
    // var size = canvas.getActiveObject().getOriginalSize();
    var obj = canvas.getActiveObject();
    // reset to original size
    obj.setScaleX('1');
    obj.setScaleY('1');
    //align to center of the canvas
    obj.center();
    obj.setCoords();
    canvas.renderAll();
    CanvasComposer.Log.update(obj);
  }
}

//Add Media
CanvasComposer.Artboard.Multimedia = {
    image : function(source) {
      //Add Single Image
      $('#loading').fadeIn('fast');
      var media = new fabric.Image.fromURL(source, function(oImg) {
        $('#loading').fadeOut('fast');
        console.log(oImg);
        oImg.set({
          'left': canvas.getWidth()/2-oImg.width/2,
          'top': canvas.getHeight()/2-oImg.height/2
        });
        oImg.crossOrigin='anonymous';
        //Scale Superlarge Elements to fit the Current Canvas Size
        //Do Some Math
        var ratioW = oImg.getWidth()/canvas.getWidth();
        var ratioH = oImg.getHeight()/canvas.getHeight();
        if (ratioW >= ratioH) {
          if (ratioW > 1) {
            oImg.scaleToWidth(canvas.getWidth()*0.9); //Decrese 10%   
          } else {
            //
          }
        } else {
          if (ratioH > 1) {
            oImg.scaleToHeight(canvas.getHeight()*0.9); //Decrese 10%
          } else {
            //
          }
        }
        // if (oImg.getWidth()/canvas.getWidth()) {
        //   oImg.scaleToWidth(canvas.getWidth());
        // }
        canvas.add(oImg);
        oImg.center();
        oImg.setCoords();
        oImg.toObject = (function(toObject) {
          return function() {
            return fabric.util.object.extend(toObject.call(this), {
              link: this.link
            });
          };
        })(oImg.toObject);
        // console.log(media);
        canvas.renderAll();
        CanvasComposer.History.Update();
        //Bind
        bindEvents(oImg);
        //Programmatically Select Newly Added Object
        canvas.setActiveObject(oImg);
        //Refresh log
        
      });
    },
    video : function(source, youtubeId) {
      if ( youtubeId != undefined ) {
        console.log(source);
        var media = new fabric.Video.fromURL(source, youtubeId , function(oImg) {
          oImg.set({
            'left': canvas.getWidth()/2-oImg.width/2,
            'top': canvas.getHeight()/2-oImg.height/2

          });
          console.log(oImg.toObject());
          media.toObject = (function(toObject) {
            return function() {
              return fabric.util.object.extend(toObject.call(this), {
                link: this.link,
                media: {
                  video: this.video,
                  youtubeId: youtubeId
                }
              });
            };
          })(media.toObject);
          canvas.add(oImg);
          oImg.center();
          oImg.setCoords();
          // console.log(media);
          canvas.renderAll();
          //Bind
          bindEvents(oImg);
          //Programmatically Select Newly Added Object
          canvas.setActiveObject(oImg);
          //Refresh log
          
        });
      } else {
        //Add Single Video
        //if is video file
        console.log('match video');
        //Set InitRadius for Videos 16:9
        var vw;
        var vh;
        var video = new fabric.Video(source, {
          media: {
            video: source
          }
        });
        var videoEl = video.getElement();
        $('#loading').fadeIn('fast');
        canvas.add(video);
        console.log(videoEl);
        console.log(video);
        videoEl.onloadeddata = function() {
          $('#loading').fadeOut('fast');
          vw = this.videoWidth;
          vh = this.videoHeight;
          video.setWidth(vw);
          video.setHeight(vh);
          video.center();
          video.setCoords();
          canvas.renderAll();
          console.log(this);
          console.log(vw);
          //Auto Play Video
          video.getElement().play();
          video.toObject = (function(toObject) {
              return function() {
                return fabric.util.object.extend(toObject.call(this), {
                  media: {
                    video: source
                  },
                  link : this.link
                });
              };
            })(video.toObject);
          CanvasComposer.History.Update();
          //Bind
          bindEvents(video);
          //Programmatically Select Newly Added Object
          canvas.setActiveObject(video);
          //Refresh log
          

          fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
          });
        };
      }
    },
    
    clock : function(options) {
        var _defaultSettings = {
            'frame' : 'images/clock/style-6/frame.svg',
            'hour': 'images/clock/style-6/hour.svg',
            'min' : 'images/clock/style-6/min.svg',
            'sec' : 'images/clock/style-6/sec.svg'
        };

        var _settings = $.extend(_defaultSettings, options);

        //Var
        var canvasClock,
            canvasClockFrame,
            canvasClockHour,
            canvasClockMin,
            canvasClockSec;

        fabric.loadSVGFromURL( _settings.frame ,function(objects , options) {
            canvasClockFrame = fabric.util.groupSVGElements(objects, options);
            //Sec
            fabric.loadSVGFromURL( _settings.sec , function(objects, options) {
                canvasClockSec = fabric.util.groupSVGElements(objects, options);
                canvasClockSec.set({
                    left: canvasClockFrame.getWidth()/2,
                    top: canvasClockFrame.getHeight()/2
                });
                canvasClockSec.setOriginX('center');
                canvasClockSec.setOriginY('center');
                //Min
                fabric.loadSVGFromURL( _settings.min ,function(objects , options) {
                    canvasClockMin = fabric.util.groupSVGElements(objects, options);
                    canvasClockMin.set({
                        left: canvasClockFrame.getWidth()/2,
                        top: canvasClockFrame.getHeight()/2
                    });
                    canvasClockMin.setOriginX('center');
                    canvasClockMin.setOriginY('center');
                    //Hour
                    fabric.loadSVGFromURL( _settings.hour ,function(objects , options) {
                        canvasClockHour = fabric.util.groupSVGElements(objects, options);
                        canvasClockHour.set({
                            left: canvasClockFrame.getWidth()/2,
                            top: canvasClockFrame.getHeight()/2
                        });
                        canvasClockHour.setOriginX('center');
                        canvasClockHour.setOriginY('center');

                        //Clock Group
                        canvasClock = new fabric.Clock([canvasClockFrame,canvasClockHour, canvasClockMin, canvasClockSec], {
                            left: 0,
                            top: 0
                        });
                        canvasClock.toObject = (function(toObject) {
                          return function() {
                            return fabric.util.object.extend(toObject.call(this), {
                              link: this.link,
                              frame: _settings.frame,
                              hour: _settings.hour,
                              minute: _settings.min,
                              second: _settings.sec
                            });
                          };
                        })(canvasClock.toObject);

                        canvasClock.setOriginX('center');
                        canvasClock.setOriginY('center');
                        
                        canvas.add(canvasClock);
                        canvasClock.center();
                        canvasClock.setCoords();
                        //Render
                        canvas.renderAll();
                        CanvasComposer.History.Update();
                        //Bind
                        bindEvents(canvasClock);
                        //Programmatically Select Newly Added Object
                        canvas.setActiveObject(canvasClock);
                        
                    });
                });
            })
        });
    }
};
