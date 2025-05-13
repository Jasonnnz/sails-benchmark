# populate-benchmark

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)

### Lift sails
Lift sails via `sails lift` to populate base tables then proceed to run the benchmark.

### Populate seed data
I used a python script to help populate seed data. The script is located in `migrations/seed_data.py`. Please make sure you input the correct DB credentials before running the script to seed data. I have python 3.9.13 install locally

```
pip3 install -r requirements.txt
python3 migrations/seed_data.py
```

### Benchmark
Run `user-benchmark` located in benchmarks folder. It will automatically seed data prior to running the test.

```
node benchmarks/user-benchmarks.js
```
