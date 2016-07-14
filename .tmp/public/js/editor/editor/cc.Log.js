CanvasComposer.Log = {
  update: function(obj){
    obj = obj.toObject();
    var width,
        height,
        scaleX,
        scaleY,
        radius,
        left,
        top,
        angle,
        type,
        media,
        preview,
        color,
        textcolor,
        text,
        textsize,
        fontfamily,
        link,
        webview;

    width = obj.width*obj.scaleX;
    height = obj.height*obj.scaleY;
    scaleX = obj.scaleX;
    scaleY = obj.scaleY;
    radius = obj.radius;
    left = obj.left;
    top = obj.top;
    angle = obj.angle;
    type = obj.type;
    link = obj.link;
    if (obj.type === 'textbox' || obj.type === 'i-text') {
        color = obj.textBackgroundColor;
    } else {
      color = obj.fill;
    }
    textcolor = obj.fill;
    text = obj.text;
    textsize = obj.fontSize;
    fontfamily = obj.fontFamily;
    webview = obj.webview;
    switch (type) {
        case 'image':
            media = obj.src;
            break;
        case 'video':
            media = obj.media.video;
            break;
        case 'slider':
            media = 'mixture';
            break;
    }

    $('.attributes-wrapper .type input').val(type);
    $('.attributes-wrapper .width input').val(width);
    $('.attributes-wrapper .height input').val(height);
    $('.attributes-wrapper .radius input').val(radius);
    $('.attributes-wrapper .angle input').val(angle);
    $('.attributes-wrapper #objectTop').val(top);
    $('.attributes-wrapper #objectLeft').val(left);
    $('.attributes-wrapper .media input').val(media);
    // $('.attributes-wrapper .mediaPreview').html(preview);
    // $('.attributes-wrapper .scalex input').val(scaleX);
    // $('.attributes-wrapper .scaley input').val(scaleY);
    $('.attributes-wrapper .text input').val(text);
    $('.attributes-wrapper .link input').val(link);
    $('.attributes-wrapper #webviewUrl').val(webview);
    $('.attributes-wrapper .fontsize select option[value=' + textsize + ']').attr('selected',true);
    $('.attributes-wrapper .fontfamily select option[value="' + fontfamily + '"]').attr('selected',true);
    $('#objectColor').spectrum('set', color);
    $('#objectTextColor').spectrum('set', textcolor);

  },
  clean: function(obj){
    $('.attributes-wrapper input').val('');
    $('.attributes-wrapper .mediaPreview').empty();
    console.log('clean');
  }
}