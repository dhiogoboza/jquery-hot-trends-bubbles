/**
 * Created by dhiogoboza on 30/11/17.
 * Available at: https://github.com/dhiogoboza/jquery-hot-trends-bubbles
 * A jQuery plugin to display bubbles with sizes relative to topics relevance.
 */

(function ($) {
    
    $.fn.htb = function (options) {
        var settings = $.extend({
            data: null,
            key: "name",
            value: "value",
            onSelection: null
        }, options );
        
        return this.each(function() {
            var $this = $(this);
            
            function initNodes() {
                
            }
                       
            function initEvents() {
                
            }
            
            initNodes();
            initEvents();
        });
    };
})(jQuery);
