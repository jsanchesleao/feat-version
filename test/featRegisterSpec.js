import feat from '../src/main';
import chai from 'chai';

let expect = chai.expect;

describe('feature register', function() {
  it('registers versions of modules', () => {

    feat.register('amodule', {
      'v0': {prop: 1},
      'v1': {prop: 2}
    });

    let amoduleFeat = feat.module('amodule');

    expect(amoduleFeat().prop).to.equal(1);

    feat.set('amodule', 'v1');
    expect(amoduleFeat().prop).to.equal(2);

    feat.set('amodule', 'v0');
    expect(amoduleFeat().prop).to.equal(1);

  });

  it('throws if told to set to a version that does not exist', () => {

    feat.register('amodule', {
      'v0': {prop: 1}
    });

    expect( () => feat.set('amodule', 'v2')).to.throw('Feature [amodule] does not have a version [v2]');

  });

  it('defaults the versions of modules to the lowest, alphabetically', () => {

    feat.register('amodule', {'v1': {prop: 1},
                              'v2': {prop: 2}});

    let amoduleFeat = feat.module('amodule');

    expect(amoduleFeat().prop).to.equal(1);

  });

  it('displays which modules are available and which versions they can be set', () => {

    feat.register('amodule', {'v0': {},
                              'v1': {}});
    feat.register('other', {'v1': {},
                            'v2': {},
                            'v3': {}});

    expect(feat.listModules()).to.deep.equal([
      {module: 'amodule', current: 'v0', availableVersions: ['v0', 'v1']},
      {module: 'other', current: 'v1', availableVersions: ['v1', 'v2', 'v3']}  
    ]);

  });

});
