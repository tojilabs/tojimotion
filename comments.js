// Get references to the HTML elements
const commentText = document.getElementById('comment-text');
const submitBtn = document.getElementById('submit-comment');
const commentsList = document.getElementById('comments-list');

// Reference to the comments in the database
const database = firebase.database();
const commentsRef = database.ref('comments');

// Function to add a new comment
function addComment() {
  const comment = commentText.value.trim();
  
  if (comment === '') {
    alert('Please enter a comment');
    return;
  }

  // Create a new comment object
  const newComment = {
    text: comment,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    author: 'Anonymous',
    authorId: 'user_' + Math.random().toString(36).substr(2, 9) // Random user ID
  };

  // Push the comment to the database
  commentsRef.push(newComment)
    .then(() => {
      // Clear the input field
      commentText.value = '';
    })
    .catch((error) => {
      console.error('Error adding comment: ', error);
      alert('Error posting comment. Please try again.');
    });
}

// Function to display comments
function displayComments(snapshot) {
  // Clear the current comments
  commentsList.innerHTML = '';
  
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
    commentElement.style.borderBottom = '1px solid var(--glass-border)';
    commentElement.style.padding = '12px 0';
    commentElement.style.marginBottom = '12px';
    
    // Format the date
    const date = new Date(comment.timestamp);
    const formattedDate = date.toLocaleString();
    
    commentElement.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9em;">
        <strong>${comment.author}</strong>
        <span style="color: var(--muted);">${formattedDate}</span>
      </div>
      <div>${comment.text}</div>
    `;
    
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
