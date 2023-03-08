module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Zetchi',
          name: 'MeosisCall',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
  packagerConfig: {
    icon: './src/img/m-Vert', // no file extension required
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        //Gif during install
        loadingGif:'./src/gif/rocket.gif',
        // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
        iconUrl: 'https://www.meosis.fr/wp-content/uploads/2018/08/cropped-prestation07-192x192.png',
        // The ICO file to use as the icon for the generated Setup.exe
        setupIcon: './src/img/m-Vert.ico',
        //Name of setup.exe
        setupExe: 'meosiscall-setup.exe'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
