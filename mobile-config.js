App.icons({
  android_mdpi: './imports/img/ic_launcher-48.png',
  android_hdpi: './imports/img/ic_launcher-72.png',
  android_xhdpi: './imports/img/ic_launcher-96.png',
  android_xxhdpi: './imports/img/ic_launcher-144.png',
  android_xxxhdpi: './imports/img/ic_launcher-192.png',
});
App.launchScreens({
  android_mdpi_portrait: './imports/img/android-320-480.png',
  android_hdpi_portrait: './imports/img/android-480-800.png',
  android_xhdpi_portrait: './imports/img/android-720-1280.png',
  android_xxhdpi_portrait: './imports/img/android-960-1600.png',
  android_xxxhdpi_portrait: './imports/img/android-1280-1920.png',
})
App.accessRule('*');
App.setPreference('StatusBarBackgroundColor', '#3f51b5');
App.setPreference('StatusBarStyle', 'lightcontent');
