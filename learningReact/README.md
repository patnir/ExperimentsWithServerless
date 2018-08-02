# Notes

```
npm -i g
```

### Basics

Every React application is a tree of components.

A component is typically implemented as a Javascript class that has some state and render method:

```
class Tweet {
    state = {}; // data we want to disply when the component is rendered
    render() { // responsible for what the UI should look like
    output: React element which is a simple plain JS object that maps to a DOM element.
    }
}
```

React keeps a lightweight representation of DOM in memory which is called the virtual DOM

- it is cheap to create and change a component
- it figures out what the differences are with the real DOM and updates only that part
- we just need to change the state of our components and react will automatically update teh DOM to match the state

create-react-app react-app is going to install:

- lightweight development
- server web pack from bundling our files
- babel for transpiling JSX to JS

```
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react-app
  npm start
```

Props:

> Data that is given to a component. React does not allow you to change the value of props for a particular component.

State:

> Data that is local or private to that component
