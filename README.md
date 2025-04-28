# Microfrontends Demo Application

## How to Install and Run the Project

To set up and run the project:

Clone the repository from GitHub:

git clone https://github.com/RasmithaPatro/music-library-project.git

Navigate into the project directory:

cd music-library-project

This project has two parts:

mf-remote-app (Remote Application)

mf-core-app (Host Application)

### Step 1: Build and start the Remote App:

Navigate to the remote app folder:
cd mf-remote-app

Install the dependencies:
npm install

Build the project:
npm run build

Start the Remote App server:
npm start

###  Step 2: Start the Host App:

In a new terminal, navigate to the host app folder:
cd mf-core-app

Install the dependencies:
npm install

Start the Host App server:
npm start

Once both apps are running, open the browser and visit:

http://localhost:3000 — The Host App will consume and display components from the Remote App.

## Key Design Decisions and Trade-offs

### Microfrontend Architecture:
The project uses Webpack's Module Federation to implement microfrontends. The Host App dynamically loads modules from the Remote App at runtime, enabling independent development and deployment of different app sections.

### Independent Builds:
Each application (mf-remote-app and mf-core-app) has its own Webpack config, package.json, and build pipeline. This separation enhances scalability and maintainability.

### Code Splitting and Lazy Loading
Key components from the Remote App are loaded lazily in the Host App. This reduces the initial load time of the application and improves performance, especially for users on slower networks.

### Shared Dependencies:
React and ReactDOM are shared across both apps to avoid loading multiple versions, minimizing bundle size and preventing version conflicts.

### Trade-offs:

Initial setup complexity increases slightly, as both applications must be built and started separately.

Care must be taken to maintain compatibility when upgrading shared libraries across remote and host apps.

During local development, both apps must run simultaneously, which can consume more resources.

## Instructions for Running the Tests and Viewing Test Coverage

## Testing the Remote App (mf-remote-app):

Navigate to the mf-remote-app directory:

cd mf-remote-app

Run the test suite:

npm test

To view test coverage:

Run npm test -- --coverage

After running coverage, a detailed HTML report will be generated inside the coverage folder:

Open coverage/lcov-report/index.html in a browser to view the report.

## Testing the Host App (mf-core-app):

Navigate to the mf-core-app directory:

cd mf-core-app

Run the test suite:

npm test

To view test coverage:

Run npm test -- --coverage

Similar to the Remote App, a coverage folder will be created inside mf-core-app:

Open coverage/lcov-report/index.html in a browser to view the Host App's detailed coverage report.