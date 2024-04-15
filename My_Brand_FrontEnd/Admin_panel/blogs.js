const form = document.getElementById("newBlogForm");
let blogContainer = document.querySelector(".blog__list");
let blogs = [];
let blogsData = [];
let nextBlogId = 1; 
const createBtn = document.getElementById('createBtn');
const notifyMsg = document.getElementById('notify_msg'); 



window.onload = async function() {
    try {
      const response = await fetch('http://localhost:5000/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsArr = await response.json();

      const blogsData = blogsArr.blogs;
      const blogList = document.querySelector('.blog__list');
      blogList.innerHTML = ''; // Clear previous list items

      blogsData.forEach(blog => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h2 class='blo-title'>${blog.title}</h2>
          <p class='blog-desc'>${blog.description}</p>
          <img src ='https://source.unsplash.com/80x80/'>
        `;
        blogList.appendChild(div);
      });

      console.log(blogsArr);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
};


 

  
  
window.addEventListener("DOMContentLoaded", async () => {
    await renderBlogs(); 

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
                const newBlog = {
                    id: nextBlogId++, // Assign ID and increment counter for next blog
                    title: title,
                    description: description,
                    image: imageDataURL // Store image data URL instead of file object
                };
                blogs.push(newBlog);
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
        const blogItem = document.createElement('li');
        blogItem.classList.add('blog__item');
        const titleElement = document.createElement('div');
        titleElement.classList.add('blog__title');
        titleElement.textContent = blog.title;
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('blog__description');
        descriptionElement.textContent = blog.description;
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('blog__image');
        const imgElement = document.createElement('img');
        imgElement.src = blog.image; 
        imgElement.alt = 'Blog Image';
        imgElement.classList.add('blog-image');
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

function saveBlogsToLocalStorage() {
    const latestBlogs = blogs.slice(-MAX_BLOGS); 
    localStorage.setItem('blogs', JSON.stringify(latestBlogs));
}
localStorage.clear();

