/*
This file sets application-wide settings and launches the application when everything has
been loaded onto the page. By default we just render the application Viewport inside the
launch method (see app/views/Viewport.js).
*/Ext.regApplication('BinaryRisk', {
  defaultTarget: "viewport",
  name: "Binary Risk Assessment",
  useHistory: true,
  tabletStartupScreen: "/app/binaryrisk-startup.png",
  launch: function() {
    return this.viewport = new BinaryRisk.Viewport({
      application: this
    });
  }
});
