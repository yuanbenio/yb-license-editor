;( function( $, window, document, undefined ) {

    "use strict";

    // Create the defaults once
    var pluginName = "ybLicenseEditor",
        defaults = {
            defaultLicense: {
                type: 'cc',
                content: {
                    adaptation: 'sa',
                    commercial: 'n'
                }
            }
        };

    function YbLicenseEditor ( element, options ) {
        this.element = element;

        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.license = this.settings['defaultLicense'];

        this.init();
    }

    $.extend( YbLicenseEditor.prototype, {
        init: function() {
            $(this.element).css('display', 'none');
            this.$container = $(this.element.parentNode);
            this.$licenseLabel = $(licenseLabelTpl);
            this.$container.append(this.$licenseLabel);
            this.updateLicenseLabel();
        },
        updateLicenseLabel: function() {

            var $label = this.$licenseLabel.find('.yb-license-label');

            $label.removeClass('cm').removeClass('cc');

            if(this.license.type === 'cc')
            {
                $label.addClass('cc');

                var $license = $label.find('.yb-license.cc');

                $license.removeClass('sa').removeClass('nd').removeClass('nc');

                if(this.license.content.adaptation === 'sa')
                {
                    $license.addClass('sa');
                }else if(this.license.content.adaptation === 'n') {
                    $license.addClass('nd');
                }

                if(this.license.content.commercial === 'n') {
                    $license.addClass('nc');
                }

            }else{
                $label.addClass('cm');
            }
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

    var licenseLabelTpl =
        '<div class="yb-license-editor">' +
            '<div class="yb-license-introduction">本文将使用<a href="https://yuanben.io" target="_blank">「原本」</a>进行版权保护和转载监控</div>' +
            '<div class="yb-license-label">' +
                '<div class="yb-label-name">授权转载协议：</div>' +
                '<div class="yb-icons">' +
                    '<div class="yb-license cc">' +
                        '<a href="javascript:void(0)" title="知识共享（CC）4.0协议" class="yb-icon cc"></a>' +
                        '<a href="javascript:void(0)" title="必须按照许可人指定的方式对作品进行署名" class="yb-icon by"></a>' +
                        '<a href="javascript:void(0)" title="仅被授权出于非商业目的而复制、发行、展览和表演作品" class="yb-icon nc"></a>' +
                        '<a href="javascript:void(0)" title="不允许基于该作品创作演绎作品" class="yb-icon nd"></a>' +
                        '<a href="javascript:void(0)" title="您可以复制、发行、展览和表演作品，也必须允许他人基于该作品创作演绎作品" class="yb-icon sa"></a>' +
                    '</div>' +
                    '<div class="yb-license cm">' +
                        '<a href="javascript:void(0)" title="商业授权" class="yb-icon cm"></a>' +
                        '<span class="yb-price">授权费用&nbsp;<span class="yb-number"></span></span>' +
                    '</div>' +
                '</div>' +
                '<div class="yb-edit-btn">' +
                    '<button type="button">修改协议</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    var licenseEditorTpl = '';

} )( jQuery, window, document );
