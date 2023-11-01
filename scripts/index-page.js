//Index page Javascript
// Includes:
//  - function reloadCommentsWith(commentObjectArray) -- function to load/reload all comments on page
//  - function addComment(commentObject) -- function to display a new comment from user
//  - function calculateTimeAgo() -- returns the date in dynamic time if recent or in "DD/MM/YYYY format"
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

        userIconImage.src = "";
        commentBodyName.textContent = commentDataObject.name;
        commentBodyText.textContent = commentDataObject.comment;
        commentBodyDate.textContent = calculateTimeAgo(commentDataObject.timestamp);
        
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


function addComment(commentObject) {
    commentData.unshift(commentObject);
    reloadCommentsWith(commentData);
}


function calculateTimeAgo(date) {
    const commentDate = new Date(date);
    const now = new Date();
    const seconds = Math.round((now - commentDate) / 1000) // Date is stored in miliseconds, and there are 1000 miliseconds in 1 second
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(weeks / 4.345) // 4.345 is the average number of weeks in a month

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else if (weeks <= 4) {
        return `${weeks} weeks ago`;
    } else if (months < 12) {
        return `${months} months ago`;
    } else {

        return commentDate.toLocaleString('en-US', {day: "2-digit", month: "2-digit", year: "numeric"} );
    }

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
        date: new Date(2021, 1, 17),
        comment: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
        iconPictureSrc: ""
    },
    {
        name: 'Emilie Beach',
        date: new Date(2021, 0, 9),
        comment: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
        iconPictureSrc: ""
    },
    {
        name: 'Miles Acosta',
        date: new Date(2020, 11, 20),
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        iconPictureSrc: ""
    }
];


let commentData = {};
axios.get("https://project-1-api.herokuapp.com/comments?api_key=7de1682c-6a04-45d4-933e-e386aa8d3102")
    .then((data) => {
        commentData = data.data;
        console.log(data);
    },
        (error) => {
            console.log(error);
        }
    )
    .then( () =>
        reloadCommentsWith(commentData) //initial comments loading
    )





// Adding Event Listener for Comment Submission
const commentForm = document.querySelector('.comment-form')

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    // const iconImageSrc = document.querySelector('.commenter-icon img').src;

    const newCommentObj = {name: formData.get('name'), comment: formData.get('comment'),
        timestamp: new Date()};

    if (!newCommentObj['name'].trim()) {
        document.querySelector('.comment-form__input-name').classList.add('comment-form__input-field--error');
    }
    if (!newCommentObj['comment'].trim()) {
        document.querySelector('.comment-form__input-comment').classList.add('comment-form__input-field--error');
    }

    if (newCommentObj['comment'].trim() && newCommentObj['name'].trim()) {
        document.querySelector('.comment-form__input-name').classList.remove('comment-form__input-field--error');
        document.querySelector('.comment-form__input-comment').classList.remove('comment-form__input-field--error');

        addComment(newCommentObj);
        this.reset();
    }

    
});



// reloadCommentsWith(commentObjects); //initial comments loading