CanvasComposer.Hotkey = function(){
    //Keyboard
    var map = {8: false, 91: false, 187: false, 189: false, 40: false, 38:false, 68:false, 16:false ,17:false, 76:false, 90:false};
    $(document).keydown(function(e) {
        if (e.keyCode in map) {
            map[e.keyCode] = true;
            //Redo
            if (map[16] && map[90] && map[91]) {
                e.preventDefault(); e.stopPropagation();
                CanvasComposer.History.rePlay(redo, undo, '#undo', this);
                map[90] = false;
            } else 
            //Undo
            if (map[90] && map[91] && !map[16]) {
                e.preventDefault(); e.stopPropagation();
                CanvasComposer.History.rePlay(undo, redo, '#redo', this);
                map[90] = false;
            } else
            //Delete
            if (map[8] && map[91]) {
                e.preventDefault(); e.stopPropagation();
                CanvasComposer.Artboard.removeObject();
                map[8] = false;
            } else
            //BringToFront
            if (map[38] && map[91]){
                e.preventDefault(); e.stopPropagation();
                var obj = canvas.getActiveObject();
                obj.bringToFront();
                map[38] = false;
            } else
            //BringForward
            if (map[187] && map[91]){
                e.preventDefault(); e.stopPropagation();
                var obj = canvas.getActiveObject();
                obj.bringForward();
                map[187] = false;
            } else
            //Send Backwards
            if (map[189] && map[91]){
                e.preventDefault(); e.stopPropagation();
                var obj = canvas.getActiveObject();
                obj.sendBackwards();
                map[189] = false;
            } else
            //Send Bottom
            if (map[40] && map[91]){
                e.preventDefault(); e.stopPropagation();
                var obj = canvas.getActiveObject();
                obj.sendToBack();
                map[40] = false;
            } else
            //Duplicate
            if (map[68] && map[17]){
                e.preventDefault(); e.stopPropagation();
                CanvasComposer.Artboard.duplicateObject();
                map[68] = false;
            } else
            //Lock
            if (map[76] && map[91]){
                e.preventDefault(); e.stopPropagation();
                CanvasComposer.Artboard.lockObject();
                map[76] = false;
            }
            
        }
    }).keyup(function(e) {
        if (e.keyCode in map) {
            map[e.keyCode] = false;
        }
    });
}