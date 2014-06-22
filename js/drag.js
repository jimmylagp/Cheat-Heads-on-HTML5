// Draggable plugin
(function($) {
    $.fn.drag = function(options) {
        options = $.extend({
            handle: null,
            cursor: 'move',
            draggingClass: 'dragging',
            heads: null
        }, options);

        var status = true;
        var $handle = this,
            $drag = this;

        if( options.handle ) {
            $handle = $(options.handle);
        }

        $handle.css('cursor', options.cursor).on("mousedown", function(e) {
            var x = $drag.offset().left - e.pageX,
                y = $drag.offset().top - e.pageY,
                z = $drag.css('z-index'),
                oldx = $drag.offset().left,
                oldy = $drag.offset().top;

            $drag.css('z-index', 100000);
            
            $('.chat-box').css({'-webkit-transition': 'all .2s ease-in-out'});
            $('.chat-box').css({'-webkit-transform-origin': 'left top'});

            $(document.documentElement).on('mousemove.drag', function(e) {
                var head_wpostion = $(options.heads).position().left;
                var head_hposition = $(options.heads).position().top;
                var chats = $(options.heads);

                chats.each(function(i) {
                        $(chats[i]).css({ left: $(chats[i]).next().position().left});
                        $(chats[i]).css({top: $(chats[i]).next().position().top});
                });

                $drag.offset({
                    left: x + e.pageX,
                    top: y + e.pageY
                });
            })
            .one('mouseup', function() {
                $(this).off('mousemove.drag');
                $drag.css('z-index', z);

                if($drag.offset().left == oldx && $drag.offset().top == oldy)
                {
                    var chats = $(options.heads);
                    if(status)
                    {
                        status = false;
                        chats.each(function(i) {
                            $(chats[i]).animate({ left: 70*(i+3), top: 30 }, 100);
                        });
                        
                        $('.chat-box').css({left: $drag.css('left') + 140, top: $drag.css('top') + 70});
                        $('.chat-box').css({'-webkit-transform': 'scale(1)'});
                    }
                    else
                    {
                        status = true;
                        $('.chat-box').css({'-webkit-transform': 'scale(0)'});
                        positioner();
                    }
                }
                else
                {
                    positioner();
                }
            });

            // disable selection
            e.preventDefault();
        });

        /*Reposition*/
        $(window).resize(function() {
            var window_width = $(window).width();
            var chats = $(options.heads);
            chats.each(function(i) {

                if( $(chats[i]).position().left > (window_width)/2 )
                {
                    $(chats[i]).css({ left: "auto", right: "-5px" });
                }

            });

        });


        function positioner(head_wpostion, head_hposition)
        {
            var window_width = $(window).width();
            var window_height = $(window).height();
            var head_wpostion = $(options.heads).position().left;
            var head_hposition = $(options.heads).position().top;

            if( head_wpostion > (window_width / 2) )
            {
              $(options.heads).animate({left: (window_width-40)+"px"}, 300 );
              $(options.heads).animate({left: (window_width-50)+"px"}, 300 );
            }
            else
            {
              $(options.heads).animate({left: "-15px"}, 300 );
              $(options.heads).animate({left: "-5px"}, 300 );
            }

            if( head_hposition > (window_height - 50) )
            {
              $(options.heads).animate({top: (window_height-75)+"px"}, 200 );
              $(options.heads).animate({top: (window_height-65)+"px"}, 200 );
            }

            if( head_hposition < 0 )
            {
              $(options.heads).animate({top: "15px"}, 150 );
              $(options.heads).animate({top: "5px"}, 150 );
            }
        }
    };
 

})(jQuery);