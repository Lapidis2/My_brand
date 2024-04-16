// @ts-nocheck
const form = document.getElementById("newBlogForm");
let blogContainer = document.querySelector(".blog__list");
let blogs = [];
let blogsData = [];
let nextBlogId = 1; 
const createBtn = document.getElementById('createBtn');
const notifyMsg = document.getElementById('notify_msg'); 
const updateBlogForm = document.getElementById("updateBlogForm");
const createNewBlogmodal = document.getElementById("myModal");
const closeCreateNewBlogModel = document.querySelector(".close");
const closeUpdateBlogModel =document.querySelector(".closeUpdateBlogModel")
        
    closeCreateNewBlogModel.addEventListener("click", () => {
                       createNewBlogmodal.style.display = "none";
                                              });
closeUpdateBlogModel.addEventListener("click", () => {
  updateBlogModel.style.display = "none";
});

window.onload = async function() {
    

    try {
      const response = await fetch('http://localhost:5000/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsArr = await response.json();

      const blogsData = blogsArr.blogs;
      const blogList = document.querySelector('.blog__list');
      // @ts-ignore
      blogList.innerHTML = ''; 

      blogsData.forEach((blog) => {
        const div = document.createElement('div');
        
        
        div.innerHTML = `
        <div class="blog"
        
            <div class="blog-content">
            <img src ='${blog.imageUrl}'>
               <p class='blog-desc'>${blog.description}</p>
          <div class="blog-buttons">
          <button class="blog-update-btn" >Update</button>
          <button class="blog-delete-btn" >Delete</button>
           </div>
          </div>
          </div>
        `
        // @ts-ignore
        blogList.appendChild(div);
      });

      
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
};

//create blog

document.getElementById("newBlogForm").addEventListener('submit',  async (event)=>{
    event.preventDefault()
    // @ts-ignore
    let title= document.getElementById("blogtitle").value.trim()
    // @ts-ignore
    const description= document.getElementById("blogdesc").value.trim()
    const image= document.getElementById("blogimage").files[0]
    let formData = new FormData()
    formData.append('title', title);
    formData.append('description', description);
    // @ts-ignore
    formData.append('image', image);
    try { 
      // @ts-ignore
      let token = getToken()
        fetch('http://localhost:5000/blogs', {
            method: 'POST',
            body: formData,
            headers: {
                // @ts-ignore
                'Authorization': `Bearer ${token}`
            // @ts-ignore
            }
        // @ts-ignore
        }).then(response =>{
            if(!response.ok){
                throw Error("Network Error")
            }
            return response.json()
        }).then(data=>{
            console.log(data)
        }).catch(err =>{
            console.log(err)
        })
        

        
// @ts-ignore
}catch(err){
    console.log(err)
}}
)

const getToken = () =>{
    
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    return token
}
getToken()
// update blog


 

  




































































  
// window.addEventListener("DOMContentLoaded", async () => {
//     // @ts-ignore
//     await renderBlogs(); 

//     // @ts-ignore
//     form.addEventListener("submit", async (event) => {
//         event.preventDefault();

        
//         const title = document.getElementById('blogtitle');
//         const description = document.getElementById('blogdesc');
//         const image = document.getElementById('blogimage');

//         if (image) {
          
//             const reader = new FileReader();
//             // @ts-ignore
//             reader.readAsDataURL(image);
//             reader.onload = function() {
//                 const imageDataURL = reader.result;
//                 const newBlog = {
//                     id: nextBlogId++, 
//                     title: title,
//                     description: description,
//                     image: imageDataURL
//                 };
//                 blogs.push(newBlog);
//                 saveBlogsToLocalStorage();

                
//                 // @ts-ignore
//                 renderBlogs();
//                  // @ts-ignore
//                  notifyMsg.innerText = 'New blog created successfully!';
//                 // @ts-ignore
//                 notifyMsg.style.display = 'block';

               
//                 setTimeout(() => {
//                     // @ts-ignore
//                     notifyMsg.style.display = 'none';
//                 }, 3000);
//             };
//         } else {
//             alert('Please select an image.');
//         }
//     });
// });




// // async function renderBlogs() {
// //     blogContainer.innerHTML = '';
// //     blogs.forEach((blog, index) => {
// //         const blogItem = document.createElement('li');
// //         blogItem.classList.add('blog__item');
// //         const titleElement = document.createElement('div');
// //         titleElement.classList.add('blog__title');
// //         titleElement.textContent = blog.title;
// //         const descriptionElement = document.createElement('div');
// //         descriptionElement.classList.add('blog__description');
// //         descriptionElement.textContent = blog.description;
// //         const imageContainer = document.createElement('div');
// //         imageContainer.classList.add('blog__image');
// //         const imgElement = document.createElement('img');
// //         imgElement.src = blog.image; 
// //         imgElement.alt = 'Blog Image';
// //         imgElement.classList.add('blog-image');
// //         imageContainer.appendChild(imgElement);
// //         const actionsContainer = document.createElement('div');
// //         actionsContainer.classList.add('blog__actions');

// //         const deleteButton = document.createElement('button');
// //         deleteButton.classList.add('delete-btn');
// //         deleteButton.textContent = 'Delete';
// //         deleteButton.addEventListener('click', () => deleteBlog(blog.id));

        
// //         const updateButton = document.createElement('button');
// //         updateButton.classList.add('update-btn');
// //         updateButton.textContent = 'Update';
// //         updateButton.addEventListener('click', () => updateBlog(blog.id));

// //         actionsContainer.appendChild(deleteButton);
// //         actionsContainer.appendChild(updateButton);
// //         blogItem.appendChild(titleElement);
// //         blogItem.appendChild(imageContainer);
// //         blogItem.appendChild(descriptionElement);
// //         blogItem.appendChild(actionsContainer);

// //         blogContainer.appendChild(blogItem);
// //     });
// // }
// function deleteBlog(blogId) {
    
//     const index = blogs.findIndex(blog => blog.id === blogId);
//     if (index !== -1) {
    
//         blogs.splice(index, 1);
//         saveBlogsToLocalStorage();
//         // @ts-ignore
//         renderBlogs();
//     }
// }

// function updateBlog(blogId) {
//     const blog = blogs.find(blog => blog.id === blogId);
//     if (blog) {
//         const newTitle = prompt('Enter updated title:', blog.title);
//         const newDescription = prompt('Enter updated description:', blog.description);
//         if (newTitle !== null && newDescription !== null) {
//             blog.title = newTitle;
//             blog.description = newDescription;
    
//             saveBlogsToLocalStorage();
//             // Render blogs after update
//             // @ts-ignore
//             renderBlogs();
//         }
//     }
// }

// // Function to save the blogs array to local storage
// function saveBlogsToLocalStorage() {
//     localStorage.setItem('blogs', JSON.stringify(blogs));
// }

// // Retrieve the blogs from local storage on page load
// // @ts-ignore
// blogs = JSON.parse(localStorage.getItem('blogs')) || [];
// if (blogs.length > 0) {
//     nextBlogId = Math.max(...blogs.map(blog => blog.id)) + 1;
// }

// const MAX_BLOGS = 100;

// function saveBlogsToLocalStorage() {
//     const latestBlogs = blogs.slice(-MAX_BLOGS); 
//     localStorage.setItem('blogs', JSON.stringify(latestBlogs));
// }
// localStorage.clear();

