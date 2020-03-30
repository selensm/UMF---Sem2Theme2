//General information

const apiUrl = 'http://nikrus.dreamhosters.com/wp-json/wp/v2/';
const apiKey = 'P7yvPmPx0MVgfurtqB7Caxa2DTgJnbZM';
const homePostId = 23;
const informationPostId = 24;
const performanceId = 22;
const tagArtistId = 21;
const tagStagesId = 15;



//Home page request
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
//Home page render
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
//Information page request
function getInformationPostFromWP() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const informationData = JSON.parse(this.responseText).reverse();
            console.log(informationData);
            renderInformationData(informationData);
        }
    }
    xhttp.open('GET', `${apiUrl}posts?categories=${informationPostId}`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();
}
//Stages request for Information page
function getStagesFromWP() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const stagesData = JSON.parse(this.responseText).reverse();
            console.log(stagesData);
            renderStagesData(stagesData);
        }
    }
    xhttp.open('GET', `${apiUrl}posts?tags=${tagStagesId}`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();
}
//Information page render
function renderInformationData(informationData) {
    for (i = 0; i < informationData.length; i++) {
        if (informationData[i].acf.heading === 'Stages:') {
            document.querySelector('section').innerHTML += `
             <article id="infoToggle${i}" onclick="toggleInfo(${i})">
             <div class="flex-info">
                 <h5>${informationData[i].acf.heading}</h5>
                 <i class="fas fa-angle-down" for="club" class="info-arrow"></i>
             </div>
             <div class="stages-info">
             <br>
             <p>${informationData[i].acf.information}</p>
             <br>
            
             </div>
         </article>
         `;
        } else {
            document.querySelector('section').innerHTML += `
            <article id="infoToggle${i}" onclick="toggleInfo(${i})">
            <div class="flex-info">
                <h5>${informationData[i].acf.heading}</h5>
                <i class="fas fa-angle-down" for="club" class="info-arrow"></i>
            </div>
            <p>${informationData[i].acf.information}
            </p>
            <hr>
        </article>
        `;
        }

    }
    getStagesFromWP();
}
//Stages render
function renderStagesData(stagesData) {
    let stagesInfo = document.querySelector('.stages-info');
    for (i = 0; i < stagesData.length; i++) {
        let currentStage = stagesData[i].acf;
        stagesInfo.innerHTML += `
        <h6>${currentStage.name}</h6>
        <p>${currentStage.description}</p>
        <br>
        `
    }
}
//Toggle accordion Information page
function toggleInfo(i) {
    document.getElementById('infoToggle' + i).classList.toggle('open');
}

//Artists page request
function getArtistPostFromWP() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const artistData = JSON.parse(this.responseText).reverse();
            console.log(artistData);
            renderArtistData(artistData);
        }
    }
    xhttp.open('GET', `${apiUrl}posts?tags=${tagArtistId}`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();
}
//render Artist cards
function renderArtistData(artistData) {
    let artistGrid = document.querySelector('.grid-artists-large');
    for (i = 0; i < artistData.length; i++) {
        let currentArtist = artistData[i].acf;
        artistGrid.innerHTML += `
        <article onclick="redirectIndividual(${artistData[i].id})">
                <div>
                    <div class="gradient">
                       <div style="background-image:url(${currentArtist.image.url});" class="artist-image"></div> 
                    </div>
                    <h3>${currentArtist.name}</h3>
                </div>
            </article>
        `
    }
}
//redirect to Individual artist page
function redirectIndividual(artistId){
    window.location.href = `individual.html?artistId=${artistId}`;
}
//request for individual artist information
function renderIndividual(){
    var artistId = window.location.search.split('=')[1]
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const artistData = JSON.parse(this.responseText);
            console.log(artistData);
            renderIndividualArtistData(artistData);
        }
    }
    xhttp.open('GET', `${apiUrl}posts/${artistId}`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();

}
//render the individual artist information
function renderIndividualArtistData(artistData){
let artistAcf = artistData.acf;
document.querySelector('main').innerHTML = `
<h1>GET TO KNOW OUR PERFORMANTS</h1>
        <div class="breadcrumbs">
            <a href="artists.html">Artists</a>
            <div>></div>
            <a>${artistAcf.name}</a>
        </div>
        <section class="grid-three-column">
            <article id="individual-performance">
                <div id="individual">
                    <div class="gradient">
                        <div style="background-image:url(${artistData.acf.image.url});" class="artist-image"></div>
                    </div>
                    <h3>${artistAcf.name}</h3>
                </div>
                <div id="performance">
                    <div class="flex">
                        <div class="date">
                            <p>${artistData.acf.date.split('-')[2]}</p>
                            <p>${getMonthString(artistData.acf.date.split('-')[1])}</p>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="time">
                            <p>${artistData.acf.time.split(':')[0]}</p>
                            <p>${artistData.acf.time.split(':')[1]}</p>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <p>${artistData.acf.stage.post_title}</p>
                </div>
            </article>
            <article id="individual-details">
                <div>
                    <span>genre</span>
                    <p>${artistData.acf.genre}</p>
                </div>
                <div>
                    <span>members</span>
                    <p>${artistData.acf.members}</p>
                </div>
                <div>
                    <span>club</span>
                    <p>${artistData.acf.youth_club}</p>
                </div>
                <div>
                    <span>description</span>
                    <p>${artistData.acf.description}</p>
                </div>
            </article>
        </section>
`
}

function getMonthString(dateMonth){
    switch (dateMonth){
    case"01": return "jan";
    case"02": return "feb";
    case"03": return "mar";
    case"04": return "apr";
    case"05": return "may";
    case"06": return "jun";
    case"07": return "jul";
    case"08": return "aug";
    case"09": return "sep";
    case"10": return "oct";
    case"11": return "nov";
    case"12": return "dec";
    }
}