const Sails = require('sails');
const Benchmark = require('benchmark');
const { performance } = require('perf_hooks');
const { faker } = require('@faker-js/faker');

async function resetAndSeed(users = 1000, petsPerUser = 2) {
  await Pet.destroy({});
  await User.destroy({});

  const userData = Array.from({ length: users }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }));

  const createdUsers = await User.createEach(userData).fetch();

  const petData = [];
  for (const user of createdUsers) {
    for (let i = 0; i < petsPerUser; i++) {
      petData.push({
        name: faker.animal.cat(),
        user: user.id,
      });
    }
  }

  await Pet.createEach(petData);
  console.log(`Seeded ${createdUsers.length} users and ${petData.length} pets.`);
}

// Named query functions for clarity
async function findAllUsers() {
  return await User.find();
}

async function findAllUsersWithLimit() {
  return await User.find({ limit: 9999 });
}

async function findUsersWithPetsAndLimit() {
  return await User.find({ limit: 9999 }).populate('pets');
}

// Utility to time a single execution
async function logExecutionTime(label, fn) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(2)} ms`);
}

// Lift Sails and run benchmarks
Sails.lift(
  {
    hooks: { grunt: false },
    log: { level: 'warn' },
  },
  async (err, sailsApp) => {
    if (err) {
      console.error('Failed to lift Sails:', err);
      return;
    }

    try {
      console.log('Seeding data...');
      await resetAndSeed();

      // Log real-world timings
      console.log('--- Real Execution Times ---');
      await logExecutionTime('Find all users', findAllUsers);
      await logExecutionTime('Find all users with limit', findAllUsersWithLimit);
      await logExecutionTime('Find users with pets and limit', findUsersWithPetsAndLimit);

      console.log('\n--- Benchmark Results ---');
      const suite = new Benchmark.Suite();

      suite
        .add('Find all users (no populate, no limit)', {
          defer: true,
          fn: async function (deferred) {
            await findAllUsers();
            deferred.resolve();
          },
        })
        .add('Find all users (limit 9999)', {
          defer: true,
          fn: async function (deferred) {
            await findAllUsersWithLimit();
            deferred.resolve();
          },
        })
        .add('Find users with pets (limit 9999)', {
          defer: true,
          fn: async function (deferred) {
            await findUsersWithPetsAndLimit();
            deferred.resolve();
          },
        })
        .on('cycle', (event) => {
          console.log(String(event.target));
        })
        .on('complete', function () {
          console.log('\nFastest is: ' + this.filter('fastest').map('name'));
          sailsApp.lower(() => process.exit());
        })
        .run({ async: true });
    } catch (e) {
      console.error('Benchmark failed:', e);
      sailsApp.lower(() => process.exit(1));
    }
  }
);
