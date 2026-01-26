# CRUDZASO - IdeaHub

A platform where CRUDZASO employees can register, log in, and share ideas about products, improvements, and experiments.

## Project Description

This project is a frontend-only web application where users can create accounts, log in, and share their ideas with other collaborators. We use only HTML, CSS, JavaScript, and localStorage to store data.

## Team Members

- Daniela Quinto Rios
- Andrés Mauricio Hidrobo Escalona  
- Camilo Flórez Moreno
- Ximena Jaramillo Cardenas

## Features

- User registration
- User login
- Create, edit, and delete ideas
- View other users' ideas
- Filter ideas by category and author
- User profile
- Idea counter per user

## Git Flow

We use Git Flow to organize work:

- main: stable version
- develop: main development branch
- feature/: branches for each feature

### How We Work

1. Create feature/ branches from develop
2. Develop the functionality
3. Merge to develop
4. Finally merge develop to main

## Conventional Commits

We use these types of commits:

- feat: new feature
- fix: bug fixes
- style: CSS changes
- refactor: code reorganization
- docs: documentation
- chore: configuration

Examples:
```
feat: add user registration
fix: fix login validation
style: update button colors
```

## How to Run Locally

1. Clone the repository
```
git clone https://github.com/dquintor/CRUDZASO-IdeaHub.git
```

2. Open with a local server (Live Server or similar)

3. Go to index.html to start

## File Structure

```
index.html       (login)
register.html    (registration)  
ideas.html       (ideas feed)
profile.html     (profile)
js/
 auth.js
 ideas.js
 profile.js
 storage.js
   ui.js
styles/
assets/
```

## localStorage Data

- crudzaso_ideahub_users: registered users
- crudzaso_ideahub_ideas: all ideas
- crudzaso_ideahub_session: current session

## Implemented Filters

Ideas can be filtered by:
- Category (product, improvement, experiment, other)
- Author (user list)
- Button to clear filters

Ideas are displayed in Bootstrap cards and only the author can edit/delete their own ideas.
