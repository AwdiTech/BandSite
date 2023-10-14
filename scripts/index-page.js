//Index page Javascript
// Includes:
//  - function reloadCommentsWith(commentObjectArray) -- function to load/reload all comments on page
//  - function displayComment(commentObject) -- function to display a new comment from user
//  - function getCurrentDate() -- returns the date in "DD/MM/YYYY format"
//  - function hideMissingUserIcons() -- a function to hide img elements with no src attribute to prevent no picture defaults


function reloadCommentsWith(commentObjectArray) {

    const commentSection = document.querySelector('.comment-section__comments');

    //Remove all comments before reloading
    while (commentSection.firstChild) {
        commentSection.removeChild(commentSection.firstChild);
    }

    //Create each comment in the commentObjectArray and add it to the webpage
    commentObjectArray.forEach((commentDataObject) => {
        const comment = document.createElement('article');
        const userIconWrapper = document.createElement('div');
        const userIconImage = document.createElement('img')
        const commentBody = document.createElement('div');
        const commentBodyName = document.createElement('p');
        const commentBodyText = document.createElement('p');
        const commentBodyDate = document.createElement('p');

        comment.classList.add('comment');
        userIconWrapper.classList.add('user-icon-wrapper');
        userIconImage.classList.add('user-icon');
        commentBody.classList.add('comment-body');
        commentBodyName.classList.add('comment-body__name');
        commentBodyText.classList.add('comment-body__text');
        commentBodyDate.classList.add('comment-body__date');

        userIconImage.src = commentDataObject.iconPictureSrc;
        commentBodyName.textContent = commentDataObject.name;
        commentBodyText.textContent = commentDataObject.comment;
        commentBodyDate.textContent = commentDataObject.date;
        
        userIconWrapper.appendChild(userIconImage);
        comment.appendChild(userIconWrapper);

        commentBody.appendChild(commentBodyName);
        commentBody.appendChild(commentBodyText);
        commentBody.appendChild(commentBodyDate);

        comment.appendChild(commentBody);

        commentSection.appendChild(comment);
    });

    hideMissingUserIcons();
}


function displayComment(commentObject) {
    commentObjects.unshift(commentObject);
    reloadCommentsWith(commentObjects);
}


function getCurrentDate() {
    const presentDate = new Date();

    const day = String(presentDate.getDate()).padStart(2, '0');
    const month = String(presentDate.getMonth() + 1).padStart(2, '0');
    const year = presentDate.getFullYear()

    return `${day}/${month}/${year}`;
}


function hideMissingUserIcons() {
    const userIcons = document.querySelectorAll('.comment .user-icon');

    userIcons.forEach((img) => {
        img.addEventListener('error', function () {
            this.style.visibility = 'hidden'; // hide image that fails to load
        });
    }); //HERE
}

//commentObjects array for comment data
const commentObjects = [
    {
        name: 'Connor Walton',
        date: '02/17/2021',
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
        iconPictureSrc: ""
    },
    {
        name: 'Emilie Beach',
        date: '01/09/2021',
        comment: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
        iconPictureSrc: ""
    },
    {
        name: 'Miles Acosta',
        date: '12/20/2020',
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        iconPictureSrc: ""
    }
];


const commentForm = document.querySelector('.comment-form')

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const iconImageSrc = document.querySelector('.commenter-icon img').src;

    const newCommentObj = {name: formData.get('name'), comment: formData.get('comment'),
        date: getCurrentDate(), iconPictureSrc: iconImageSrc};

    displayComment(newCommentObj);

    this.reset();
});

reloadCommentsWith(commentObjects); //initial comments loading