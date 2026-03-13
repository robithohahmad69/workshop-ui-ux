
function handleEnter(event){

    if(event.key === "Enter"){

        searchMusic();

    }

}


async function searchMusic(){

    const query = document.getElementById("searchInput").value;

    if(query === ""){

        alert("Masukkan nama lagu");

        return;

    }
// Menggunakan API iTunes Search untuk mencari lagu berdasarkan query
    const url =
    `https://itunes.apple.com/search?term=${query}&entity=song&limit=12`;

    const response = await fetch(url);

    const data = await response.json();

    displayMusic(data.results);

}


function displayMusic(musicList){

    const container =
    document.getElementById("musicContainer");

    container.innerHTML = "";

    musicList.forEach(music => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `

        <img src="${music.artworkUrl100}">

        <h3>${music.trackName}</h3>

        <p><b>Artis:</b> ${music.artistName}</p>

        <p><b>Album:</b> ${music.collectionName}</p>

        <audio controls>
            <source src="${music.previewUrl}">
        </audio>

        `;

        container.appendChild(card);

    });

}