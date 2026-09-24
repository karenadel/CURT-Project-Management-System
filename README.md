# CURT Project Manager

A frontend-only team project management system built for the **Cairo University Racing Team (CURT) Software Development Team** frontend task, season 26-27. Users can create projects, break them down into tasks, assign tasks to project members, and track status, priority, and progress.

> **Live demo:** [https://curt-project-management-system.vercel.app](https://curt-project-management-system.vercel.app)
> **Demo video:** [Demo](https://drive.google.com/drive/folders/1mjV7Bde3bxl7HLdMk9kf-AfLtEnkwzuN?usp=drive_link))

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Authentication](#authentication)
5. [Roles & Permissions](#roles--permissions)
6. [Project Structure](#project-structure)
7. [Setup & Running Locally](#setup--running-locally)
8. [Seed Data & Demo Accounts](#seed-data--demo-accounts)
9. [Deployment](#deployment)
10. [Assumptions & Design Decisions](#assumptions--design-decisions)
11. [Limitations](#limitations)

---

## Overview

The app lets teams organise their work:

- **Projects**: create, view, update, and delete projects with a name and description, plus a progress indicator and a member list.
- **Tasks**: create tasks inside a project with a title, description, priority, and status; assign them to project members; update and delete them.
- **Users**: sign up, log in, log out, and stay logged in across page refreshes.

There is **no backend**. All data (users, projects, tasks, session) is persisted in the browser's `localStorage`.

**Status:** To Do → In Progress → Done
**Priority:** Low → Medium → High

---

## Technologies Used

| Purpose | Technology |
| --- | --- |
| UI library | React |
| Build tool | Vite |
| Language | JavaScript |
| Routing | React Router |
| Styling | Plain CSS (no Tailwind) |
| Global state | React Context API |
| Password hashing | [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| Persistence | Browser `localStorage` |

---

## Features

### Core (Level 1)
- Pages: Projects list, Project details, Tasks, Task details, Login, Signup, and a Not Found page
- Navigation between pages with a shared layout and navbar
- Forms for creating and editing projects and tasks
- Full Create / Read / Update / Delete for projects and tasks
- Task status (To Do / In Progress / Done) and priority (Low / Medium / High)
- Form validation (required fields, no empty titles)
- Component-based structure

### Usable UI & Auth (Level 2)
- Sign up, login, and logout using `localStorage`
- Duplicate-email check on signup
- Session persistence across refreshes
- Protected routes (redirect to `/login` when not authenticated) and public routes (redirect logged-in users away from `/login` and `/signup`)
- Task assignment to members of the selected project (`assignedTo` stores a user ID)
- Empty states (e.g. no projects / no tasks)
- Error states (invalid login, empty required fields, duplicate email)

### Advanced (Level 3)
- **My Projects / All Projects** and **My Tasks / All Tasks** views
- Role-based UI and permissions (see [Roles & Permissions](#roles--permissions))
- Project member management (add/remove members, with duplicate prevention; added members become available for task assignment)
- Task filtering by **status**, **priority**, and **assignee**, individually or combined
- Search projects and tasks by name/title (case-insensitive), combined with existing visibility and filters
- Project progress calculated from completed tasks
- Centralised state management with React Context
- Toast notifications for user actions and authentication feedback (project/task created, updated, or deleted; member added or removed; login/signup feedback)

---

## Authentication

Authentication is implemented entirely on the frontend.

**User object**

```js
{
  Id,
  name,
  email,
  password, // bcrypt hash, never the plaintext password
  role      // "admin" | "member"
}
```

**Password hashing with bcryptjs**

Passwords are never stored in plaintext. On signup the password is hashed with `bcryptjs` (10 salt rounds) before being saved:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

On login the entered password is compared against the stored hash:

```js
const passwordMatches = await bcrypt.compare(password, user.password);
```

**Flow**

```
Signup: enter password → bcrypt.hash() → store hashed password → localStorage
Login:  find user by email → bcrypt.compare() → match? → set currentUser
Logout: clear the current user → redirect to /login
```

"Logged in" simply means a `currentUser` entry exists in `localStorage`.

**Route guards** (`src/auth/`)

| Component | Behaviour |
| --- | --- |
| `ProtectedRoute` | Redirects to `/login` if there is no `currentUser` |
| `PublicRoute` | Redirects logged-in users away from `/login` and `/signup` |
| `RoleRoute` | Redirects users whose role is not in `allowedRoles` |

> ⚠️ **Security note:** This is a frontend-only demo. Hashing passwords with bcrypt is good practice, but the hashes are still stored in the browser's `localStorage`, and there is no server-side verification. It is **not** production-secure.

---

## Roles & Permissions

New sign-ups automatically receive the `member` role. Permissions are defined in `src/auth/Permissions.js` and checked with a `can(user, permission)` helper.

| Permission | Admin | Member |
| --- | :---: | :---: |
| Create project | ✅ | ✅ |
| Edit project | ✅ | ❌ |
| Delete project | ✅ | ❌ |
| Create task | ✅ | ✅ |
| Edit task | ✅ | ✅ |
| Delete task | ✅ | ❌ |

Project member management follows the same project-edit permission: only users with the `edit_project` permission can add or remove project members.

**Visibility**

- **Admin** sees all projects and all tasks. The Projects page has *My Projects* (projects they own) and *All Projects* tabs; the Tasks page has *My Tasks* (assigned to them) and *All Tasks* (including unassigned tasks).
- **Member** sees only projects where they are the owner or listed in `memberIds`, and only *My Tasks* (tasks assigned to them).

**Permissions are enforced in two places**

1. **UI**: unauthorised controls are hidden, e.g. `{can(currentUser, "delete_task") && <button>…</button>}`
2. **State layer**: the Provider's functions check permissions before mutating data, e.g. `if (!can(currentUser, "delete_task")) return;`

So bypassing the UI does not bypass the rules.

**Filtering and search are applied after visibility.** Status, priority, and assignee filters, as well as name/title search, run on the projects and tasks a user is already allowed to see, so they can never expose hidden items. Search and filtering are done client-side in the Projects and Tasks pages.

---

## Project Structure

```
src/
├── auth/
│   ├── Permissions.js       # role → permission map + can()
│   ├── ProtectedRoute.jsx
│   ├── PublicRoute.jsx
│   └── RoleRoute.jsx
├── components/
│   ├── common/              # shared/reusable components
│   ├── layout/              # Layout, Navbar
│   ├── projects/            # project cards, forms, etc.
│   └── tasks/               # task cards, forms, filters, etc.
├── context/
│   ├── Context.jsx          # context object
│   ├── Provider.jsx         # state + actions (CRUD, members, auth, toast, can)
│   └── useAppContext.js     # custom hook
├── mockdata/
│   └── seed.js              # seed users, projects, tasks
├── pages/
│   ├── Login/
│   ├── Signup/
│   ├── Projects/
│   ├── ProjectDetails/
│   ├── Tasks/
│   └── TaskDetails/
├── utils/
│   ├── constants.js         # STATUSES, PRIORITIES, storage keys
│   ├── helpers.js           # selectors: getMyTasks, getProjectProgress, …
│   └── storage.js           # localStorage read/write helpers
├── App.jsx                  # routes
└── main.jsx
```

**Routes**

```
/                  → redirects to /projects
/login             (public)
/signup            (public)
/projects          (protected)
/projects/:projectId
/tasks
/tasks/:taskId
*                  → Not Found
```

**State management**

The Provider holds `projects`, `tasks`, `users`, and `currentUser`, initialised lazily from `localStorage` and persisted back with `useEffect` whenever they change. It exposes:

`addProject`, `updateProject`, `deleteProject`,
`addProjectMember`, `removeProjectMember`,
`addTask`, `updateTask`, `deleteTask`,
`login`, `signup`, `logout`, `can`,
`toast`, and `showToast`

Deleting a project also deletes all of its tasks.

---

## Setup & Running Locally

**Prerequisites:** Node.js (v18 or later recommended) and npm.

```bash
# 1. Clone the repository
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_FOLDER>

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

**Other scripts**

```bash
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

---

## Seed Data & Demo Accounts

On first load (when `localStorage` is empty), the app is seeded with sample users, projects, and tasks from `src/mockdata/seed.js`, so it can be explored immediately.

**Demo accounts** 

| Role | Email | Password |
| --- | --- | --- |
| Admin | email: admin@example.com | password: 123123 |
| Member | email: member@example.com | password: 123456 |

You can also create your own account on the Signup page (new accounts are members).

**Resetting the data:** if the seed data doesn't seem to update (for example after editing `seed.js`), clear the stored data in the browser console and refresh:

```js
localStorage.clear();
```

or remove individual keys (`PROJECTS`, `TASKS`, `USERS`, `CURRENT_USER`) via DevTools → Application → Local Storage.

---

## Deployment

The app is deployed on **Vercel**.

- **Platform:** Vercel
- **Live URL:** [https://curt-project-management-system.vercel.app](https://curt-project-management-system.vercel.app)
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

Because all data is stored in the browser's `localStorage`, the deployed app seeds itself with the sample data on first visit, and each visitor's changes stay in their own browser.

To run the project locally instead, follow [Setup & Running Locally](#setup--running-locally).

---

## Assumptions & Design Decisions

- **Global roles.** Roles are `admin` and `member` and are stored on the user. New signups are members.
- **Project ownership.** The creator becomes the project's `ownerId`. New projects start with an empty `memberIds` list.
- **Project members.** Users with the `edit_project` permission can add and remove members from a project. Duplicate members are prevented, and the project owner is always an eligible user for task assignment.
- **Assignment.** A task can be assigned to the project's owner or any of its members. Changing a task's project resets the assignee.
- **Unassigned tasks.** A newly created task has `assignedTo: null` unless someone is selected. It correctly does not appear under *My Tasks*; admins can find it under *All Tasks*.
- **Progress.** Project progress = completed tasks ÷ total tasks × 100, rounded; 0 if the project has no tasks.
- **Task form validation.** Title and project are required.
- **IDs.** Generated with `crypto.randomUUID()`.

---

## Limitations

- No backend, API, database, or server-side authentication
- Data lives in one browser's `localStorage`: it is not synced across devices, is not shared between users, and disappears if site data is cleared
- Password hashes are stored client-side, so this is not suitable for real credentials or sensitive data

---

## Author

Karen Adel Reyad · Cairo University Racing Team, Software Team Task 26-27
