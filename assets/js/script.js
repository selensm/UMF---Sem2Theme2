//General information

var performances;
var stagesLineUp;

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
        if (homeData[i].acf.imagevideo.split('.')[2] === 'mp4') {
            document.getElementById(homeSection.id).innerHTML = `
    
            <article class="home-post">
                <div class="text">
                    <h2>${homeData[i].acf.heading}</h2>
                    <p>${homeData[i].acf.description}</p>
                 </div>
             <video controls> 
             <source src="${homeData[i].acf.imagevideo});" type="video/mp4">
             </video>
            </article>`;
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
        xhttp.open('GET', `${apiUrl}posts?tags=${tagArtistId}&per_page=100`, true);
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
    function redirectIndividual(artistId) {
        window.location.href = `individual.html?artistId=${artistId}`;
    }
    //request for individual artist information
    function renderIndividual() {
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
    function renderIndividualArtistData(artistData) {
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

    function getMonthString(dateMonth) {
        switch (dateMonth) {
            case "01":
                return "jan";
            case "02":
                return "feb";
            case "03":
                return "mar";
            case "04":
                return "apr";
            case "05":
                return "may";
            case "06":
                return "jun";
            case "07":
                return "jul";
            case "08":
                return "aug";
            case "09":
                return "sep";
            case "10":
                return "oct";
            case "11":
                return "nov";
            case "12":
                return "dec";
        }
    }

    //request stages for line up
    function getStagesForLineUpFromWP() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                stagesLineUp = JSON.parse(this.responseText).reverse();
                console.log(stagesLineUp);
                renderStagesLineUp();
            }
        }
        xhttp.open('GET', `${apiUrl}posts?tags=${tagStagesId}`, true);
        xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
        xhttp.send();
    }
    //render stages for line up
    function renderStagesLineUp() {
        let stagesLineUpOutPut = document.querySelector('#stagesLineUp');
        for (i = 0; i < stagesLineUp.length; i++) {
            stagesLineUpOutPut.innerHTML += `
        <article data-stagename="${stagesLineUp[i].acf.name}">
        <h4>${stagesLineUp[i].acf.name}</h4>
        <hr>

        </article>
    `
        }
        getLineUpArtist();
    }
    //request artists for line up
    function getLineUpArtist() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                performances = JSON.parse(this.responseText).reverse();
                console.log(performances);
                renderPerformances("2020-01-17");
            }
        }
        xhttp.open('GET', `${apiUrl}posts?categories=${performanceId}&per_page=100`, true);
        xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
        xhttp.send();
    }
    //render artists for line up
    function renderPerformances(date) {
        let stageElements = document.querySelectorAll('article');
        for (i = 0; i < performances.length; i++) {
            if (date === performances[i].acf.date) {
                for (j = 0; j < stageElements.length; j++) {
                    if (stageElements[j].getAttribute('data-stagename') === performances[i].acf.stage.post_title) {
                        stageElements[j].innerHTML += `
                <div class="flexbox">
                    <h5>${performances[i].acf.time.substring(0, 5)}</h5>
                    <h6>${performances[i].acf.artist.post_title}</h6>
                </div>
            `
                        break;
                    }
                }
            }
        }
    }

    let dateSelectorElm = document.querySelector('#dateSelector');
    if (dateSelectorElm) {
        let options = dateSelectorElm.querySelectorAll('input');

        for (i = 0; i < options.length; i++) {
            options[i].addEventListener('change', function () {
                if (options[0].nextElementSibling.className.indexOf('selected') !== -1) {
                    options[0].nextElementSibling.classList.remove('selected');
                    options[1].nextElementSibling.classList.add('selected');
                } else {
                    options[1].nextElementSibling.classList.remove('selected');
                    options[0].nextElementSibling.classList.add('selected');
                }
                clearPerformances();
                renderPerformances(this.value)
            });
        }
    }

    function clearPerformances() {
        document.querySelectorAll('article').forEach(article => {
            article.querySelectorAll('div').forEach(div => {
                div.remove();
            })
        })

    }

    let Close = document.getElementById('close')
    let Nav = document.getElementById('mobileNav')

    document.getElementById('menu').addEventListener('click', function () {
        Nav.classList.remove('hide');
    });

    document.getElementById('close').addEventListener('click', function () {
        Nav.classList.add('hide');
    });

    let MobileFilters = document.getElementById('filters')
    if (MobileFilters) {
        document.getElementById('mobileFilters').addEventListener('click', function () {
            MobileFilters.classList.toggle('hide');
        });
        let ArrowRotate = document.getElementById('orangeArrow')

        document.getElementById('mobileFilters').addEventListener('click', function () {
            ArrowRotate.classList.toggle('rotated');
        });
    }
