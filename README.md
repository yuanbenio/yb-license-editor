### Yuanben License Editor

A jQuery plugin to quickly embed the Yuanben license editor in your website.


## Install

### npm

```
npm install --save yb-license-editor
```

### bower
```
bower install yb-license-editor
```


## Basic Usage

```
<!-- load stylesheet -->
<link rel="stylesheet" href="jquery.yb-license-editor.css" />

<!-- bind to an input element -->
<input type="text" id="yb-license-editor" />

<!-- load script file -->
<script type="text/javascript" src=jquery.yb-license-editor.js"></script>

<!-- initialize -->
<script type="text/javascript">
$(function(){
    $('#yb-license-editor').ybLicenseEditor(
        {
            defaultLicense: {
                type: 'cc',
                content: {
                    'adaptation': 'sa',
                    'commercial': 'n'
                }
                
            }
        }
    );
});
</script>
```

## Configuration

defaultLicense: Default selected license

defaultLicense.type: 'cc' (Creative Commons) or 'cm' (Commercial)

defaultLicense.content.adaptation: 'y' or 'n' for CM license,
'y','n' or 'sa' (Share Alike) for CC license

defaultLicense.content.commercial: 'y' or 'n'. CC license only

defaultLicense.content.price: integer. CM License only