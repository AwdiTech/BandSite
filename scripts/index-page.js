//Index page Javascript
// Includes:
//  - function reloadCommentsWith(commentObjectArray) -- function to load/reload all comments on page
//  - function addComment(commentObject) -- function to display a new comment from user
//  - function calculateTimeAgo() -- returns the date in dynamic time if recent or in "DD/MM/YYYY format"
//  - function hideMissingUserIcons() -- a function to hide img elements with no src attribute to prevent no picture defaults
//  - function getComments() -- This function makes the GET API call for the comment data
//  - function likeComment() -- This function uses the PUT API method to increment likes


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
        const commentBodyLikes = document.createElement('div');
        const commentBodyLikesCount = document.createElement('p');
        const commentBodyLikesIcon = document.createElement('img');
        const commentBodyDeleteIcon = document.createElement('img');

        comment.classList.add('comment');
        comment.setAttribute('data-id', commentDataObject.id);
        userIconWrapper.classList.add('user-icon-wrapper');
        userIconImage.classList.add('user-icon');
        commentBody.classList.add('comment-body');
        commentBodyName.classList.add('comment-body__name');
        commentBodyText.classList.add('comment-body__text');
        commentBodyDate.classList.add('comment-body__date');

        commentBodyLikes.classList.add('comment-body__likes');
        commentBodyLikesCount.classList.add('comment-body__likes-count');
        commentBodyLikesCount.setAttribute('data-id', commentDataObject.id);
        commentBodyLikesIcon.classList.add('comment-body__likes-icon');
        commentBodyDeleteIcon.classList.add('comment-body__delete');


        userIconImage.src = "";
        commentBodyName.textContent = commentDataObject.name;
        commentBodyText.textContent = commentDataObject.comment;
        commentBodyDate.textContent = calculateTimeAgo(commentDataObject.timestamp);
        commentBodyLikesCount.textContent = commentDataObject.likes;
        commentBodyLikesIcon.src = "/assets/icons/svg/icon-like.svg";
        commentBodyDeleteIcon.src = "/assets/icons/svg/icon-delete.svg";

        userIconWrapper.appendChild(userIconImage);
        comment.appendChild(userIconWrapper);

        commentBody.appendChild(commentBodyName);
        commentBody.appendChild(commentBodyText);
        commentBody.appendChild(commentBodyDate);

        commentBodyLikes.appendChild(commentBodyLikesIcon);
        commentBodyLikes.appendChild(commentBodyLikesCount);
        commentBody.appendChild(commentBodyLikes);
        commentBody.appendChild(commentBodyDeleteIcon);

        comment.appendChild(commentBody);

        commentSection.appendChild(comment);   
        
        
        commentBodyLikes.addEventListener('click', () => likeComment(commentDataObject.id) );     
        commentBodyDeleteIcon.addEventListener('click', () => deleteComment(commentDataObject.id));
    });

    hideMissingUserIcons();
}


function addComment(commentObject) {
    axios.post("https://project-1-api.herokuapp.com/comments?api_key=7de1682c-6a04-45d4-933e-e386aa8d3102", commentObject)
    .then( getComments )
    .catch((error) => console.log(error));
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

        return commentDate.toLocaleString('en-US', { day: "2-digit", month: "2-digit", year: "numeric" });
    }

}


function hideMissingUserIcons() {
    const userIcons = document.querySelectorAll('.comment .user-icon');

    userIcons.forEach((img) => {
        img.addEventListener('error', function () {
            this.style.visibility = 'hidden'; // hide image that fails to load
        });
    });
}


function getComments() {
    axios.get("https://project-1-api.herokuapp.com/comments?api_key=7de1682c-6a04-45d4-933e-e386aa8d3102")
        .then((data) => {
            commentData = data.data;
            commentData.sort((a, b) => b.timestamp - a.timestamp);
        },
            (error) => {
                console.log(error);
            }
        )
        .then(() =>
            reloadCommentsWith(commentData) //initial comments loading
        )
}


function likeComment(commentId) {

    let commentIndex = commentData.findIndex(x => x.id === commentId);

    if (commentData[commentIndex]) {

        // Here I increment like count both locally and in DOM preemptively to avoid waiting for server response
        // To do this, I introduced a new `data-id` attribute for the HTML likes counter element.
        // This allows me to avoid reloading every comment, everytime a like is made.
        // And if the PUT API call fails, then the like is easily subtracted locally and in the DOM
        commentData[commentIndex].likes++;
        commentLikesCounter = document.querySelector(`.comment-body__likes-count[data-id="${commentId}"`);
        commentLikesCounter.innerText = commentData[commentIndex].likes;

        axios.put("https://project-1-api.herokuapp.com/comments/" + commentId + "/like?api_key=7de1682c-6a04-45d4-933e-e386aa8d3102")
            .then( () => {
                 // Successful PUT request, no action required as the like count was updated preemptively
            })
            .catch((error) => {
                console.error(`Error updating likes for comment ID ${commentId}:`, error);
                //If API PUT call fails, then we remove the preemptive like increment
                commentData[commentIndex].likes--;
                commentLikesCounter.innerText = commentData[commentIndex].likes;
            });
    } else {
        console.error("Error: Comment Not found. Comment Like failed...");
    }
}


function deleteComment(commentId) {

    axios.delete("https://project-1-api.herokuapp.com/comments/" + commentId + "?api_key=7de1682c-6a04-45d4-933e-e386aa8d3102")
    .then( (success) => {

        //Remove the comment from commentData locally, and then remove comment from DOM locally
        //This prevents the need to make another GET API call and to reload all the comments
        commentData = commentData.filter( comment => comment.id !== commentId);

        comment = document.querySelector(`.comment[data-id="${commentId}"`);
        if (comment) {
            comment.parentElement.removeChild(comment);
        }
    })
    .catch( (error) => {
        console.error(`Error deleting comment with ID ${commentId}: ${error}`);
    });
}


// Adding Event Listener for Comment Submission
const commentForm = document.querySelector('.comment-form')

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const newCommentObj = { name: formData.get('name'), comment: formData.get('comment') };

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


let commentData = []; //Initialize empty commentData array

getComments();  //initial comments loading
