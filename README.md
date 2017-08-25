# README #

1. Clone the repo.
2. Initialize new git repo (`rm -rf .git` and `git init`)
3. Change *name* in package.json file.

### Quick summary: ###

* Project is already configured for development and production use (server-sider rendering).
* Code used for server side-rendering is not minified so its possible to debug ssr with Chrome-Node Dev-Tools.
* Production bundle gets minified and split out vendor dependencies.

Run the project:
1. `yarn` - install dependencies
2. `yarn dev` - start in development mode
3. `yarn production` - build project to /dist directory and run it on node server,
4. `yarn debug-ssr` - run (builded) project with chrome-dev-tools debugging option

### Technology stack: ###
* Yarn for managing dependencies
* React
* React-Router v4
* Redux with redux-logger
* Webpack | WebpackDevServer | HotModuleReplacements
* HtmlWebpackPlugin for automated generating of HTML and hashing resources
* Express and EJS templates for server-side rendering 
* styled-jsx-postcss together with 'precss' plugin and 'autoprefixer'
* babel
    * babel-runtime and babel-plugin-transform-runtime (instead of polyfill)
    * preset env | stage-0
    * 'class' and 'for' attributes in jsx
    * should support latest EcmaScript features
* eslint - airbnb extension