# Su-Weather
![Imgur](http://i.imgur.com/1IYFXZB.png)
A Weather Application based on React.js and use Material Design

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development 

### Prerequisites

In case you don't have npm.To install npm,recommond to use nvm(Node Version Manager)

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

nvm install node //install latest node includes npm
```

### Installing

```
git clone https://github.com/alivelee/su-weather.git

cd su-weather

npm install //install dependencies

```

### Quick start

Thanks to the [create-react-app](https://github.com/facebookincubator/create-react-app),we will have a configuration-free dev experience.

To get started, please clone this git repository and then run npm install once under the project top-level directory.


### `yarn start`


Runs the app in the development mode, using the Webpack-provided "development server".


Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

### `npm run server`

This starts the API server on port 3001, which listens for requests from the client, and proxies to Dark Sky API.
This approach has several benefits, for example: hide the [Dark Sky API key](https://darksky.net/dev/docs/faq#sublicensing), 
and avoid [CORS issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) as well. 

## TODOS

- [ ] Use Redux to refactor
- [ ] Add More Api support
- [ ] City List
- [ ] React Native Support


## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/alivelee/su-weather/tags). 



## Authors

* **Xu Lei** - *Initial work* - [alivelee](https://github.com/alivelee)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments
TODOS
