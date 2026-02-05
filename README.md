# Will You Be My Valentine?

Welcome to the "Will You Be My Valentine?" project, a playful and interactive way to ask that special someone the big question this Valentine's Day. Hosted as a GitHub Page, this project offers a unique blend of creativity and technology to make your Valentine's Day proposal unforgettable.

## Overview

"Will You Be My Valentine?" is a web-based application that presents users with the question "Will you be my valentine?" followed by two options: "Yes" and "No". What makes this project special is the interactive and engaging way it handles responses, especially if someone tries to click "No".

## Features

- **Interactive Question**: The core of the project is the interactive Valentine's Day proposal.
- **Responsive Design**: Crafted to look great on both desktop and mobile devices.
- **Playful Interaction**: If the user attempts to click "No", watch out for a little surprise that might just sway their decision!

## Technology

This project is built using simple yet powerful web technologies:
- HTML
- CSS
- JavaScript

## How to View

To experience "Will You Be My Valentine?", simply visit [https://mehedyhassanratul.github.io/moonshine/](https://mehedyhassanratul.github.io/moonshine/) from any modern web browser.

## Save Selections to a Google Sheet (Vercel)

This repo includes a Vercel Serverless Function that forwards the final selections (date/food/dessert/activities) to a Google Apps Script Web App, which appends them to a Google Sheet.

### 1) Create the Google Sheet

Create a Google Sheet where you want to store submissions.

### 2) Create an Apps Script Web App

In Google Sheets: Extensions → Apps Script, then paste a simple `doPost` handler that appends rows.

Your web app should accept JSON like:

```json
{"time":"...","sessionId":"...","date":"...","food":["..."],"dessert":["..."],"activities":["..."],"userAgent":"..."}
```

Deploy it as a Web App (accessible to "Anyone" or "Anyone with the link"). Copy the deployment URL.

### 3) Add Environment Variables in Vercel

In Vercel → Project → Settings → Environment Variables add:

- `GSHEETS_WEBHOOK_URL` = your Apps Script Web App URL

See [.env.example](.env.example) for the variable names.

### 4) Deploy

Deploy the project to Vercel as a standard static site. Vercel will also deploy the function in [api/submit.js](api/submit.js).

### Notes

- Never commit secrets (SMTP passwords, API keys) into the repo.
- If you accidentally shared a secret, rotate it immediately.

## How to Contribute

Contributions to the "Will You Be My Valentine?" project are more than welcome. Whether it's suggesting new features, improving the design, or fixing bugs, here's how you can contribute:

1. **Fork the Repository**: Start by forking the [project repository](https://github.com/mehedyhassanratul/moonshine/) on GitHub.
2. **Clone Your Fork**: Clone your fork to your local machine for development.
3. **Create a New Branch**: Make a new branch for your changes.
4. **Make Your Changes**: Implement your feature, fix, or improvement.
5. **Commit Your Changes**: Commit your changes with a clear and descriptive commit message.
6. **Push to Your Fork**: Push your changes up to your fork.
7. **Open a Pull Request**: Back on GitHub, open a pull request from your fork to the main project.

## Support

If you encounter any issues or have questions about the project, feel free to open an issue on the GitHub repository.
