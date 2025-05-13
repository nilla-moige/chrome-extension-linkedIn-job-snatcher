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

    
      // EXAMPLE where I just append both cover letter and resume to the end. Feel free to mix it up!
      // You can use coverLetterText & resumeText and they have the save resume info inside
      fullText += "\n\n" + coverLetterText + "\n\n" + resumeText + "\n\n" + `${promptNum}`;

      console.log("COVER LETTER:")
      console.log(coverLetterText)
      console.log("Resume")
      console.log(resumeText)

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