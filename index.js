const catImg = document.getElementById("cat-img")
const catImg2 = document.getElementById("cat-img2")

fetch("https://api.thecatapi.com/v1/images/search?limit=2")
    .then(response => response.json())
    .then(data =>{
        catImg.src = data[0].url;
        catImg2.src = data[1].url;
    })
    .catch(e => console.log(e))