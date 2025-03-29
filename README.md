# Investigation Chatbot

A dynamic and interactive chatbot designed to simulate an investigation scenario between an investigator and a suspect. The chatbot evaluates the suspect's responses and updates a progress bar based on the correctness of their answers. If the response is correct, the bar moves down; if incorrect, the bar moves up. This project leverages the power of AI through the ChatGPT API to generate realistic and engaging conversations.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [How to Use](#how-to-use)
- [Live Demo](#live-demo)

---

## Features

- **Interactive Investigation**: Engage in a conversation with the chatbot as an investigator questioning a suspect.
- **Progress Bar**: A visual indicator that moves up or down based on the correctness of the suspect's responses.
  - Correct response: The bar moves down.
  - Incorrect response: The bar moves up.
- **AI-Powered Responses**: Utilizes the ChatGPT API to generate intelligent and context-aware replies.
- **Customizable Questions**: Easily modify the questions asked by the investigator to fit different scenarios.

---

## Technologies Used

- **HTML**: Structure of the chat interface and progress bar.
- **CSS**: Styling for a visually appealing design.
- **JavaScript**: Logic for handling user input, API calls, and updating the progress bar.
- **ChatGPT API**: Powers the AI-driven conversation.

---

## How It Works

1. The user interacts with the chatbot by answering questions posed by the investigator.
2. Each response is evaluated:
   - If the response aligns with expected behavior, the progress bar moves down.
   - If the response is inconsistent or incorrect, the progress bar moves up.
3. The ChatGPT API generates realistic and context-aware replies to maintain engagement.

---

## Prerequisites

To use this project locally or deploy it, you'll need:

1. **ChatGPT API Key**:
   - Sign up for a free account at [OpenAI](https://platform.openai.com/).
   - Generate an API key from your dashboard.
   - Replace the placeholder API key in the JavaScript code with your actual key.

2. **Node.js** (Optional):
   - If you're running the project locally and using additional scripts, ensure Node.js is installed.

---

## How to Use

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/Investigation-Chatbot-js.git
   cd Investigation-Chatbot-js


## Live Demo
[Live Demo](#https://bedersaad.github.io/Investigation-Chatbot-js/)
