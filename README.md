# GDG WRAPPED FRONTEND

This is a brief description of the gdg wrapped website

## Installation

Before you start, make sure you have a recent version of Node.js installed. You can download Node.js from [here](https://nodejs.org/en/download/).

Clone the repository:

```sh
git clone https://github.com/GDGBabcockUniversity/gdg-wrapped-frontend-hacktoberfest.git
```

### Navigate into the project directory

```sh
cd gdg-wrapped-frontend
```

### Install the dependencies:

```sh
npm install 
```

### To start the development server:

```sh
npm run dev
```

### To create an optimized build :

```sh
npx next build
```

### To start the application in production mode:

```sh
npx next start
```
## Custom Theming

This project uses Tailwind CSS for styling and includes custom theme extensions.

### Gradients
We have a custom gradient defined for GDSC branding colors (blue, red, yellow, green).

Config Key: gdsc-gradient (in tailwind.config.ts)

Class Name: bg-gdsc-gradient

Use this class whenever you need to apply the official GDSC brand gradient to a background.