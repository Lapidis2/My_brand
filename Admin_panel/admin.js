const postsContainer = document.getElementById("postsContainer");
const addPostBtn = document.getElementById("addPostBtn");
const addPostModal = document.getElementById("addPostModal");
const closeBtn = document.getElementsByClassName("close")[0];
const savePostBtn = document.getElementById("savePostBtn");

// Sample data for initial blog posts
let posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post.",
  },
];

// Function to display blog posts
function displayPosts() {
  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="commentOnPost(${post.id})">Comment</button>
        `;
    postsContainer.appendChild(postDiv);
  });
}

// Function to add a new blog post
function addPost(title, content) {
  const newPost = {
    id: posts.length + 1,
    title: title,
    content: content,
  };
  posts.push(newPost);
  displayPosts();
}

// Function to delete a blog post
function deletePost(id) {
  posts = posts.filter((post) => post.id !== id);
  displayPosts();
}

// Function to edit a blog post
function editPost(id) {
  const post = posts.find((post) => post.id === id);
  const newTitle = prompt("Enter new title:", post.title);
  const newContent = prompt("Enter new content:", post.content);
  if (newTitle !== null && newContent !== null) {
    post.title = newTitle;
    post.content = newContent;
    displayPosts();
  }
}

// Function to handle adding a new post
addPostBtn.addEventListener("click", () => {
  addPostModal.style.display = "block";
});

// Close modal when close button is clicked
closeBtn.onclick = function () {
  addPostModal.style.display = "none";
};

// Close modal when clicked outside the modal
window.onclick = function (event) {
  if (event.target == addPostModal) {
    addPostModal.style.display = "none";
  }
};

// Save post when save button is clicked
savePostBtn.addEventListener("click", () => {
  const postTitle = document.getElementById("postTitle").value;
  const postContent = document.getElementById("postContent").value;
  if (postTitle && postContent) {
    addPost(postTitle, postContent);
    addPostModal.style.display = "none";
  } else {
    alert("Please enter both title and content.");
  }
});

// Initial display of posts
displayPosts();
