# Star Wars Starships Explorer 🚀✨

Set sail across the Star Wars universe with our Angular 17 powered web app, safeguarded by JWT authentication. Discover every starship in the saga and uncover the secrets they hold. A universe of adventure awaits. May the force guide you as you navigate through this stellar adventure!

## Features 🛸🔍

- 📜 **Explore Starships**: Browse through an extensive list of Star Wars starships, showcasing names and models. 
- 💡 **Starship Details**: Click to see detailed info about each starship, including specifications and appearances. 
- ⏬ **Navigation Options**: Use pagination or infinite scroll to navigate through the starships catalog. 
- 🎨 **Star Wars Theme**: The design is heavily inspired by the Star Wars universe, offering an immersive experience. 
- 🔐 **Secure Access**: Log in and registration are powered by `json-server-auth (json-server@0.17.4)`, keeping the data secure. 
- 🛡️ **Protected Routes**: Advanced route guarding ensures that navigation within the app remains secure. 

## Getting Started 🌠

1. **Clone** the repository to your local machine.
2. Make sure you have **Node.js** and **Angular CLI** installed.
3. Run `npm install` to **install dependencies**.
4. **Launch** the app with `ng serve`.
5. **Active Backend** run the terminal `npx json-server-auth db.json`.
6. **API Check** (optional) at `http://localhost:3000`.
7. **Visit** `http://localhost:4200` to start exploring.


## Unit Testing with Jasmine & Karma 🛠️🛰️

Our application's resilience and functionality are ensured through unit tests for key components, facilitated by Jasmine and Karma. To embark on the testing journey, simply execute `ng test`.

🔑**Login Tests**:
  - Validates initial form state with empty fields.
  - Verifies successful login with valid credentials.
  - Asserts validation for empty or incorrect inputs.

📝**Register Tests**:
  - Tests valid form submission and navigation.
  - Displays error message upon registration failure.

🕹️**Navbar Tests**:
  - Confirms navigation links to Home and Starships pages.
  - Ensures the presence of `router-outlet` for component rendering.

Leverage these tests to ensure the Star Wars Starships Explorer operates at the zenith of its capabilities. We welcome your contributions to enhance this cosmic journey!


## License 📄

Distributed under the MIT License. It allows for free use, modification, and distribution of the software.

## Contributing 🤝

Your contributions make the open-source community thrive. Feel free to **fork**, **edit**, and **submit pull requests** to help improve the Star Wars Starships Explorer.