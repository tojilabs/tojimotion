// Get references to the HTML elements
const commentText = document.getElementById('comment-text');
const submitBtn = document.getElementById('submit-comment');
const commentsList = document.getElementById('comments-list');

// Reference to the comments in the database
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
submitBtn.addEventListener('click', addComment);

// Listen for new comments
commentsRef.on('value', displayComments, (error) => {
  console.error('Error reading comments: ', error);
});

// Allow submitting with Enter key
commentText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addComment();
  }
});
