(function($) {
  
  /*Draggable function*/
  $('.chat-heads').draggable({
    //axis: "y",
    scroll: false,
    start: function(event, ui) {
      ui.helper.bind("click.prevent",
      function(event) { event.preventDefault(); });
    },
    stop: function(event, ui) {
      setTimeout(function(){
        ui.helper.unbind("click.prevent");}, 300);

        positioner($(this));

      }
  });

  /*Reposition*/
  $(window).resize(function() {

    var window_width = $(window).width();
    var chats = $('.chat-heads');
    chats.each(function(i) {

      if( $(chats[i]).position().left > (window_width)/2 )
      {
        $(chats[i]).css({ left: "auto", right: "-5px" });
      }

    });

  });

  /*Open chat*/
  $('.chat-heads').click(function (e) {
    var chatMessage = $(this).find('.message');
    //First, hide any open messages that aren't us
    if( !chatMessage.is(':visible') ) {
      $('.message:visible').hide();
    }
    //Toggle child message
    chatMessage.toggle(100);
  }); 
  
  //Make sure our chat heads don't stack
  $(document).ready(function() {
    
    var chats = $('.chat-heads');
    var i = 1;
    chats.each(function() {

      $(this).css({ top: i*5 });
      i++;
    });

  });


  /*Positioner*/
  function positioner(heads)
  {
    var window_width = $(window).width();
    var window_height = $(window).height();
    var head_wpostion = heads.position().left;
    var head_hposition = heads.position().top;

    if( head_wpostion > (window_width / 2) )
    {
      heads.animate({left: (window_width-40)+"px"}, 300 );
      heads.animate({left: (window_width-50)+"px"}, 300 );
    }
    else
    {
      heads.animate({left: "-15px"}, 300 );
      heads.animate({left: "-5px"}, 300 );
    }

    if( head_hposition > (window_height - 50) )
    {
      heads.animate({top: (window_height-75)+"px"}, 200 );
      heads.animate({top: (window_height-65)+"px"}, 200 );
    }

    if( head_hposition < 0 )
    {
      heads.animate({top: "15px"}, 200 );
      heads.animate({top: "5px"}, 200 );
    }
  }

})(jQuery);