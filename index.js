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
    console.log(data)


}
const handleLoadArticle = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerText = "";
    
    data.data.forEach((article) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl"> 
        <figure><img src= ${article.thumbnail} /></figure>
        <div class="card-body">
            <img class="w-10 h-10 rounded-full" src="${article.authors[0].profile_picture}">
            <h2 class="card-title">${article.title}</h2>
            <h2>${article.authors[0].profile_name}</h2>
            <h2>${article.others.views}</h2>
        </div> 
        </div>
        `
       
        cardContainer.appendChild(div);
        console.log(data.data);
    })
}
handleCategory();
handleLoadArticle('1000');