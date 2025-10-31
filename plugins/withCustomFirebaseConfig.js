const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withCustomFirebaseConfig = config => {
  return withDangerousMod(config, [
    'ios',
    async config => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        'LinkUp/AppDelegate.swift'
      );
      
      let contents = fs.readFileSync(filePath, 'utf-8');
      
      // Add import if not exists
      if (!contents.includes('import Firebase')) {
        contents = contents.replace(
          'import ExpoModulesCore\n',
          'import ExpoModulesCore\nimport Firebase\nimport FirebaseCore\n'
        );
      }
      
      // Add Firebase configuration
      if (!contents.includes('FirebaseApp.configure()')) {
        contents = contents.replace(
          'return super.application(application, didFinishLaunchingWithOptions: launchOptions)',
          'FirebaseApp.configure()\n        return super.application(application, didFinishLaunchingWithOptions: launchOptions)'
        );
      }
      
      fs.writeFileSync(filePath, contents);
      return config;
    },
  ]);
};

module.exports = withCustomFirebaseConfig;
