---
title: "LinkedIn Job Snatcher"
description: "Snatch job descriptions from LinkedIn with one click, prepend AI prompts, and copy to your clipboard."
---

<!-- Hero Section -->
<div class="hero">
  <h1>LinkedIn Job Snatcher</h1>
  <p class="lead">Save time extracting job descriptions and generating AI-powered prompts right from LinkedIn.</p>
  <p>
    <a class="button button-primary" href="https://chrome.google.com/webstore/detail/your-extension-id" target="_blank">Add to Chrome</a>
    <a class="button" href="https://github.com/nilla-moige/chrome-extension-linkedIn-job-snatcher" target="_blank">View on GitHub</a>
  </p>
</div>

<!-- Feature Highlights -->
<div id="features">
## 🚀 Features

### 1. One-Click Copy  

On any LinkedIn Jobs page, click our toolbar button and instantly grab the full job description into your clipboard.

<div class="screenshot"><img src="/images/screenshot-copy.png" alt="One-click copy demo"></div>

### 2. Prebuilt AI Prompts  

Choose from ready-made prompts—like “What skills are most important?”, or “Sample interview questions”—and they’ll be prepended before your clipboard text.

<div class="screenshot"><img src="/images/screenshot-prompts.png" alt="Prompt selection"></div>

### 3. Personal Resume & Cover-Letter Snippets  

Store and toggle your resume or cover-letter text locally. When you fire a prompt, it integrates your personal boilerplate automatically.

<div class="screenshot"><img src="/images/screenshot-resume.png" alt="Resume input"></div>
</div>

<!-- How It Works -->
<div id="how">
## ⚙️ How It Works

1. **Install Extension**  
   Add from the Chrome Web Store or load unpacked in developer mode.
2. **Navigate to LinkedIn Jobs**  
   Go to any job posting—our button becomes active.
3. **Click & Select**  
   Hit the “Snatch” button, choose your AI prompt, and voilà: the text (plus prompt) is in your clipboard.
4. **Paste & Go**  
   Paste into ChatGPT, your editor, or your CRM—instantly ready for analysis, drafting, or outreach.

</div>

<!-- Install Instructions -->
<div id="install">
## 📥 Install

1. **Chrome Web Store**  
   [Add to Chrome](https://chrome.google.com/webstore/detail/your-extension-id){: .button .button-large}
2. **Load Unpacked**  

   ```bash
   git clone https://github.com/nilla-moige/chrome-extension-linkedIn-job-snatcher
   cd chrome-extension-linkedIn-job-snatcher
   npm install && npm run build
   open chrome://extensions
   enable Developer mode → Load unpacked → select `dist/`
