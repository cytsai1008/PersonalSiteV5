# Personal Website V5

This is the 5th version of my personal website. It's a simple, responsive, and static website that showcases two different aspects of my life: "Real Life" and "Furry Life".

## Technologies Used

*   **HTML:** The structure and content of the website are defined in `index.html`.
*   **CSS:** The website is styled with CSS, located in `style.css`. It uses modern CSS features like flexbox and has a responsive design that adapts to different screen sizes.
*   **JavaScript:** The file `script.js` adds interactivity to the website, including hover effects, click animations, and a light/dark mode switcher.
*   **Linting:** The project uses `eslint`, `htmlhint`, and `stylelint` to enforce code quality and consistency.

## How to Run

This is a static website, so there is no build process. To run the website, simply open the `index.html` file in a web browser.

Alternatively, you can use a simple web server to host the files. For example, you can use the `http-server` package from npm:

```bash
npm install -g http-server
http-server
```

## Linting

To run the linters, you can use the following commands:

*   `npx eslint .`
*   `npx htmlhint index.html`
*   `npx stylelint style.css`
