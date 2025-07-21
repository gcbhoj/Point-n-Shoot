# Point and Shoot Game

Welcome to **Point and Shoot**, a simple yet engaging click-based game where players aim at flying purple bees to capture them.

This application is built using **HTML5 Canvas (2D context)** and **vanilla JavaScript**. All visual assets, including the bees, are rendered using sprite images.

## Purpose of the Project

The core goal behind this game is to **demonstrate how game scores and metadata can be exchanged between two HTML pages without using any API calls**.

## How It Works

- The game is launched from a main application via a URL that includes a `gameId` parameter.

  

- Once the player finishes the game:
- A structured `POST` request is triggered using a standard HTML `<form>`.
- The request includes:
  - `gameId`
  - Score and other game-related data (e.g., time, accuracy)
- This body is submitted back to the main app, which:
  - Parses and **decodes** the data.
  - Performs **integrity checks** (e.g., valid gameId, format, tamper detection).
  - **Stores the results in the database** if valid.

## Features

- HTML5 Canvas rendering
- Sprite-based animations
- Custom game loop (no libraries)
- Score submission using only native HTML/JavaScript
- Seamless integration with any host app via URL parameter and form POST




