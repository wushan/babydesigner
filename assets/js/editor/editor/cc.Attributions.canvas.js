CanvasComposer.Attributions.canvas = function(){
  //Canvas Panel
  $('#canvasWidth').on('change paste keyup', function() {
     //Refresh Canvas Size
     canvas.setWidth($(this).val());
     canvas.renderAll();
     //Fit Artboard
     CanvasComposer.initCanvas.fit();
     //Set Canvas tip tags
    $('.sizeTag .tag.width span').html($(this).val());
  });

  $('#canvasHeight').on('change paste keyup', function() {
     //Refresh Canvas Size
     canvas.setHeight($(this).val());
     canvas.renderAll();
     //Fit Artboard
     CanvasComposer.initCanvas.fit();
     //Set Canvas tip tags
    $('.sizeTag .tag.height span').html($(this).val());
  });

  $('#canvas-select').change(function(){
    //Refresh Canvas Size
    var presetWidth = $('#canvas-select option:selected').attr('data-width'),
        presetHeight = $('#canvas-select option:selected').attr('data-height');
    $('#widthValue').val(presetWidth);
    $('#heightValue').val(presetHeight);
    canvas.setWidth(presetWidth);
    canvas.setHeight(presetHeight);
    canvas.renderAll();
    //Fit Artboard
    CanvasComposer.initCanvas.fit();
    //Set Canvas tip tags
    $('.sizeTag .tag.width span').html(presetWidth);
    $('.sizeTag .tag.height span').html(presetHeight);
  });
};