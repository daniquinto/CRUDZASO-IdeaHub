
# CRUDZASO - IdeaHub

A collaborative idea management platform where CRUDZASO employees can register, log in, and share ideas about products, improvements, and experiments in a simple and intuitive environment.

---

## Project Description

CRUDZASO - IdeaHub is a **frontend-only web application** that enables users to:

- Create an account and authenticate securely
- Publish, edit, and delete ideas
- Explore ideas shared by other collaborators
- Filter ideas by category and author
- Manage a personal profile and track contribution statistics

The project is built exclusively with **HTML, CSS, and JavaScript**, using the browser’s **localStorage** for persistent data storage.

---

## Live Demo

> *[(CRUDZASO - IdeaHub)(https://daniquinto.github.io/CRUDZASO-IdeaHub/)*  
Example: https://your-username.github.io/CRUDZASO-IdeaHub/

---

## Team Members

- Daniela Quinto Rios  
- Andrés Mauricio Hidrobo Escalona  
- Camilo Flórez Moreno  
- Ximena Jaramillo Cardenas  

---

## Features

- User registration and authentication  
- Create, edit, and delete ideas  
- View ideas from other users  
- Filter ideas by category and author  
- User profile with idea counter  
- Session persistence with localStorage  

---

## Technologies Used

- HTML5  
- CSS3  
- JavaScript  
- Bootstrap  
- Browser localStorage  

---

## Git Flow

We follow **Git Flow** to maintain an organized workflow:

- `main` → stable production-ready version  
- `develop` → main development branch  
- `feature/*` → individual feature branches  

### Workflow

1. Create `feature/*` branch from `develop`  
2. Implement functionality  
3. Merge into `develop`  
4. Merge `develop` into `main`  

---

## Conventional Commits

We use standardized commit messages:

- `feat` – new feature  
- `fix` – bug fix  
- `style` – styling changes  
- `refactor` – code improvements  
- `docs` – documentation  
- `chore` – configuration or setup  

### Examples

```
feat: add user registration
fix: fix login validation
style: update button colors
```

---

## How to Run Locally

1. Clone the repository:

```
git clone https://github.com/dquintor/CRUDZASO-IdeaHub.git
```

2. Open the project with a local server (Live Server or similar)

3. Open:

```
index.html
```

---

## File Structure

```
index.html        -> Login page
register.html     -> Registration page
ideas.html        -> Ideas feed
profile.html      -> User profile

js/
 ├── auth.js
 ├── ideas.js
 ├── profile.js
 ├── storage.js
 └── ui.js

styles/
assets/
```

---

## Data Storage (localStorage)

The application stores information using the following keys:

| Key | Description |
|----|------------|
| crudzaso_ideahub_users | List of registered users |
| crudzaso_ideahub_ideas | All created ideas |
| crudzaso_ideahub_session | Current logged-in user |

---

## Data Structures

### User Object

```
{
   id: "string",          // unique user identifier
  name: "string",        // user's full name
  email: "string",       // login email
  password: "string",    // user password
  createdAt: "string"    // account creation date (ISO format)
}
```

### Idea Object

```
{
 id: "string",              // unique idea identifier
  title: "string",           // idea title
  description: "string",     // idea details
  category: "string",        // product | improvement | experiment | other
  authorId: "string",        // id of the user who created it
  createdAt: "string",       // creation date (ISO format)
  likes: ["string"]          // array of user ids who liked the idea
}
```

### Session Object

```
{
  userId: "string",       // id of the logged-in user
  name: "string",         // user's name
  email: "string",        // user's email
  loginTime: "string"     // login date and time (ISO format)
}
```

---

## Implemented Filters

Ideas can be filtered by:

- Category: product, improvement, experiment, other  
- Author (registered users list)  
- Clear filters button  

Ideas are displayed using **Bootstrap Cards**.

Only the author of an idea can edit or delete it.





