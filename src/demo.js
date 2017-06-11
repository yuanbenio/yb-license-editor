$(function(){
    $('#license-editor').ybLicenseEditor({});

    $('#alt-license').ybLicenseEditor({
        licensePickerSubmitButtonText: '认证文章',
        onLicenseSelected: function(selectedLicense){
            $('#output').text("授权协议：" + JSON.stringify(selectedLicense));
        }
    });

    $('#article-submit').on('click', function(){
        $('#output').text("授权协议：" + $('#license-editor').val());
    });
});
