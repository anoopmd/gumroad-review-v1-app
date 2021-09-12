# Slick Review App V1
UI for the Slick Review App V1.

![Demo](/assets/images/demo.png "Demo")
## Dependencies
* Npm >= v6
* NodeJs >= v10

## Install
```bash
sudo npm install
```
## Workflow
```bash
# continuous incremental rebuild + web server (dev version)
npm start

# continuous incremental rebuild + web server + proxy ws calls
./node_modules/.bin/gulp start:proxy --proxy 'http://localhost:9000'

# build
npm run build

# docker build image
docker build -t slick-app .

# docker run container
docker run -d -p 9000:80 slick-app
```

## Backend
The backend services repo is located [here](https://github.com/anoopmd/slick-review-backend)

## Todo / Suggested Improvements
- [ ] Unit tests
- [ ] Integration tests
- [ ] Move templates to a seperate folder
- [ ] Add lint check
- [ ] Minify build for production

## Thanks
Made possible by
- [jQuery](https://jquery.com/) - AJAX and DOM manipulations
- [Bootstrap 5](https://getbootstrap.com/) - CSS Styles
- [Sass](https://sass-lang.com/) - CSS PreProcessor
- [Gulp](https://gulpjs.com/) - Task Runner
- [SVG Star Rating](https://github.com/nashio/star-rating-svg) - Star Rating Widget

### License
[MIT](readme.md)
