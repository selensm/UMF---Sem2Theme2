const apiUrl = 'http://nikrus.dreamhosters.com/wp-json/wp/v2/';
const apiKey = 'P7yvPmPx0MVgfurtqB7Caxa2DTgJnbZM';
const homePostId = 23;
const informationPostId = 24;
const performanceId = 22;
const tagArtistId = 21;
const tagStagesId = 15;




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

getInformationPostFromWP();

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

function toggleInfo(i) {
    document.getElementById('infoToggle' + i).classList.toggle('open');
}