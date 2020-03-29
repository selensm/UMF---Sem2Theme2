const apiUrl = 'http://nikrus.dreamhosters.com/wp-json/wp/v2/';
const apiKey = 'P7yvPmPx0MVgfurtqB7Caxa2DTgJnbZM';
const homePostId = 23;
const informationPostId = 24;
const performanceId = 22;
const tagArtistId = 21;


getHomePostFromWP();

function getHomePostFromWP() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const homeData = JSON.parse(this.responseText).reverse();
            console.log(homeData)
            renderHomeData(homeData);
        }
    }
    xhttp.open('GET', `${apiUrl}posts?categories=${homePostId}`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();
}

function renderHomeData(homeData) {
    for (i = 0; i < homeData.length; i++) {
        let homeSection = document.createElement('section');
        homeSection.id = i;
        document.querySelector('.home').appendChild(homeSection);
        if (homeData[i].acf.heading === '' && homeData[i].acf.description === '') {
            document.getElementById(homeSection.id).innerHTML = `
        <h1>UNGDOMSRINGENS MUSIKFESTIVAL</h1>
            <video controls>
                <source src="${homeData[i].acf.imagevideo}" type="video/mp4">
            </video>
    `;
        } else {
            document.getElementById(homeSection.id).innerHTML += `
        <article class="home-post">
        <div class="text">
            <h2>${homeData[i].acf.heading}</h2>
            <p>${homeData[i].acf.description}</p>
        </div>
        <div style="background-image: url(${homeData[i].acf.imagevideo});" class="img"></div>
    </article>
        `;
        }
    }
}

