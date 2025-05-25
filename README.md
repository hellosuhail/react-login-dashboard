# React Login + Dashboard App

This is a simple **React-based login and dashboard app** built as part of an assignment. It allows users to log in with a dummy email/password, fetches data from a public API (PokeAPI), and displays it beautifully in a card layout.

---

##  Features

### Login Screen
- Accepts any valid email and a password (min 8 characters)
- Dummy login (no real backend)
- Saves login state in `localStorage`
- Redirects to dashboard upon successful login

###  Dashboard Screen
- Fetches a list of Pokémon from [PokeAPI](https://pokeapi.co/)
- Displays each Pokémon in a card with:
  - Image
  - Name
  - Height
  - Type(s)
- Shows user's first email initial in a badge
- Logout button to clear login state and return to login screen

---

## Tech Stack

- **Frontend**: React
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API Handling**: Axios
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Storage**: `localStorage`

---

##  Screenshots

> *(Optional: Add screenshots here if you want to impress.)*

---

## Folder Structure

