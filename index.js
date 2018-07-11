const fs = require('fs');
const os = require('os');
const path = require('path');

const File = require('phylo');

const fsExistsSync = function (file) {
    try {
      fs.accessSync(file);
      return true;
    } catch (ignore) {
      return false;
    }
  }

const osType = process.platform === 'darwin' ? 'macOS' : process.platform === 'win32' ? 'windows' : 'linux';
const variations = {
    CHROME: 0,
    CHROME_CANARY: 1,
    CHROMIUM: 2
}
// Source: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md
const locations = {
    macOS: [
        `${os.homedir()}/Library/Application Support/Google/Chrome`,
        `${os.homedir()}/Library/Application Support/Google/Chrome Canary`,
        `${os.homedir()}/Library/Application Support/Chromium`
    ],
    windows: [
        `${process.env.LOCALAPPDATA}\\Google\\Chrome\\User Data`,
        `${process.env.LOCALAPPDATA}\\Google\\Chrome SxS\\User Data`,
        `${process.env.LOCALAPPDATA}\\Chromium\\User Data`
    ],
    // TODO: consider the `~/.config` part can be overriden by $CHROME_VERSION_EXTRA or $XDG_CONFIG_HOME
    linux: [
        `${os.homedir()}/.config/google-chrome`,
        `${os.homedir()}/.config/google-chrome-beta`,
        `${os.homedir()}/.config/chromium`
    ]
};

module.exports = function (variant = variations.CHROME) {
    return fs.readdirSync(locations[osType][variant])
        .filter(f => f !== 'System Profile' && fsExistsSync(path.join(locations[osType][variant], f, 'Preferences')))
        .map(p => {
            let profileInfo = File.from(path.join(locations[osType][variant], p, 'Preferences')).load({type: 'json'});
            return {
                displayName: profileInfo.profile.name,
                profileDirName: p,
                profileDirPath: path.join(locations[osType][variant], p),
                profilePictureUrl: profileInfo.profile.gaia_info_picture_url || null
            };
        });
};

module.exports.variations = variations;