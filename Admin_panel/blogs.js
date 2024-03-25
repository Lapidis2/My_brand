const form = document.getElementById("newBlogForm");
let blogContainer = document.querySelector(".blog__list");
let blogs = [];
let nextBlogId = 1; // Initialize ID counter
const createBtn = document.getElementById('createBtn');
const notifyMsg = document.getElementById('notify_msg'); // Add this line to get the notification message element

window.addEventListener("DOMContentLoaded", async () => {
    await renderBlogs(); // Render existing blogs on page load

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get form data
        const title = form.querySelector('input[name="title"]').value;
        const description = form.querySelector('textarea[name="description"]').value;
        const image = form.querySelector('input[name="image"]').files[0];

        // Create new blog object with an ID
        const newBlog = {
            id: nextBlogId++, // Assign ID and increment counter for next blog
            title: title,
            description: description,
            image: image
        };

        // Add new blog to blogs array
        blogs.push(newBlog);

        // Save the blogs array to local storage
        saveBlogsToLocalStorage();

        // Render blogs including the new one
        await renderBlogs();

        // Show notification message
        notifyMsg.innerText = 'New blog created successfully!';
        notifyMsg.style.display = 'block';

        // Hide notification message after 3 seconds
        setTimeout(() => {
            notifyMsg.style.display = 'none';
        }, 3000);
    });
});

async function renderBlogs() {
    blogContainer.innerHTML = '';
    blogs.forEach((blog, index) => {
        blogContainer.innerHTML += `
            <li class="blog__item">
                <div class="blog__title">${blog.title}</div>
                <div class="blog__image">Image: ${blog.image ? blog.image.name : 'No image'}</div>
                <div class="blog__description">${blog.description}</div>
                <div class="blog__actions">
                    <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
                    <button class="update-btn" onclick="updateBlog(${blog.id})">Update</button>
                </div>
            </li>
        `;
    });
}

function deleteBlog(blogId) {
    // Find the index of the blog with the given ID
    const index = blogs.findIndex(blog => blog.id === blogId);
    if (index !== -1) {
        // Remove the blog from the array
        blogs.splice(index, 1);
        // Save the updated blogs array to local storage
        saveBlogsToLocalStorage();
        // Render blogs after deletion
        renderBlogs();
    }
}

function updateBlog(blogId) {
    // Find the blog with the given ID
    const blog = blogs.find(blog => blog.id === blogId);
    if (blog) {
        // Prompt the user to enter updated content (title and description)
        const newTitle = prompt('Enter updated title:', blog.title);
        const newDescription = prompt('Enter updated description:', blog.description);
        if (newTitle !== null && newDescription !== null) {
            // Update the blog with the new content
            blog.title = newTitle;
            blog.description = newDescription;
            // Save the updated blogs array to local storage
            saveBlogsToLocalStorage();
            // Render blogs after update
            renderBlogs();
        }
    }
}

// Function to save the blogs array to local storage
function saveBlogsToLocalStorage() {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Retrieve the blogs from local storage on page load
blogs = JSON.parse(localStorage.getItem('blogs')) || [];
// Update nextBlogId based on the existing blogs
if (blogs.length > 0) {
    nextBlogId = Math.max(...blogs.map(blog => blog.id)) + 1;
}
