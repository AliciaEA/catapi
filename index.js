const catImg = document.getElementById("cat-img")
const card = document.getElementById('card')
const loader = document.getElementById('loader')
const favList = document.getElementById('fav-list')
const favPanel = document.getElementById('fav-panel')

let currentCatUrl = "";

async function fetchCat() {
    loader.classList.remove('hidden')
    card.classList.remove('swipe-left', 'swipe-right')

    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search")
        const data = await response.json()
        currentCatUrl = data[0].url

        // Data (Cats) Json
        const dataRes =  await fetch('./dataKat.json')
        const localData = await dataRes.json()

        const personalities = localData.personalities
        const randomInfo = personalities[Math.floor(Math.random()* personalities.length)]

        document.getElementById('michi-nombre').textContent = randomInfo.name
document.getElementById('michi-info').textContent = `${randomInfo.job} • ${randomInfo.location}`

        // Cat Images from the API
        const img = new Image()
        img.src = currentCatUrl;
        img.onload = () => {
            catImg.src = currentCatUrl;
            loader.classList.add('hidden')
        }

    } catch (error) {
        console.error("Couldn find kitties: ", error);
        alert("We couldnt contact with Tinder Beauty Kat")
    }
}

function handleSwipe(direction) {
    if (direction === 'left') {
        card.classList.add('swipe-left')

    } else {
        card.classList.add('swipe-right')
        saveToFavorites(currentCatUrl)
    }

    setTimeout(fetchCat, 300)
}

function saveToFavorites(url) {
    let favs = JSON.parse(localStorage.getItem('michiFavs')) || [];
    if (!favs.includes(url)) {
        favs.unshift(url)
        localStorage.setItem('michiFavs', JSON.stringify(favs))
        renderFavorites()
    }
}

function renderFavorites() {
    const favs = JSON.parse(localStorage.getItem('michiFavs')) || [];
    favList.innerHTML = favs.map(url => `
        <div class="h-24 rounded-lg overflow-hidden shadow-sm">
                    <img src="${url}" class="w-full h-full object-cover">
                </div>
                `).join('');
}

function toggleFavorites() {
    favPanel.classList.toggle('hidden')
}

function clearFavorites() {
    localStorage.removeItem('michiFavs')
    renderFavorites();
}

function toggleMobileMenu(){
    const menu = document.getElementById('mobile-menu')
    menu.classList.toggle('hidden')
}

fetchCat();
renderFavorites();

