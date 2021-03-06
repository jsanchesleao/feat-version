import dashboard from './webDashboard';

let features = {};
let versions = {};
let versionListeners = {};

let getLowestVersion = function(implementations) {
  let [first, ...rest] = Object.getOwnPropertyNames(implementations).sort();
  return first;
};

let register = function(name, implementations) {
  features[name] = implementations;
  versions[name] = getLowestVersion(implementations);
  versionListeners[name] = [];
};

let module = function(name) {
  let version = versions[name]
  let current = features[name][version];
  versionListeners[name].push(function(newVersion) {
    version = newVersion;
    current = features[name][version];
  });

  let ret = () =>current;

  Object.defineProperty(ret, '_version', {get: () => version});

  return ret;
};

let set = function(name, version) {
  if (!features[name] || !features[name][version]) {
    throw new Error('Feature [' + name + '] does not have a version [' + version + ']');
  }
  versions[name] = version;
  versionListeners[name].forEach(cb => cb(version));
};

let listModules = function() {
  return Object.getOwnPropertyNames(features)
               .sort()
               .map(moduleName => ({
                  module: moduleName,
                  current: versions[moduleName],
                  availableVersions: Object.getOwnPropertyNames(features[moduleName]).sort()
               }));
}; 


export default {
  register, module, set, listModules, dashboard
};
