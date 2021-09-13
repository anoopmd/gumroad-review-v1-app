# slick-app-e2e-tests

E2E Tests for Slick - The App that is going to the moon ;)

### Dependencies
* Node >= v12
* Npm >= v6
* Python >= v2.7

### Installation
```bash
sudo npm install
```
### Usage
```bash
# Run tests
npm test
```

### Common issues in sync mode
```
# Try reinstalling fibers
sudo npm install fibers --unsafe-perm

# Try reinstalling @wdio/sync
sudo npm install  @wdio/sync --unsafe-perm

* You are also expected to have Python 2.7
```
[Webdriverio Sync Vs Async](https://webdriver.io/docs/sync-vs-async.html)

### Other pitfalls
Had issues with chromedriver. I install v91 since that was thwe version of chrome on my system and it worked.

### Contribute
Pull Requests always welcome, as well as any feedback or issues.
