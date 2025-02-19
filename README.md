# React Project Assignment

## Overview
This project is a React-based web application that includes a counter, user data form, and a rich text editor. It utilizes the following technologies:

- **UI Library:** Material UI
- **Animations:** React Spring
- **State Management:** Redux Toolkit(RTK)
- **Routing:** React Router
- **Charts & Visualization:** Recharts
- **Rich Text Editor:** React Quill
- **Firebase Authentication:** Google Sign-in
- **Package Manager:** Yarn

---
## Functional Components
### 1. Counter Component
- Buttons for increment, decrement, and reset.
- Count value persists across re-renders.
- Background color changes dynamically in a linear manner based on count.
- Reset button restores the background color to the initial state.

### 2. User Data Form
- Form fields: Name, Address, Email, Phone.
- Auto-generates a unique user ID.
- Saves user data to Local Storage and Redux Toolkit (RTK).
- Alerts users about unsaved changes if they try to close the browser.

### 3. Rich Text Editor
- Displayed user data in JSON format.
- Supports formatting options such as bold, italic, underline, and lists.
- Ensured data persistence.

### 4. Additional Features (Optional)
#### User Authentication
- Implements sign-in and sign-up using Firebase Authentication.{tried to but failed}
- Includes private and public routes with mock authentication validation.

#### Dashboard Visualization
- A dashboard displaying counter and user profile details.
- Uses **Recharts** to visualize user profile trends.(Have hardcoded admin data but user data is fetched from 
the local storage in interval of 5 sec)

---
## Project Structure
```
📦 upliance
├── 📂 node_modules
├── 📂 public
├── 📂 src
│   ├── 📂 auth
│   │   ├── firebase.js
│   ├── 📂 components
│   │   ├── Chart.js
│   │   ├── Counter.js
│   │   ├── Navbar.js
│   │   ├── PrivateRoute.js
│   │   ├── RichTextEditor.js
│   │   ├── UserForm.js
│   ├── 📂 pages
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Profile.js
│   │   ├── Signup.js
│   ├── 📂 redux
│   │   ├── counterSlice.js
│   │   ├── store.js
│   │   ├── userSlice.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── themes.js
├── .gitignore
├── package.json
├── README.md
```
---
## Installation & Setup
### Prerequisites
- **Yarn** as the package manager.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/sharky412/Upliance
   cd upliance
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
   yarn start
   ```

---
## Tech Stack
| Feature            | Library/Tool |
|--------------------|-------------|
| UI Library        | Material UI 
| Animations        | React Spring |
| State Management  | Redux Toolkit (RTK) |
| Routing           | React Router |
| Charts            | Recharts |
| Rich Text Editor  | React Quill |
| Authentication    | Firebase (optional) |
| Package Manager   | Yarn |
------------------------------------
