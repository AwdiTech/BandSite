//Shows page JavaScript


// NOTE: EDIT "- Be sure to create the entire show table using DOM manipulation. 
//        This includes the "dates", "venue", and "location" table headers"
function loadShows(showsArray) {

    const showsList = document.querySelector('.shows-list');

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

        cardDate.textContent = showObject['date'];
        cardVenue.textContent = showObject['venue'];
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

const shows = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tues Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 6 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15, 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];


loadShows(shows);