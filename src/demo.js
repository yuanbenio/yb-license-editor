$(function(){
    $('#license-editor').ybLicenseEditor({});

    $('#article-submit').on('click', function(){
        $('#output').text("授权协议：" + $('#license-editor').val());
    });
});