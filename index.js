const handleCategory = async () => {
    const response = await fetch(' https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadArticle('${category.category_id}')" class="tab tab-active bg-[#FF1F3D] mr-1 text-white font-semibold text-base rounded-lg">${category.category}</a> 
        `
        tabContainer.appendChild(div);
       
    });
    


}
function convertToHoursMinutes(totalSeconds){
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {hours , minutes , seconds}
}
const handleLoadArticle = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
   
    

    const cardContainer = document.getElementById('card-container');
    
    cardContainer.innerText = "";
    if(data.data.length === 0){
        cardContainer.innerHTML = `
        <div class="text-center">
        <img class="mx-auto" src="./Images/Icon.png">
        <p class="text-3xl font-bold mt-4">Oops!! Sorry, There is no<br> content here</p>
        </div>
        `
    }
          
    data.data.forEach((article) => {
        const time = convertToHoursMinutes(article.others.posted_date)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl"> 
        <figure><img src= ${article.thumbnail} /></figure>
        <div class="card-body">
            
           
            <h2 class="absolute bottom-52 right-8 bg-black text-white">${time.hours}hrs ${time.minutes}min ago</h2>
            <div class="flex items-center">
            <img class="w-10 h-10 rounded-full relative inline" src="${article.authors[0].profile_picture}">
            <h2 class="card-title inline ml-2">${article.title}</h2>
            </div>
            <div class="flex">
            <h2>${article.authors[0].profile_name}</h2>
            <img class="w-6 h-6 ml-2" src="./images/tik.png">
            </div>
            <h2>${article.others.views}</h2>
            
        </div> 
        </div>
        `
      
        cardContainer.appendChild(div);
        
    })
   
}
const handleSort = async (category) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
   
    const data = await response.json();  
    console.log(data);
    let viewsArray = [];
    data.data.forEach((item) => {
        let views = item.others.views;
        let viewsInt = parseFloat(views);
        viewsArray.push(viewsInt);
        
    })
    viewsArray.sort();
}


const handleBlog = () => {
    window.location.href = 'blog.html';
}

handleCategory();
handleLoadArticle('1000');



