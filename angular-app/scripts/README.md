## CORDOVA HOOK

# Install

In **config.xml** add 

```xml

<platform name="android">

    <hook src="scripts/bin/android_after_plugin_installed.js" type="after_plugin_install" />

</platform>


<platform name="ios">

    <hook src="scripts/bin/ios_after_plugin_installed.js" type="after_plugin_install" />

</platform>
```
