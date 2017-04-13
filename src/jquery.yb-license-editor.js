;( function( $, window, document, undefined ) {

    "use strict";

    // Create the defaults once
    var pluginName = "ybLicenseEditor",
        defaults = {};

    // The actual plugin constructor
    function YbLicenseEditor ( element, options ) {
        this.element = element;

        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( YbLicenseEditor.prototype, {
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example below
            this.yourOtherFunction( "jQuery Boilerplate" );
        },
        yourOtherFunction: function( text ) {

            // some logic
            $( this.element ).text( text );
        }
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new YbLicenseEditor( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );
