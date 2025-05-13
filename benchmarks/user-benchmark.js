const Sails = require('sails');

Sails.lift(
  {
    hooks: { grunt: false }, // optionally disable grunt
    log: { level: 'warn' }   // quieter logging
  },
  async (err, sailsApp) => {
    if (err) {
      console.error('Could not lift Sails:', err);
      return;
    }

    const Benchmark = require('benchmark');
    const suite = new Benchmark.Suite();

    suite
      .add('Find all users (no populate, no limit)', {
        defer: true,
        fn: async function (deferred) {
          await User.find();
          deferred.resolve();
        }
      })
      .add('Find all users (no populate) with limit 9999', {
        defer: true,
        fn: async function (deferred) {
          await User.find({ limit: 9999 });
          deferred.resolve();
        }
      })
      .add('Find users with pets with limit 9999', {
        defer: true,
        fn: async function (deferred) {
          await User.find({ limit: 9999 }, { pets: true });
          deferred.resolve();
        }
      })
      .on('cycle', (event) => {
        console.log(String(event.target));
      })
      .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        sailsApp.lower(() => process.exit());
      })
      .run({ async: true });
  }
);
