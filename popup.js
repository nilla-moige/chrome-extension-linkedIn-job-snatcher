document.addEventListener('DOMContentLoaded', () => {
    // Check the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTabUrl = tabs[0].url;

        // Check if the current tab is a LinkedIn job page
        if (currentTabUrl && currentTabUrl.includes("linkedin.com/jobs")) {
            // The page is a LinkedIn job page — allow the popup to function as expected
            console.log('LinkedIn job page detected!');
        } else {
            // The page is not a LinkedIn job page — show a message or disable functionality
            document.body.innerHTML = "  <div class=\"logo\"><span>LinkedIn</span> <span>Job Snatcher</span></div><h3>This extension works only on LinkedIn job pages.</h3>";
        }
    });
});
  
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



const coverLetterInput = document.getElementById('coverLetterInput');
const resumeInput = document.getElementById('resumeInput');
const toggleBtn1 = document.getElementById('toggleBtn1');
const toggleBtn2 = document.getElementById('toggleBtn2');

let isSubmitted1 = false;
let isSubmitted2 = false;
  
// Async function to load inputs properly
async function initPopup() {
    const result = await new Promise((resolve) => {
        chrome.storage.local.get(['coverLetterInput', 'resumeInput'], (data) => {
            resolve(data);
        });
    });

    coverLetterInput.value = result.coverLetterInput || '';
    resumeInput.value = result.resumeInput || '';

    // Now it's safe to check after loading
    if (coverLetterInput.value !== '') {
        coverLetterInput.classList.add('hidden');
        toggleBtn1.textContent = 'Edit';
        isSubmitted1 = true;
    }

    if (resumeInput.value !== '') {
        resumeInput.classList.add('hidden');
        toggleBtn2.textContent = 'Edit';
        isSubmitted2 = true;
    }
}

// Load values on popup open
initPopup();

toggleBtn1.addEventListener('click', () => {
  if (!isSubmitted1) {
    // Hide inputs and send data to local storage
    coverLetterInput.classList.add('hidden');
    toggleBtn1.textContent = 'Edit';
    isSubmitted1 = true;

    const val1 = coverLetterInput.value;
    chrome.storage.local.set({coverLetterInput: val1});
  } else {
    // Show inputs again
    coverLetterInput.classList.remove('hidden');
    toggleBtn1.textContent = 'Submit';
    isSubmitted1 = false;
  }
});

toggleBtn2.addEventListener('click', () => {
    if (!isSubmitted2) {
      // Hide inputs and send data to local storage
      resumeInput.classList.add('hidden');
      toggleBtn2.textContent = 'Edit';
      isSubmitted2 = true;
  
      const val2 = resumeInput.value;
      chrome.storage.local.set({resumeInput: val2});
    } else {
      // Show inputs again
      resumeInput.classList.remove('hidden');
      toggleBtn2.textContent = 'Submit';
      isSubmitted2 = false;
    }
  });

  const prompt1Button = document.getElementById('prompt1')
  const prompt2Button = document.getElementById('prompt2')
  const prompt3Button = document.getElementById('prompt3')
  const prompt4Button = document.getElementById('prompt4')
  const prompt5Button = document.getElementById('prompt5')


  function copyToClipboard(response) {
    console.log("Content script responded: ", response);
    if (response && response.jobDescription) {
        navigator.clipboard.writeText(response.jobDescription)
          .then(() => {
            console.log("Copied to clipboard!");
            showNotification('Job description copied to clipboard!');
            window.open('https://chat.openai.com/', '_blank');})
          .catch(err => {
            console.error("Failed to copy:", err)
            showNotification('Failed to copy job description. Please try again.', true);
          });
    }
  }

  // Gets current tab
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];
    console.log("Current Tab ID:", tab.id);

    prompt1Button.addEventListener('click', () => {
        chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription', promptNum: 1 }, (response) => copyToClipboard(response));
    });

    prompt2Button.addEventListener('click', () => {
        chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription', promptNum: 2 }, (response) => copyToClipboard(response));
    });

    prompt3Button.addEventListener('click', () => {
        chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription', promptNum: 3 }, (response) => copyToClipboard(response));
    });

    prompt4Button.addEventListener('click', () => {
        chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription', promptNum: 4 }, (response) => copyToClipboard(response));
    });

    prompt5Button.addEventListener('click', () => {
        chrome.tabs.sendMessage(tab.id, { action: 'extractJobDescription', promptNum: 5 }, (response) => copyToClipboard(response));
    });
  });

