;( function( $, window, document, undefined ) {

    "use strict";

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
            $(this.element).hide();

            this.$container = $(this.element.parentNode);
            this.$licenseLabel = $(licenseLabelTpl);
            this.$container.append(this.$licenseLabel);

            this.$licensePicker = $(licensePickerTpl);
            $('body').append(this.$licensePicker);

            var self = this;

            this.$licenseLabel.on('click', '.yb-edit-btn button', function(){
                self.showLicensePicker();
            });

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
        },
        showLicensePicker: function() {
            $('body').addClass('no-scroll');
            this.$licensePicker.show();
        }
    });

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

    var licensePickerTpl =
        '<div class="yb-license-picker">' +
            '<div class="yb-picker-modal">' +
                '<div class="yb-title">编辑转载授权协议</div>' +
                '<div class="yb-content">' +
                    '<div class="license-type">' +
                        '<div class="description">1. 请选择转载许可协议:</div>' +
                        '<div class="options">' +
                            '<div class="option cc">' +
                                '<div class="icon"></div>' +
                                '<label>' +
                                    '<input type="radio" />' +
                                    '知识共享许可协议' +
                                '</label>' +
                                '<div class="triangle"></div>' +
                            '</div>' +
                            '<div class="option cm">' +
                                '<div class="icon"></div>' +
                                '<label>' +
                                    '<input type="radio" />' +
                                    '商业许可协议' +
                                '</label>' +
                                '<div class="triangle"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="license-detail">' +
                        '<div class="cc-adaptation license-item">' +
                            '<div class="description">2. 是否允许你的作品被改编:</div>' +
                            '<div class="question n3">' +
                                '<label>' +
                                    '<input type="radio" ng-model="license.cc.adaptation"/>' +
                                    '是' +
                                '</label>' +
                                '<label>' +
                                    '<input type="radio" ng-model="license.cc.adaptation"/>' +
                                    '否' +
                                '</label>' +
                                '<label>' +
                                    '<input type="radio" ng-model="license.cc.adaptation"/>' +
                                    '是，只要他人以相同方式共享' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cc-commercial license-item">' +
                            '<div class="description">3. 是否允许商业使用:</div>' +
                            '<div class="question n2">' +
                                '<label>' +
                                    '<input type="radio" ng-model="license.cc.commercial"/>' +
                                    '是' +
                                '</label>' +
                                '<label>' +
                                    '<input type="radio" ng-model="license.cc.commercial"/>' +
                                    '否' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cm-adaptation license-item">' +
                            '<div class="description">2. 是否允许你的作品被改编:</div>' +
                            '<div class="question n2">' +
                                '<label>' +
                                    '<input type="radio" />' +
                                    '是' +
                                '</label>' +
                                '<label>' +
                                    '<input type="radio" />' +
                                    '否' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cm-fee license-item">' +
                            '<div class="description">3. 设置转载价格:</div>' +
                            '<div class="question">' +
                                '<div class="price-tag-wrapper">' +
                                    '<div class="price-tag" >10元</div>' +
                                    '<div class="price-tag" >50元</div>' +
                                    '<div class="price-tag" >100元</div>' +
                                    '<div class="price-tag" >500元</div>' +
                                    '<div class="price-tag custom" >' +
                                        '<input type="text" size="10" placeholder="自定义金额"/>' +
                                        '<div class="text">元</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="cc-license-preview">' +
                        '<div class="name">您选择的转载许可协议：</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

} )( jQuery, window, document );
