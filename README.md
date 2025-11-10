# Final Project: "Celery Fitness Studio"

This is the repository for the final web development project. The project is a multi-page, fully responsive website for a fictional fitness studio called "Celery."

##  Live Demo Link

[https://sawakokur0.github.io/webassignment8/](url)

---

##  Implemented Features

This project includes all features required for the Final Project.

### 1. Design & Responsiveness
* **Fully Responsive:** The site displays correctly across all device types (desktop, tablet, mobile).
* **Light & Dark Modes:** A theme switcher (Light/Dark Mode) has been implemented. The user's choice is saved in `localStorage` and applied on future visits.
* **Design Quality:** A clean, professional design with readable fonts and sufficient contrast in both themes.

### 2. Enhanced JavaScript Functionality

#### Authentication (using `localStorage`)
* **Sign Up:** A `signup.html` page was created where users can create an account. Data is saved to `localStorage`.
* **Log In:** A `login.html` page was created. The system validates user credentials against `localStorage`.
* **Profile Page:** A private `profile.html` page displays the logged-in user's name and email. The page is protected from unauthorized access.
* **Dynamic Navigation:** The navigation bar automatically updates to show "Log In/Sign Up" or "Profile/Log Out" based on the user's status.

#### Form Validation
* **Sign Up Form:** Implemented password complexity validation (minimum 8 characters, 1 letter, 1 number) and email validation.
* **Contact Form:** Implemented custom validation: the name must start with a capital letter, and the message must be at least 6 characters long.

#### Data Persistence in `localStorage`
* **Trainer Ratings:** On the `trainers.html` page, users can give a 5-star rating to each trainer. The rating is saved in `localStorage` and displayed on every page load.
* **Theme:** The selected theme (light/dark) is saved.
* **Users:** The user database and current session are stored in `localStorage`.

#### Search & Filtering
* **Trainer Search:** A real-time search filter is implemented on the `trainers.html` page.
* **Schedule Filter:** On the `schedule.html` page, classes can be filtered by category (All, Yoga, Pilates, Strength).

### 3. External API Integration
* **Advice of the Day:** The homepage (`index.html`) features a widget that asynchronously fetches and displays a random piece of advice using `fetch` from the public API (`https://api.adviceslip.com/advice`).

### 4. Additional Dynamic Elements
* **Scroll Progress Bar:** A vertical indicator on the left side of the screen shows the user's scroll progress.
* **"Happy Clients" Counter:** An animated number counter on the homepage that triggers when scrolled into view.
* **Dynamic Generation:** Trainer cards are generated dynamically from a JavaScript array.

---

##  Tech Stack

* HTML5 (Semantic Markup)
* CSS3
    * Flexbox & Grid
    * Responsive Media Queries
    * CSS Variables (for theming)
* JavaScript (ES6+)
    * DOM Manipulation
    * `localStorage`
    * Asynchronous `fetch`
    * Event Handling & Validation
* Bootstrap 5 (for grid system and base components)
* jQuery (for simplified DOM manipulation and events)
