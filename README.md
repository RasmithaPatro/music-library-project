# Microfrontends demo application

## How to Install and Run the Project

1. Clone the Repository
The first step is to clone the repository to your local machine. This will create a local copy of the project.

Repository URL: https://github.com/RasmithaPatro/music-library-project.git

git clone https://github.com/RasmithaPatro/music-library-project.git
cd music-library-project


2. Install Dependencies
Once the repository is cloned, you need to install the dependencies for both the Remote App and the Host App.

Remote App Directory: mf-remote-app

Host App Directory: mf-core-app

Navigate to the respective directories and run the following commands to install dependencies.

Command for Remote App:
cd mf-remote-app
npm install

Command for Host App:
cd mf-core-app
npm install

3. Build and Start the Remote App
After installing the dependencies for the Remote App, you need to build and start it. The Remote App will be responsible for providing the music library components.

Remote App Folder: mf-remote-app

Entry Point for Remote App:  MusicApp.jsx 

Command to Build and Start the Remote App:

cd mf-remote-app
npm run build
npm start

4. Start the Host App
Once the Remote App is running, the next step is to start the Host App. The Host App consumes the components provided by the Remote App.

Host App Folder: mf-core-app

Entry Point for Host App: App.jsx 

Command to Start the Host App:

cd mf-remote-app
npm start

The Host App will now be up and running, connecting to the Remote App and displaying the components.

4. Access the Application

Once both applications are running, open your web browser and go to:
http://localhost:3000
You will be able to view and interact with the Microfrontends demo project.

## Key Design Decisions and Trade-offs

Microfrontend Architecture using Module Federation
The project follows a Microfrontend architecture by splitting the application into a Remote App (mf-remote-app) and a Host App (mf-host-app). This approach allows independent development, deployment, and scaling of different parts of the application.

Webpack 5 Module Federation Plugin
Webpack 5’s Module Federation plugin is used to dynamically load components from the Remote App into the Host App at runtime. This design eliminates the need for tightly coupling codebases and makes the system flexible for future expansions.

Code Splitting and Lazy Loading
Key components from the Remote App are loaded lazily in the Host App. This reduces the initial load time of the application and improves performance, especially for users on slower networks.

Separate Dependency Management
Both the Host and Remote apps manage their own dependencies. Critical shared libraries like react and react-dom are shared using Module Federation’s shared module configuration to avoid duplication and potential version conflicts.

Simple CSS Management
CSS is managed separately within each app’s local folder (src/css). This avoids global CSS conflicts across Host and Remote apps but introduces slight duplication, which was considered acceptable for the sake of simplicity in this demo.

Trade-Off: Increased Setup Complexity
While Module Federation brings flexibility, it also introduces some setup complexity — such as configuring Webpack carefully in both Host and Remote apps, handling shared modules properly, and coordinating builds.

Trade-Off: Development Server Coordination
For development purposes, both apps need to run simultaneously (Remote App first, then Host App). Automating this could be improved in the future by using tools like concurrently or Docker Compose.

