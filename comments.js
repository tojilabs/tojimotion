// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the HTML elements
  const commentText = document.getElementById('comment-text');
  const submitBtn = document.getElementById('submit-comment');
  const commentsList = document.getElementById('comments-list');

  // Check if Firebase is loaded and elements exist
  if (typeof firebase === 'undefined' || !commentText || !submitBtn || !commentsList) {
    console.warn('Firebase or required elements not found. Comments functionality disabled.');
    return;
  }

  try {
    // Helper: validate config so we don't initialize with placeholders
    function isValidFirebaseConfig(cfg) {
      if (!cfg) return false;
      const values = [
        cfg.apiKey,
        cfg.authDomain,
        cfg.databaseURL,
        cfg.projectId,
        cfg.storageBucket,
        cfg.messagingSenderId,
        cfg.appId
      ];
      return values.every(v => typeof v === 'string' && v.trim() !== '' && !v.startsWith('YOUR_'));
    }

    // Initialize Firebase if not already initialized and config is valid
    if (!firebase.apps.length) {
      // Your Firebase configuration
      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      };

      if (isValidFirebaseConfig(firebaseConfig)) {
        firebase.initializeApp(firebaseConfig);
      } else {
        console.warn('Comments disabled: Firebase config not set.');
        return; // Exit early to avoid attaching listeners
      }
    }

    // Reference to the comments in the database
    if (!firebase.apps.length) {
      console.warn('Comments disabled: Firebase not initialized.');
      return;
    }
    const database = firebase.database();
    const commentsRef = database.ref('comments');

    // Function to format date to relative time (e.g., "2 minutes ago")
    function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  return 'just now';
}

    // Function to add a new comment
    function addComment() {
  const comment = commentText.value.trim();
  
  if (comment === '') {
    alert('Please enter a comment');
    return;
  }

  // Disable the button to prevent multiple submissions
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Posting...';

  // Create a new comment object
  const newComment = {
    text: comment,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    author: 'Anonymous', // Always set author as Anonymous
    authorInitial: 'A' // Single initial for the avatar
  };

  // Push the comment to the database
  commentsRef.push(newComment)
    .then(() => {
      // Clear the input field
      commentText.value = '';
      commentText.style.height = 'auto'; // Reset textarea height
    })
    .catch((error) => {
      console.error('Error adding comment: ', error);
      alert('Error posting comment. Please try again.');
    })
    .finally(() => {
      // Re-enable the button
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        Post Comment
      `;
    });
}

    // Function to display comments
    function displayComments(snapshot) {
  // Clear the current comments
  commentsList.innerHTML = snapshot.numChildren() === 0 ? 
    '<div style="text-align: center; color: var(--muted); padding: 20px 0;">No comments yet. Be the first to comment!</div>' : '';
  
  // Create an array to store comments
  const comments = [];
  
  // Loop through each comment and add to array
  snapshot.forEach((childSnapshot) => {
    const comment = childSnapshot.val();
    comment.id = childSnapshot.key;
    comments.push(comment);
  });
  
  // Sort comments by timestamp (newest first)
  comments.sort((a, b) => b.timestamp - a.timestamp);
  
  // Display each comment
  comments.forEach((comment) => {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.style.display = 'flex';
    commentElement.style.gap = '12px';
    commentElement.style.padding = '16px 0';
    commentElement.style.borderBottom = '1px solid var(--glass-border)';
    
    // Create avatar
    const avatar = document.createElement('div');
    avatar.style.width = '40px';
    avatar.style.height = '40px';
    avatar.style.borderRadius = '50%';
    avatar.style.background = 'var(--brand)';
    avatar.style.display = 'flex';
    avatar.style.alignItems = 'center';
    avatar.style.justifyContent = 'center';
    avatar.style.color = 'white';
    avatar.style.fontWeight = 'bold';
    avatar.style.flexShrink = '0';
    avatar.textContent = comment.authorInitial || 'A';
    
    // Create content container
    const content = document.createElement('div');
    content.style.flex = '1';
    content.style.minWidth = '0'; // Prevent overflow
    
    // Create header with author and time
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '6px';
    header.style.fontSize = '0.9em';
    
    const author = document.createElement('strong');
    author.textContent = 'Anonymous';
    
    const time = document.createElement('span');
    time.style.color = 'var(--muted)';
    time.textContent = formatTimeAgo(comment.timestamp);
    
    header.appendChild(author);
    header.appendChild(time);
    
    // Create comment text
    const text = document.createElement('div');
    text.style.whiteSpace = 'pre-wrap';
    text.style.wordBreak = 'break-word';
    text.textContent = comment.text;
    
    // Assemble the comment
    content.appendChild(header);
    content.appendChild(text);
    
    commentElement.appendChild(avatar);
    commentElement.appendChild(content);
    
    commentsList.appendChild(commentElement);
  });
}

    // Event listeners
    if (submitBtn) {
      submitBtn.addEventListener('click', addComment);
    }

    // Listen for new comments
    if (commentsRef) {
      commentsRef.on('value', displayComments);
    }

    // Handle Enter key in the comment textarea
    if (commentText) {
      commentText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          addComment();
        }
      });
    }
  } catch (error) {
    console.error('Error initializing comments:', error);
  }
});
