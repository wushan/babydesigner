CanvasComposer.initCanvas = {
  init: function(){
    //*Setting Up Canvas
    canvas = new fabric.Canvas('c', {
                  width: 800,
                  height: 600,
                  allowTouchScrolling: true
                  // ...
                }),
                grid = 50,
                threshold = grid * 0.2;
    // Draw grids
    // for (var i = 0; i < (canvas.width / grid); i++) {
    //     canvas.add(new fabric.Line([ i * grid, 0, i * grid, canvas.width], { stroke: '#ccc', selectable: false }));
    //     canvas.add(new fabric.Line([ 0, i * grid, canvas.width, i * grid], { stroke: '#ccc', selectable: false }));
    // }
    //Bind Global
    // undo and redo buttons
    $('#undo').click(function() {
      CanvasComposer.History.rePlay(undo, redo, '#redo', this);
    });
    $('#redo').click(function() {
      CanvasComposer.History.rePlay(redo, undo, '#undo', this);
    })
    
    canvas.on(
        'object:modified', function () {
            CanvasComposer.History.Update();
            console.log('modified');
    });

    canvas.on('object:moving', snapMoveToGrid);
    // canvas.on('object:scaling', snapScaleToGrid);
    // canvas.on('object:moving', fixBoundaries);
    // canvas.on('object:scaling', fixBoundaries);

    function roundToGrid(value) {
       return Math.round(value / grid) * grid;  
    }

    function fixBoundaries(options){
        if (!options.target) return;
        var t = options.target,
            update = false,
                tBounds = {
                    left: t.left,
                    right: t.left + t.width * t.scaleX,
                    top: t.top,
                    bottom: t.top + t.height * t.scaleY
                },
                cBounds = {
                    left: 0,
                    top: 0,
                    right: canvas.getWidth(),
                    bottom: canvas.getHeight()
                },
            coords = {};
            
        if (tBounds.left < cBounds.left) {
             update = true;
             coords.left = cBounds.left;
        }
        
        if (tBounds.top < cBounds.top) {
             update = true;
             coords.top = cBounds.top;
        }
        
        if (tBounds.right > cBounds.right) {
             update = true;
             coords.left = tBounds.left - (tBounds.right - cBounds.right);
        }
        
        if (tBounds.bottom > cBounds.bottom) {
             update = true;
             coords.top = tBounds.top - (tBounds.bottom - cBounds.bottom);
        }
        
        if (update) {
            t.set(coords);
            canvas.renderAll();
        }
        
        return options;
    }

    function snapMoveToGrid(ev) {
        var t = ev.target,
            w = t.width * t.scaleX,
            h = t.height * t.scaleY,
            snap = {   // Closest snapping points
                top: roundToGrid(t.top),
                left: roundToGrid(t.left),
                bottom: roundToGrid(t.top + h),
                right: roundToGrid(t.left + w)
            },
            dist = {   // Distance from snapping points
                top: Math.abs(snap.top - t.top),
                left: Math.abs(snap.left - t.left),
                bottom: Math.abs(snap.bottom - t.top - h),
                right: Math.abs(snap.right - t.left - w)
            };
        
        if (dist.bottom < dist.top) {
            if (dist.bottom > threshold)
                snap.top = t.top; // don't snap
            else
                snap.top = snap.bottom - h;
        }
        else if (dist.top > threshold)
            snap.top = t.top; // don't snap
        
        if (dist.right < dist.left) {
            if (dist.right > threshold)
                snap.left = t.left; // don't snap
            else
                snap.left = snap.right - w;
        }
        else if (dist.left > threshold)
            snap.left = t.left; // don't snap
        
        t.set({
            top: snap.top,
            left: snap.left
        });
    }

    function snapScaleToGrid(options) {
        var target = options.target,
            w = target.getWidth(),
            h = target.getHeight(),
            snap = {   // Closest snapping points
                top: roundToGrid(target.top),
                left: roundToGrid(target.left),
                bottom: roundToGrid(target.top + h),
                right: roundToGrid(target.left + w)
            },
            dist = {   // Distance from snapping points
                top: Math.abs(snap.top - target.top),
                left: Math.abs(snap.left - target.left),
                bottom: Math.abs(snap.bottom - target.top - h),
                right: Math.abs(snap.right - target.left - w)
            },
            attrs = {
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                top: target.top,
                left: target.left
            };
        
        switch(target.__corner) {
            case 'tl':
                if (dist.left < dist.top && dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.top = target.top + (h - target.height * attrs.scaleY);
                    attrs.left = snap.left;
                }
                else if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.left = attrs.left + (w - target.width * attrs.scaleX);
                    attrs.top = snap.top;
                }
                break;
            case 'mt':
                if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.top = snap.top;
                }
                break;
            case 'tr':
                if (dist.right < dist.top && dist.right < threshold) {
                    attrs.scaleX = (snap.right - target.left) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.top = target.top + (h - target.height * attrs.scaleY);
                }
                else if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.top = snap.top;
                }
                break;
            case 'ml':
                if (dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.left = snap.left;
                }
                break;
            case 'mr':
                if (dist.right < threshold)
                    attrs.scaleX = (snap.right - target.left) / target.width;
                break;
            case 'bl':
                if (dist.left < dist.bottom && dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.left = snap.left;
                }
                else if (dist.bottom < threshold) {
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.left = attrs.left + (w - target.width * attrs.scaleX);
                }
                break;
            case 'mb':
                if (dist.bottom < threshold)
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                break;
            case 'br':
                if (dist.right < dist.bottom && dist.right < threshold) {
                    attrs.scaleX = (snap.right - target.left) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                }
                else if (dist.bottom < threshold) {
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                }
                break;
        }
        
        target.set(attrs);
    }
  },
  initWithData: function(data, options){
    //*Setting Up Canvas
    canvas = new fabric.Canvas('c', {
                  width: options.width,
                  height: options.height
                  // ...
                }),
                grid = 50,
                threshold = grid * 0.2;
    // Draw grids
    // for (var i = 0; i < (canvas.width / grid); i++) {
    //     canvas.add(new fabric.Line([ i * grid, 0, i * grid, canvas.width], { stroke: '#ccc', selectable: false }));
    //     canvas.add(new fabric.Line([ 0, i * grid, canvas.width, i * grid], { stroke: '#ccc', selectable: false }));
    // }
    //Bind Global
    // undo and redo buttons
    $('#undo').click(function() {
      CanvasComposer.History.rePlay(undo, redo, '#redo', this);
    });
    $('#redo').click(function() {
      CanvasComposer.History.rePlay(redo, undo, '#undo', this);
    })
    canvas.on(
      'object:modified', function () {
          CanvasComposer.History.Update();
          console.log('modified');
    });
    canvas.on('object:moving', snapMoveToGrid);
    // canvas.on('object:scaling', snapScaleToGrid);
    // canvas.on('object:moving', fixBoundaries);
    // canvas.on('object:scaling', fixBoundaries);
    
    //Load From JSON
    // if (data != 'undefined' || data != null) {

    // } else {
    //   console.log(data);
    // }
    CanvasComposer.Load.FromJSON(data, function(res){
      console.log(res);
      CanvasComposer.History.Update();
    })

    function roundToGrid(value) {
       return Math.round(value / grid) * grid;  
    }

    function fixBoundaries(options){
        if (!options.target) return;
        var t = options.target,
            update = false,
                tBounds = {
                    left: t.left,
                    right: t.left + t.width * t.scaleX,
                    top: t.top,
                    bottom: t.top + t.height * t.scaleY
                },
                cBounds = {
                    left: 0,
                    top: 0,
                    right: canvas.getWidth(),
                    bottom: canvas.getHeight()
                },
            coords = {};
            
        if (tBounds.left < cBounds.left) {
             update = true;
             coords.left = cBounds.left;
        }
        
        if (tBounds.top < cBounds.top) {
             update = true;
             coords.top = cBounds.top;
        }
        
        if (tBounds.right > cBounds.right) {
             update = true;
             coords.left = tBounds.left - (tBounds.right - cBounds.right);
        }
        
        if (tBounds.bottom > cBounds.bottom) {
             update = true;
             coords.top = tBounds.top - (tBounds.bottom - cBounds.bottom);
        }
        
        if (update) {
            t.set(coords);
            canvas.renderAll();
        }
        
        return options;
    }

    function snapMoveToGrid(ev) {
        var t = ev.target,
            w = t.width * t.scaleX,
            h = t.height * t.scaleY,
            snap = {   // Closest snapping points
                top: roundToGrid(t.top),
                left: roundToGrid(t.left),
                bottom: roundToGrid(t.top + h),
                right: roundToGrid(t.left + w)
            },
            dist = {   // Distance from snapping points
                top: Math.abs(snap.top - t.top),
                left: Math.abs(snap.left - t.left),
                bottom: Math.abs(snap.bottom - t.top - h),
                right: Math.abs(snap.right - t.left - w)
            };
        
        if (dist.bottom < dist.top) {
            if (dist.bottom > threshold)
                snap.top = t.top; // don't snap
            else
                snap.top = snap.bottom - h;
        }
        else if (dist.top > threshold)
            snap.top = t.top; // don't snap
        
        if (dist.right < dist.left) {
            if (dist.right > threshold)
                snap.left = t.left; // don't snap
            else
                snap.left = snap.right - w;
        }
        else if (dist.left > threshold)
            snap.left = t.left; // don't snap
        
        t.set({
            top: snap.top,
            left: snap.left
        });
    }

    function snapScaleToGrid(options) {
        var target = options.target,
            w = target.getWidth(),
            h = target.getHeight(),
            snap = {   // Closest snapping points
                top: roundToGrid(target.top),
                left: roundToGrid(target.left),
                bottom: roundToGrid(target.top + h),
                right: roundToGrid(target.left + w)
            },
            dist = {   // Distance from snapping points
                top: Math.abs(snap.top - target.top),
                left: Math.abs(snap.left - target.left),
                bottom: Math.abs(snap.bottom - target.top - h),
                right: Math.abs(snap.right - target.left - w)
            },
            attrs = {
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                top: target.top,
                left: target.left
            };
        
        switch(target.__corner) {
            case 'tl':
                if (dist.left < dist.top && dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.top = target.top + (h - target.height * attrs.scaleY);
                    attrs.left = snap.left;
                }
                else if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.left = attrs.left + (w - target.width * attrs.scaleX);
                    attrs.top = snap.top;
                }
                break;
            case 'mt':
                if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.top = snap.top;
                }
                break;
            case 'tr':
                if (dist.right < dist.top && dist.right < threshold) {
                    attrs.scaleX = (snap.right - target.left) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.top = target.top + (h - target.height * attrs.scaleY);
                }
                else if (dist.top < threshold) {
                    attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.top = snap.top;
                }
                break;
            case 'ml':
                if (dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.left = snap.left;
                }
                break;
            case 'mr':
                if (dist.right < threshold)
                    attrs.scaleX = (snap.right - target.left) / target.width;
                break;
            case 'bl':
                if (dist.left < dist.bottom && dist.left < threshold) {
                    attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                    attrs.left = snap.left;
                }
                else if (dist.bottom < threshold) {
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                    attrs.left = attrs.left + (w - target.width * attrs.scaleX);
                }
                break;
            case 'mb':
                if (dist.bottom < threshold)
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                break;
            case 'br':
                if (dist.right < dist.bottom && dist.right < threshold) {
                    attrs.scaleX = (snap.right - target.left) / target.width;
                    attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                }
                else if (dist.bottom < threshold) {
                    attrs.scaleY = (snap.bottom - target.top) / target.height;
                    attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                }
                break;
        }
        
        target.set(attrs);
    }
  },
  fit: function(){
    //Scale Canvas to fit viewport
    var container = document.getElementById('artboard');
    var paintArea = document.getElementById('canvas');
    // canvas.wrapperEl.style.transform = "scale(.8)";
    var artboardScale = (function(){
      var aspectRatio = canvas.width/canvas.height;
      //Ratio = Canvas 寬(實際px) 與 artboard 寬的比值
      var ratioW = canvas.width/container.clientWidth,
          ratioH = canvas.height/container.clientHeight;

      console.log('Canvas 實際寬度是視窗寬度的: ' + ratioW + ' 倍');
      console.log('Canvas 實際高度是視窗寬度的: ' + ratioH + ' 倍');
      var motive;
      //若寬度比值大於或等於高度比值 (代表此矩形為橫式或正方形)
      if (ratioW >= ratioH) {
        //橫式或正方形情況下，Canvas 實際寬度大於視窗寬度 (必須 scale 縮減)
        if (ratioW > 1) {
          ratioW = container.clientWidth/canvas.width;
          //再縮減 80% 以避免 canvas 貼邊。
          motive = ratioW*0.8;
          console.log(ratioW);
          if (motive > 1) {
            motive = 1;
          }
          paintArea.style.transform = 'scale(' + motive + ')';
          // paintArea.style.transformOrigin = "25% 25%";
        } else {
          motive = 1;
          paintArea.style.transform = 'scale(' + motive + ')';
          // paintArea.style.transformOrigin = "25% 25%";
        }
      } else if (ratioW < ratioH){
        if (ratioH > 1) {
          ratioH = container.clientHeight/canvas.height;
          //再縮減 80% 以避免 canvas 貼邊。
          motive = ratioH*0.8;
          console.log(ratioH);
          if (motive > 1) {
            motive = 1;
          }
          paintArea.style.transform = 'scale(' + motive + ')';
          // paintArea.style.transformOrigin = "45% 25%";
        } else {
          motive = 1;
          paintArea.style.transform = 'scale(' + motive + ')';
          // paintArea.style.transformOrigin = "25% 25%";
        }
      }
    }());

    //天才
    function resizedw(){
    // Haven't resized in 100ms!
      CanvasComposer.initCanvas.fit();
    }

    var doit;
    window.onresize = function(){
      clearTimeout(doit);
      doit = setTimeout(resizedw, 100);
    };
  }
}