//Shows page JavaScript
// Includes:
// - function loadShows(showsArray) -- function to load/reload all shows on page
// - function getShows() -- This function makes the GET API call for the show data
// - function getDateString(timestamp) -- This function returns a date string in the format "Day Month DD YYYY"


function loadShows(showsArray) {

    const showsList = document.querySelector('.shows-list');

    // Shows Table Subtitles Row Construction (It's only visible in tablet or higher screen sizes)
    const showsListSubtitlesRow = document.createElement('article');
    const dateSubtitle = document.createElement('p');
    const venueSubtitle = document.createElement('p');
    const locationSubtitle = document.createElement('p');
    const emptyBlock = document.createElement('p');

    showsListSubtitlesRow.classList.add('shows-list__subtitles-row');
    dateSubtitle.classList.add('event-card__subtitle', 'visbile-block');
    venueSubtitle.classList.add('event-card__subtitle', 'visbile-block');
    locationSubtitle.classList.add('event-card__subtitle', 'visbile-block');

    dateSubtitle.textContent = "DATE";
    venueSubtitle.textContent = "VENUE";
    locationSubtitle.textContent = "LOCATION";

    showsListSubtitlesRow.append(dateSubtitle);
    showsListSubtitlesRow.append(venueSubtitle);
    showsListSubtitlesRow.append(locationSubtitle);
    showsListSubtitlesRow.append(emptyBlock);

    showsList.append(showsListSubtitlesRow);

    

    showsArray.forEach((showObject) => {
        const eventCard = document.createElement('article');
        const cardDateSubtitle = document.createElement('p');
        const cardDate = document.createElement('p');
        const cardVenueSubtitle = document.createElement('p');
        const cardVenue = document.createElement('p');
        const cardLocationSubtitle = document.createElement('p');
        const cardLocation = document.createElement('p');
        const cardCTAButton = document.createElement('button')

        eventCard.classList.add('event-card');
        cardDateSubtitle.classList.add('event-card__subtitle');
        cardDate.classList.add('event-card__date');
        cardVenueSubtitle.classList.add('event-card__subtitle');
        cardVenue.classList.add('event-card__venue');
        cardLocationSubtitle.classList.add('event-card__subtitle');
        cardLocation.classList.add('event-card__location');
        cardCTAButton.classList.add('event-card__CTA-button');

        cardDate.textContent = getDateString(showObject['date']);
        cardVenue.textContent = showObject['place'];
        cardLocation.textContent = showObject['location'];

        cardDateSubtitle.textContent = "DATE";
        cardVenueSubtitle.textContent = "VENUE";
        cardLocationSubtitle.textContent = "LOCATION";
        cardCTAButton.textContent = "BUY TICKETS";

        eventCard.appendChild(cardDateSubtitle);
        eventCard.appendChild(cardDate);
        eventCard.appendChild(cardVenueSubtitle);
        eventCard.appendChild(cardVenue);
        eventCard.appendChild(cardLocationSubtitle);
        eventCard.appendChild(cardLocation);
        eventCard.appendChild(cardCTAButton);

        showsList.appendChild(eventCard);

    });

    const eventCardList = document.querySelectorAll('.event-card');

    eventCardList.forEach( (eventCard) => {
        eventCard.addEventListener('click', () => {

            //First remove any event cards with an active class
            eventCardList.forEach( (card) => {
                card.classList.remove('event-card__active');
            });

            eventCard.classList.add('event-card__active');
        });
    });
}


let shows = [];

function getShows() {
    axios.get("https://project-1-api.herokuapp.com/showdates?api_key=7de1682c-6a04-45d4-933e-e386aa8d3102").then( (result) => {
        shows = result.data;
        loadShows(shows);
    })
    .catch( (error) => {
        console.log(error);
    });
    
}


function getDateString(timestamp) {
    let date = new Date(timestamp);

    const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let weekday = daysOfTheWeek[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${weekday} ${month} ${day} ${year}`;
}



getShows();