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

        // Check if an image is selected
        if (image) {
            // Read image file
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = function() {
                const imageDataURL = reader.result;

                // Create new blog object with an ID
                const newBlog = {
                    id: nextBlogId++, // Assign ID and increment counter for next blog
                    title: title,
                    description: description,
                    image: imageDataURL // Store image data URL instead of file object
                };

                // Add new blog to blogs array
                blogs.push(newBlog);

                // Save the blogs array to local storage
                saveBlogsToLocalStorage();

                // Render blogs including the new one
                renderBlogs();

                // Show notification message
                notifyMsg.innerText = 'New blog created successfully!';
                notifyMsg.style.display = 'block';

                // Hide notification message after 3 seconds
                setTimeout(() => {
                    notifyMsg.style.display = 'none';
                }, 3000);
            };
        } else {
            // If no image is selected, show an alert
            alert('Please select an image.');
        }
    });
});

async function renderBlogs() {
    blogContainer.innerHTML = '';
    blogs.forEach((blog, index) => {
        // Create a container for the blog item
        const blogItem = document.createElement('li');
        blogItem.classList.add('blog__item');

        // Create the title element
        const titleElement = document.createElement('div');
        titleElement.classList.add('blog__title');
        titleElement.textContent = blog.title;

        // Create the description element
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('blog__description');
        descriptionElement.textContent = blog.description;

        // Create the image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('blog__image');

        // Create the image element
        const imgElement = document.createElement('img');
        imgElement.src = blog.image; // Set the source to the image data URL
        imgElement.alt = 'Blog Image';
        imgElement.classList.add('blog-image'); // Add a class for styling

        // Append elements to the image container
        imageContainer.appendChild(imgElement);

        // Create the actions container
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('blog__actions');

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBlog(blog.id));

        // Create the update button
        const updateButton = document.createElement('button');
        updateButton.classList.add('update-btn');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => updateBlog(blog.id));

        // Append buttons to the actions container
        actionsContainer.appendChild(deleteButton);
        actionsContainer.appendChild(updateButton);

        // Append elements to the blog item
        blogItem.appendChild(titleElement);
        blogItem.appendChild(imageContainer);
        blogItem.appendChild(descriptionElement);
        blogItem.appendChild(actionsContainer);

        // Append the blog item to the blog container
        blogContainer.appendChild(blogItem);
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

const MAX_BLOGS = 100;

// Function to save the blogs array to local storage, keeping only the latest MAX_BLOGS blogs
function saveBlogsToLocalStorage() {
    const latestBlogs = blogs.slice(-MAX_BLOGS); // Keep only the latest MAX_BLOGS blogs
    localStorage.setItem('blogs', JSON.stringify(latestBlogs));
}
localStorage.clear();
// =============================resizing image input===============================
