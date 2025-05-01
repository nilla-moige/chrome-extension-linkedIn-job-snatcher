# Chrome Extension: LinkedIn Jobs Snatcher

![LinkedIn Job Snatcher Logo](public/images/logo.png)

## About
LinkedIn Job Snatcher is a chrome extension that eases the process of job applications by providing an easy interface between LinkedIn Jobs pages and ChatGPT. When on a LinkedIn Jobs page, the extensions's popup can be used to synthesize a well-tested ChatGPT prompt, including the page's job description, in one click. This will open ChatGPT in a new tab so users can easily paste their query. Users can also include their existing resume or cover letters for automatic inclusion in the prompt. 

## Authors
Nilla Orina  
Aaron Jiang  
Tommy Li  
Vincent Lin  

## Setup Instructions

- Download the lastest release from the [Releases](https://github.com/nilla-moige/chrome-extension-linkedIn-job-snatcher/releases/)
- Unzip the downloaded ZIP file
- Open Chrome and navigate to `chrome://extensions`
- Enable "Developer mode" using the slider in the top right
- Important: Navigate inside the unzipped folder, and drag and drop the `public` folder into the page. Note that it is the `public` folder and not the root.
- Pin the extension for easy access.
- The extension only works on [LinkedIn Jobs](https://www.linkedin.com/jobs/), so head over there and pick a job to get started.

## Implemented Features

### One Click Job Description to Clipboard Solution
This feature allows the extension to automatically find the location of the job description in the webpage and copies it into your clipboard for easy use. It also opens up ChatGPT in a new tab so a the user has to do is Ctrl-V paste to get context into an LLM.

### Context-Aware and Tested Prompts
Our extension offers the user several context-aware actions and prompts ranging from querying about what skills should a user focus on to fit a job requirement to rewrites of resumes or cover letters. Depending on the prompt, our extension will either include or not include the resume or cover letter context.

### Resume and Cover Letter Input
This feature allows for the user to copy-paste and save their resume or cover letter into the extension for integration with our extension's prompts. These contexts are saved on submit so the user only has to put in their information once.

### Landing Page
The landing page explains the use cases of our extension in a straight-forward way, serving as a guide to new or prospective users. It is linked to our extension through the About page, and contains examples for use cases and features.


## Known Issues

Please report any issues you come across to our [Issues](https://github.com/nilla-moige/chrome-extension-linkedIn-job-snatcher/issues) page. 

As of 4/30, our prompt system is still a work in progress. We also are still in the process of deploying our landing page.

Since our extension does run code on page load, if you have LinkedIn Jobs already open before installing the extension, you may have to refresh in order to get full functionality of the Chrome extension.

Additionally, if you click our prompt buttons before the page is fully loaded, it may be unable to grab the context as it has not loaded in yet, so please be patient in those scenarios and try again.
