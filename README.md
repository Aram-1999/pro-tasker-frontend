# Pro Tasker FrontEnd

Pro Tasker Frontend is a React-based application for managing projects and tasks. Users can register, sign in, create projects, and add tasks to projects. The app communicates with a backend API and uses JWT authentication to keep user data secure. When users first visit the site, they land on the homepage, which displays a welcome message. The navigation bar allows users to log in or register. After logging in, users are redirected to the Projects page, where they can create, update, or delete projects. Each project has its own details page, which includes forms for adding, editing, and deleting tasks.

## Features

* **Modualr Structure:** The app uses separate, reusable components, including: TaskForm, ProjectForm, TaskCard, ProjectCard, Navbar. Routing is created to ensure smooth navigation between pages.

* **Authenticantion and Security:** 
The app maintains secure user authentication by generating a JWT token when the user logs in and storing it in local storage. The token is automatically removed after two hours, and logging out triggers the backend to store the token in an invalid token list for added security.

* **React Hooks and Context:** React hooks and context are used to manage project and task state as well as the authentication state. Once a user logs in, the navigation bar adjusts to show the Projects and Logout options rather than the Register and Sign In buttons.

## Screenshot

![A screenshot of the website](./src/assets/willowy-genie-21c7f0.netlify.app_projects.png)

## Setting Up and Running Locally

To run the application locally, start by cloning the repository from GitHub. Replace anything wrapped in angle brackets with the appropriate values for your project.

```
git clone https://github.com/Aram-1999/pro-tasker-frontend.git <project_name>
cd <project_name>
npm install
```
Next, connect the backend by creating a .env file in the root of the project and adding the line:
```
VITE_API_BASE_URL=<backend server URL such as http://localhost:4000>
```
Run the app:
```
npm run dev
```