(function($) {
  
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

        var window_width = $(window).width();
        var head_postion = $(this).position().left;
        var orientation = {};

        if( head_postion > (window_width / 2) )
        {
          orientation = {left: (window_width-50)+"px"};
        }
        else
        {
          orientation = {left: "-5px"};
        }

        $(this).animate(orientation, 300 );

      }
  });

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
    chats.each(function(i) {
      $(chats[i]).css('top', i*60);
    });
  });

})(jQuery);