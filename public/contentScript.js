// contentScript.js
let coverLetterText = "";
let resumeText = "";

function loadInputs() {
  chrome.storage.local.get(['coverLetterInput', 'resumeInput'], (result) => {
      coverLetterText = result.coverLetterInput || '';
      resumeText = result.resumeInput || '';
  });
  }

loadInputs();

// This function will be called when the extension button is clicked
async function extractJobDescription(promptNum) {
    try {
      // Get the job title
      const jobTitleElement = document.querySelector('.job-details-jobs-unified-top-card__job-title a');
      const jobTitle = jobTitleElement ? jobTitleElement.textContent.trim() : 'Job Title Not Found';
      
      // Get the company name
      const companyElement = document.querySelector('.job-details-jobs-unified-top-card__company-name a');
      const company = companyElement ? companyElement.textContent.trim() : 'Company Not Found';
      
      // Get the job description
      const jobDescriptionElement = document.querySelector('#job-details');
      let jobDescription = '';
      
      if (jobDescriptionElement) {
        // Extract all text from the job description, preserving some structure
        const sections = jobDescriptionElement.textContent.trim();
        jobDescription = sections.replace(/\n/g, '\n\n');
        
      } else {
        jobDescription = 'Job description not found. Please make sure you are on a LinkedIn job posting page.';
      }
      
      // Format the full text to copy
      let fullText = `Job Title: ${jobTitle}\nCompany: ${company}\n\nJob Description:\n${jobDescription}`;
      
      const result = await new Promise((resolve) => {
          chrome.storage.local.get(['coverLetterInput', 'resumeInput'], (result) => {
              resolve(result);
          });
      });


      coverLetterText = result.coverLetterInput || '';
      resumeText = result.resumeInput || '';

    
      switch(promptNum) {
        case 1:
          let prompt1 = "I want to tailor my resume to a specific job listing. Below is the job description and my current resume. Based on this, identify the most important skills, keywords, and accomplishments I should emphasize to make my resume a strong fit. Suggest edits to specific bullet points where appropriate, recommend additions if something important is missing, and ensure the tone and phrasing match industry expectations. Keep the output in resume format with clear bullet points and use concise, impactful language."
          fullText = `${prompt1}\n\nJob Title: ${jobTitle}\n\nCompany: ${company}\n\n\nJob Description:\n\n=======\n${jobDescription}\n\n\nCurrent Resume:\n\n=======\n${resumeText}`;
          break;
        case 2:
          let prompt2 = "Help me write a customized, compelling cover letter tailored to the job below. I’ve also included my resume so you can draw relevant experience and accomplishments from it. I've also included a previous cover letter you can use to reference my style of writing. The cover letter should highlight how my background aligns with the job responsibilities and qualifications, convey enthusiasm for the role, and remain professional but personable. It should be 3–4 concise paragraphs and clearly reflect why I’m a good fit."
          fullText = `${prompt2}\n\nJob Title: ${jobTitle}\n\nCompany: ${company}\n\n\nJob Description:\n\n=======\n${jobDescription}\n\n\nCurrent Resume:\n\n=======\n${resumeText}\n\nPrevious Cover Letter:\n=======\n${coverLetterText}`;   
          break;
        case 3:
          let prompt3 = "Help me prepare for an interview based on the job description below. Please identify:\nThe 5 most likely behavioral questions I’ll be asked based on the role.\nThe 3–5 most likely technical or role-specific questions.\nSample strong answers I could give based on the resume provided.\nKey themes or experiences I should emphasize.\nMake the advice practical and directly tied to the language and expectations in the job description. Use insights from my resume to tailor responses accordingly."     
          fullText = `${prompt3}\n\nJob Title: ${jobTitle}\n\nCompany: ${company}\n\n\nJob Description:\n\n=======\n${jobDescription}\n\n\nCurrent Resume:\n\n=======\n${resumeText}`;        
          break
        case 4:
          let prompt4 = "Using the job description and my resume, write a concise LinkedIn message I can send to the recruiter or hiring manager to express interest in the position. It should:\nBe professional but friendly\nMention 1–2 specific aspects of the job that excite me\nHighlight one key qualification or relevant experience from my resume\nEnd with a polite, open-ended invitation to connect or discuss further\nLimit to 100–150 words. Avoid sounding overly formal or robotic."
          fullText = `${prompt4}\n\nJob Title: ${jobTitle}\n\nCompany: ${company}\n\n\nJob Description:\n\n=======\n${jobDescription}\n\n\nCurrent Resume:\n\n=======\n${resumeText}`;
          break;
        case 5:
          let prompt5 = "Help me assess how well I match the job below based on my resume. Please:\nIdentify where I’m a strong match (skills, experience, keywords)\nPoint out any key gaps or qualifications I’m missing\nSuggest how I could frame my current experience to bridge those gaps\nAdvise if it’s worth applying, and if so, how to best position myself\nBe honest but constructive, and use clear examples from both the resume and job post to back up your points."
          fullText = `${prompt5}\n\nJob Title: ${jobTitle}\n\nCompany: ${company}\n\n\nJob Description:\n\n=======\n${jobDescription}\n\n\nCurrent Resume:\n\n=======\n${resumeText}`;
          break;
        }

      return fullText;

        
    } catch (error) {
      console.error('Error extracting job description:', error);
      showNotification('Error extracting job description. Please try again.', true);
    }
  }
  
  // Function to show a temporary notification
  function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
    notification.style.color = 'white';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }
  

  // Listen for messages from the extension popup or background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractJobDescription") {
      (async () => {
        let promptNum = message.promptNum || 1;
        const textToCopy = await extractJobDescription(promptNum);
        sendResponse({ jobDescription: textToCopy });
      })();
      return true; // Tell Chrome we will respond asynchronously
    }
  });
  
  // debug: Log that the content script has loaded
  console.log("LinkedIn Job Snatcher content script loaded");