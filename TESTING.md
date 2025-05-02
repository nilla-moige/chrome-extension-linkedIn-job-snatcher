## Overview

This file outlines the testing strategy for the **LinkedIn Job Snatcher** Chrome extension. The extension provides an interface on LinkedIn job pages to generate personalized job application prompts with ChatGPT. All testing was performed manually to validate user interface behavior and prompt reliability under various inputs.

---

## 1. Interface Testing

### Testing Approach

Interface testing was conducted through manual walkthroughs in a Chrome browser. Each user interaction, from visiting pages, entering resume/cover letter text, to clicking prompt buttons, was tested on a variety of pages to ensure consistent and expected behavior. Focus was placed on validating:
- Correct rendering on LinkedIn vs. non-LinkedIn pages
- State handling for input fields and chrome.storage.local
- Clipboard copy functionality
- Integration with ChatGPT (opening a new tab)

### Test Case 1: Opening the extension on a non-LinkedIn job page

- **Steps**:  
  1. Navigate to a page such as `https://www.google.com` or `https://www.github.com`.  
  2. Click the Chrome extension icon to open the popup.  
- **Expected Output**:  
  - The extension should detect that it’s not on a LinkedIn job page.  
  - The UI should only show the extension logo and a message saying:  
    `"This extension works only on LinkedIn job pages."`  
  - No inputs, buttons, or additional UI elements should be visible.  
- **Observed Behavior**:  
  - Matches expected behavior. The interface remains minimal and informative.  

### Test Case 2: Opening the extension on a LinkedIn job page

- **Steps**:  
  1. Navigate to a job post on LinkedIn, e.g., `https://www.linkedin.com/jobs/view/123456789/`.  
  2. Open the extension popup.  
- **Expected Output**:  
  - The UI should render two labeled input areas: one for the resume and one for the cover letter.  
  - Each input should have an associated "Submit" button.  
  - Below the inputs, five distinct prompt buttons should appear. Each generates a different style of job application prompt.  
- **Observed Behavior**:  
  - All UI components rendered correctly. Inputs are editable, copy-pasting of resumes or cover letters is possible.

### Test Case 3: Submitting and editing resume and cover letter

- **Steps**:  
  1. Copy paste my resume into the resume field.
  2. Click the “Submit” button.  
  3. The field should disappear and the button label should change to “Edit.”  
  4. Click “Edit” to make the input field reappear.  
  5. Refresh the page and reopen the extension.  
- **Expected Output**:  
  - The resume input is hidden after submission.  
  - The resume content is saved to `chrome.storage.local` and restored on refresh.  
  - "Edit" re-enables the input field for further changes.  
- **Observed Behavior**:  
  - Functionality worked as intended, chrome.storage.local correctly preserved inputs.
  - UI correctly changes to hide the input after submission.
  - Clicking the "Edit" button allows the editing of the submitted text.
  - After refreshing the page, since there is content in the resume box, the input is hidden and the button says "Edit", on edit press, we can see that the resume submitted previously is still in the resume input box.

### Test Case 4: Clicking a prompt button

- **Steps**:  
  1. Enter some resume and cover letter text.  
  2. Click one of the five available prompt buttons.  
  3. The prompt should be assembled using the job description from the page, and the saved resume/cover letter.  
  4. ChatGPT should open in a new tab.  
  5. The assembled prompt should be copied to the clipboard.  
- **Expected Output**:  
  - ChatGPT is launched in a new tab.  
  - Prompt is copied to clipboard (confirmed via paste).  
  - Prompt includes: job description, resume, and/or cover letter depending on context.  
- **Observed Behavior**:  
  - All prompt buttons function correctly. Clipboard content is accurate and format is readable.

---

## 2. Prompt Testing

### Testing Approach

Prompt testing was performed manually by pasting prompts into ChatGPT (GPT-4o) and observing the quality and relevance of the AI's output. The tests aimed to cover:
- Varying job types (technical, creative)
- Inclusion/exclusion of resume/cover letter inputs
- Clarity and specificity of the generated prompts
- Adaptability of ChatGPT to user-provided documents

### Model Used

- **Model**: OpenAI ChatGPT (GPT-4o via chat.openai.com)

---

### Test Case 1: Consult ChatGPT for the most needed skills for a specifc job without resume or cover letter input

- **Context**:  
  The user is browsing a Frontend Developer job listing. They have not uploaded a resume or existing cover letter.  
- **Steps**:  
  1. Navigate to a Frontend Developer job on LinkedIn (We used https://www.linkedin.com/jobs/search/?currentJobId=4210032320).
  2. Leave the resume and cover letter fields empty.  
  3. Click the prompt button labeled “Analyze Most Needed Skills”.  
  4. Paste the copied prompt into ChatGPT.  
- **Prompt Generated**:  
```
Find the most crucial skills for the following Frontend Developer role:
========
Job description: [LinkedIn job description text]
```
- **Expected ChatGPT Response**:  
A manual comb of the listing brings up the following skills: JS, HTML, CSS, Agile-driven development, React, Angular, EC2, S3, DynamoDB, JQuery, Horizonte, AUI, Machine Learning
- **Actual Output**:  
ChatGPT provided a well-structured list including all the expected skills and additional hard and soft skills. It mentioned:  
JavaScript, HTML, CSS, React, Angular, jQuery, Horizonte, AUI, TypeScript, Node.js, Object-Oriented Design, Data Structures, Algorithm Design, Problem Solving, Complexity Analysis, Front-End Development, Web Development, Mobile Development, User Interface, Amazon Scale Systems, Big Data, Analytics, EC2, S3, DynamoDB, Personalization, Machine Learning, Agile, Customer Obsession, Bias for Action, Data-Driven, Pet Profiles, Recurring Purchases, Search Personalization, Expert Advice, Dynamic Front-End, Reusable Components  

---

### Test Case 2: Generate a tailored cover letter using a pre-existing resume

- **Context**:  
The user has entered a detailed resume and a cover letter for another position. They want the AI to combine these inputs with a job description for a Game Engine role.  
- **Steps**:  
1. Fill in the resume input with a paragraph describing experience Technical Art and Tool Development (I used my resume, viewable [here](https://aaron-jiang.com/Aaron%20Jiang%20Resume.pdf)).  
2. Paste a cover letter written for a Tech Art job.  
  The following cover letter was used: 
  ```
Dear Epic Games Hiring Manager,
I'm delighted to share my resume for the Technical Art position for the Unreal Editor for Fortnight. I have been impressed by the success of Fortnight Experiences as a new medium for artists and content creators. I have a strong interest in the 3D workflows and pipelines, and I believe my experience makes me an ideal candidate.
I've been involved in 3D content creation for 8 years now, and produced work that involved all parts of the pipeline, including modeling, sculpting, texturing, rigging, animation, vfx, and rendering. This experience has given me an inside look on common bottlenecks and difficulties of 3D workflows in Maya, Blender, ZBrush, and Houdini. I believe this experience will be critical for success in validating new workflows and tools for UEFN.
When I find bottlenecks, I take initiative to create tools to fix these difficulties. During my "Computer Animation" course at the University of Pennsylvania as part of the Digital Media Design program, I found I had difficulties animating a pen contact juggling animation as the rotational pivot point was not constant. This motivated me to develop a Blender add-on that allowed for the translation of pivot points during animation. I believe this experience will be essential for implementing new workflows and tools for UEFN.
You can see more examples of my art and tool programming experience at https://aaron-jiang.com. Thank you for taking the time to consider this application and I look forward to hearing from you in the near future.
Sincerely,
Aaron Jiang
```
4. Visit a LinkedIn posting for a Game Engine SWE Job (We used https://www.linkedin.com/jobs/game-engine-developer-jobs/?currentJobId=4203405329).  
5. Click the prompt button labeled “Refine My Cover Letter”.  
6. Paste the resulting prompt into ChatGPT.  
- **Prompt Generated**:
```
Using the provided resume and previous cover letter, generate a tailored cover letter for the following job description. Ensure the letter:

1. Highlights key qualifications and experiences from the resume that align with the new job.
2. Retains the tone and style of the previous cover letter but adjusts for the new role and company.
3. Addresses the specific responsibilities and qualifications mentioned in the job description.
4. Explains why the user is interested in this new position and how it fits with their career goals.
5. Emphasizes any unique strengths or experiences that make the user a strong candidate for the role.
6. Has a confident and professional tone, with a polite sign-off encouraging further conversation.

========
Job description: [insert of the job description]
========
Resume: [insert of the resume]
========
Cover Letter: [insert of the cover letter]
```
- **Expected ChatGPT Response**:  
The generated cover letter should be tailored to the job description while only relying on the achievements and job history mentioned in the provided resume and cover letter. It should not make up material but rather reword or highlight skills more relavent to the job

- **Actual Output**:  
```
Dear Tempest Droneworx Hiring Team,

I’m writing to express my strong interest in the Unity Developer position at Tempest Droneworx. Your mission to harness cutting-edge technology in service of defense and environmental safety deeply resonates with me. As a graduate student in Computer Graphics and Game Technology at the University of Pennsylvania—and a lifelong builder with a passion for efficiency and real-time systems—I’m eager to bring my Unity expertise and creative problem-solving mindset to your team.

My experience spans real-time 3D applications, VR development, and performance optimization. At Xavatar, I created a full-body "budget motion-capture" pipeline using Oculus Quest tracking data, integrating Blender, Unreal, and WebXR. I also developed a VR web app in Wonderland Engine with a performant virtual UI and animation export system—showcasing my ability to build end-to-end pipelines that are intuitive, fast, and robust. I’ve written Blender Python tools to handle complex rigging transformations and am confident debugging and optimizing C# and Unity systems under pressure.

I’m especially drawn to your integration of Unity with robotics and real-time intelligence systems. My coursework and side projects—like VR Paint, a GPU-accelerated virtual texture painting tool, and Mini-Minecraft, a multithreaded voxel engine in C++ and OpenGL—have given me a deep appreciation for scalable architecture and efficient data processing. I’m excited by the challenge of pushing Unity beyond games and into high-stakes, real-world applications.

What sets me apart is my drive to streamline workflows and improve the tools I use. Whether it’s writing custom Blender add-ons or optimizing runtime systems for low-latency environments, I consistently seek smarter ways to work. Tempest Droneworx’s fast-paced, mission-driven environment aligns perfectly with my goals: to contribute to meaningful, high-impact systems where every line of code matters.

Thank you for considering my application. I would welcome the opportunity to discuss how I can contribute to your vision at Tempest Droneworx. I’m eager to help push the boundaries of defense technology with a team that values innovation, resilience, and precision.

Sincerely,
Aaron Jiang
```

The revised cover letter successfully fulfills the prompt’s objectives by clearly aligning the candidate’s qualifications with Tempest Droneworx’s mission and technical requirements, while retaining the tone and structure of the original Epic Games letter. Compared to the original, which focused on creative tool development for artists in UEFN, the new version emphasizes real-time performance, Unity expertise, and problem-solving under pressure—core to the drone defense role. Specific examples like the motion-capture pipeline and VR Paint project replace earlier anecdotes about Blender add-ons, showcasing the candidate’s technical adaptability in mission-critical contexts. Overall, the rewriter prompt effectively guided a context-aware, role-specific transformation while preserving voice and polish.
