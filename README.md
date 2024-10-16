# Todo List React App

A simple task management application built with **React**, **TypeScript**, and **Vite**. This app allows users to add, edit, and delete tasks while filtering and sorting them based on assignee and priority.

## Features

- Add, edit, and delete tasks
- Sort tasks by priority and assignee
- Filter tasks by assignee and priority
- Mobile-responsive design
- Built with React, Vite, and TailwindCSS for fast development and a modern UI

## Demo

You can view a live demo of the app here: [Live Demo](https://shlominugarker.github.io/todo-list-react-application/)

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/shlomiNugarker/todo-list-react-application.git
cd todo-list-react-application
```

### Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### Run the App Locally

To start the development server:

```bash
npm run dev
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Lints the code using ESLint.
- `npm run predeploy`: Prepares the app for deployment by building it.
- `npm run deploy`: Deploys the app to GitHub Pages.

## Deployment

The project is configured to be deployed on GitHub Pages using the `gh-pages` package. To deploy the app:

1. Make sure the `homepage` field in `package.json` is set to: "homepage": "https://your-username.github.io/your-repo-name"

2. Run the following command to deploy:

```bash
npm run deploy
```

This will build the app and deploy it to the gh-pages branch. Once deployed, the app will be live at: https://your-username.github.io/your-repo-name/

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A superset of JavaScript that adds static types
- **Vite**: A fast front-end build tool
- **Tailwind CSS**: A utility-first CSS framework
- **@tanstack/react-table**: A headless UI for building tables
- **gh-pages**: A package for deploying to GitHub Pages
