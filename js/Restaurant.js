import { createElement, average } from "./utils.js";
export default class Restaurant {
  constructor({name, rating, id, address, reviews, lat, long, phone, url, openedHours, types}){
  this.name = name;
	this.rating = rating;
	this.id = id;
	this.address = address;
	this.reviews = reviews;
	this.lat = lat;
	this.long = long;
	this.phone = phone;
	this.url = url;
	this.openedHours = openedHours || [];
  this.types = types
}

  //! Clear Markers
  clearMarkers() {
    for (marker of this.markers) {
      marker.setMap(null);
    }
  }

  //! Create Small Card
  createSmallCard({photo}) {
    let randomNumber = Math.ceil(Math.random() * 50)
    photo = photo || "https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img("+randomNumber+").jpg";

    //! Create Small Card
    const smallCard = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "card card-image hover mb-3",
        },
        {
          name: "style",
          value:
            'background-image: url("'+
            photo +
            '"); background-size: cover; background-position: center',
        },
        {
          name: "id",
          value: "small" + this.id,
        },
      ],
    });

    //! create cardStyle div
    const cardStyle = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value:
            "text-white text-center d-flex align-items-center flex-column rgba-red-light p-2",
        },
      ],
    });

    //!create cardTitle div
    const cardTitle = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "card-title",
        },
      ],
    });

    //! create titleName tag
    const titleName = createElement({ tag: "h2" });
    titleName.textContent = this.name;

    //! create starList tag
    const starList = createElement({
      tag: "ul",
      attrs: [
        {
          name: "class",
          value: "list-unstyled list-inline rating mb-0 amber-text",
        },
      ],
    });

    let ratingAverage;

    if (Array.isArray(this.rating)) {
      ratingAverage = average(this.rating, this.rating.length);
    } else {
      ratingAverage = this.rating;
    }

    for (let i = 0; i < Math.ceil(ratingAverage); i++) {
      const starListItem = document.createElement("li");
      starListItem.classList.add("list-inline-item", "mr-0");
      const starListItemStar = document.createElement("i");
      starListItemStar.classList.add("fas", "fa-star");
      starListItem.appendChild(starListItemStar);
      starList.appendChild(starListItem);
      cardStyle.appendChild(starList);
      cardTitle.appendChild(titleName);
      cardStyle.appendChild(cardTitle);
      smallCard.appendChild(cardStyle);
    }

    return smallCard;
  }

  //! Create Big Card
  createBigCard({reviews, clickGoBack, openedHours, phone}) {
    clickGoBack = clickGoBack || Function;
    this.openedHours = openedHours || [];
    this.reviews = reviews || [];

    //! create bigCard
    const bigCard = createElement({
      tag: "div",
      attrs: [
        {
          name: "id",
          value: "big" + this.id,
        },
        {
          name: "class",
          value: "card booking-card mt-5",
        },
      ],
    });

    //! card image
    const imageCard = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "view overlay",
        },
      ],
    });

    //! append imageCard to bigCard
    bigCard.appendChild(imageCard);

    //! create img
    const image = createElement({
      tag: "img",
      attrs: [
        {
          name: "class",
          value: "card-img-top",
        },
        {
          name: "src",
          value: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${this.lat},${this.long}&fov=90&heading=235&pitch=10&key=AIzaSyCwvAwHq_QnW9G7nmLRFIJkXRSPSRgvPt8`,
        },
        {
          name: "alt",
          value: "card image cap",
        },
      ],
    });

    //! append image to imageCard
    imageCard.appendChild(image);

    //!create anchor
    const anchorCardBig = createElement({
      tag: "a",
      attrs: [
        {
          name: "href",
          value: "#!",
        },
      ],
    });

    //! append anchorCardBig to imageCard
    imageCard.appendChild(anchorCardBig);

    const maskAnchor = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "mask rgba-white-slight",
        },
      ],
    });

    //!append maskAnchor to anchorCardBig
    anchorCardBig.appendChild(maskAnchor);

    //! card content
    const cardContent = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "card-body",
        },
      ],
    });

    //! append cardContent to bigCard
    bigCard.appendChild(cardContent);

    //! card title
    const cardTitleBig = createElement({
      tag: "h4",
      attrs: [
        {
          name: "class",
          value: "card-title font-weight-bold",
        },
      ],
    });

    //! append cardTitleBig to cardContent
    cardContent.appendChild(cardTitleBig);

    const anchorTitle = document.createElement("a");
    anchorTitle.textContent = this.name;

    //! append anchorTitle to cardTitleBig
    cardTitleBig.appendChild(anchorTitle);

    //! data
    const starList = createElement({
      tag: "ul",
      attrs: [
        {
          name: "class",
          value: "list-unstyled list-inline rating mb-0 amber-text",
        },
      ],
    });

    //! append starList to cardContent
    cardContent.appendChild(starList);

    //! create restoType
    const restoType = createElement({
      tag: "p",
      attrs: [{ name: "class", value: "mb-2" }],
    });

    restoType.textContent = this.types;

     //! append restoType to cardContent
     cardContent.appendChild(restoType);

    let ratingAverage;

    if (typeof this.rating === "object") {
      ratingAverage = average(this.rating, this.rating.length);
    } else {
      ratingAverage = this.rating;
    }

    for (let i = 0; i < Math.ceil(ratingAverage); i++) {
      const starListItem = document.createElement("li");
      starListItem.classList.add("list-inline-item", "mr-0");
      const starListItemStar = document.createElement("i");
      starListItemStar.classList.add("fas", "fa-star", "amber-text");
      starListItem.appendChild(starListItemStar);
      starList.appendChild(starListItem);
    }

    //! text
    const cardAddress = document.createElement("p");
    cardAddress.classList.add("card-text");
    cardAddress.textContent = this.address;

    //! append cardAddress to cardContent
    cardContent.appendChild(cardAddress);

    const cardPhone = document.createElement("p");
    cardPhone.classList.add("card-text");
    cardPhone.textContent = phone;

    //! append cardPhone to cardContent
    cardContent.appendChild(cardPhone);

    const cardUrl = document.createElement("a");
    cardUrl.classList.add("card-text");
    cardUrl.setAttribute("href", this.url);
    cardUrl.setAttribute("target", "_blank");
    cardUrl.textContent = this.url;

    //! append cardUrl to cardContent
    cardContent.appendChild(cardUrl);

    const ligne = document.createElement("hr");
    ligne.classList.add("my-4");

    //! append ligne to cardContent
    cardContent.appendChild(ligne);

    const scheduleText = document.createElement("p");
    scheduleText.classList.add("lead");

    //! append scheduleText to cardContent
    cardContent.appendChild(scheduleText);

    const strongText = document.createElement("strong");
    strongText.textContent = "Opening Hours";

    //! append strongText to cardContent
    cardContent.appendChild(strongText);

    const hourList = createElement({
      tag: "ul",
      attrs: [
        {
          name: "class",
          value:
            "list-unstyled list-inline d-flex justify-content-between mb-0 flex-column flex-md-row",
        },
      ],
    });

    //! append hourList to cardContent
    cardContent.appendChild(hourList);

    this.openedHours.forEach((item) => {
      const openingHoursItem = document.createElement("li");
      openingHoursItem.classList.add("list-inline-item", "mr-0");
      const openingHours = document.createElement("div");
      openingHours.classList.add("chip", "mr-0");
      openingHours.textContent = item;

      openingHoursItem.appendChild(openingHours);
      hourList.appendChild(openingHoursItem);
      console.log(item);
    });

    //! create UL with COMMENTS
    const ratingsCommentsContainer = createElement({
      tag: "ul",
      attrs: [
        {
          name: "class",
          value: "list-unstyled",
        },
        {
          name: "id",
          value: "comments" + this.id,
        },
      ],
    });

    //! append ratingsCommentsContainer to bigCard
    bigCard.appendChild(ratingsCommentsContainer);

    //! calling display rating function
    const commentContainer = createElement({
      tag: "ul"
    })
    this.reviews.forEach((item) => {
      this.displayComment(commentContainer, item);
    });

    bigCard.appendChild(commentContainer)
    //! button target modal
    const modalTargetContainer = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "text-center",
        },
      ],
    });

    //! append modalTargetContainer to bigCard
    bigCard.appendChild(modalTargetContainer);

    //! init modal target btn
    const modalTargetBtn = createElement({
      tag: "a",
      attrs: [
        {
          name: "class",
          value: "btn btn-primary mb-4 mt-3",
        },
        {
          name: "data-toggle",
          value: "modal",
        },
        {
          name: "data-target",
          value: "#modalContactForm",
        },
      ],
    });

    modalTargetBtn.textContent = "Write a Review";

    //! append modal target btn to the modal container
    modalTargetContainer.appendChild(modalTargetBtn);

    modalTargetBtn.addEventListener("click", () => {
      this.displayModal(this.name, this.id);
      $("#modalContactForm").modal();
    });

    //! Add go back button
    let goBack = createElement({
      tag: "button",
      attrs: [
        {
          name: "type",
          value: "button",
        },
        {
          name: "class",
          value: "btn btn-primary add-restaurant",
        },
      ],
    });

    goBack.textContent = "Go Back";

    //! append goBack to bigCard
    bigCard.appendChild(goBack);

    //!  goBAck event listener for showing the small Card
    goBack.addEventListener("click", () => {
      clickGoBack();
    });

    return bigCard;
  }

   //! display ratings and comments
   displayComment(el, item) {
   
    //! create li
    const ratingsCommentsList = createElement({
      tag: "li",
      attrs: [
        {
          name: "class",
          value: "media",
        },
      ],
    });

    //! append li to ul
    el.appendChild(ratingsCommentsList);

    //! create user img
    const reviewImageUser = createElement({
      tag: "img",
      attrs: [
        {
          name: "class",
          value: "d-flex mr-3",
        },
        {
          name: "src",
          value: "https://i.pravatar.cc/60",
        },
        {
          name: "alt",
          value: "User Photo",
        },
      ],
    });

    //! append user img to li
    ratingsCommentsList.appendChild(reviewImageUser);

    //! create stars container
    const starsUserNameContainer = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "media-body",
        },
      ],
    });

    //! append stars  user name container to li
    ratingsCommentsList.appendChild(starsUserNameContainer);

    //! create user name h5
    const userName = createElement({
      tag: "h5",
      attrs: [
        {
          name: "class",
          value: "mt-0 mb-2 font-weight-bold",
        },
      ],
    });

    userName.textContent = item.author_name;

    //! append user name to stars use name container
    starsUserNameContainer.appendChild(userName);

    //! create stars
    let stars = item.stars || item.rating;
    console.log(stars);
    for (let i = 0; i < stars; i++) {
      const starsReview = createElement({
        tag: "i",
        attrs: [
          {
            name: "class",
            value: "fas fa-star",
          },
        ],
      });

      starsUserNameContainer.appendChild(starsReview);
      if (stars <= 5) {
        starsReview.classList.add("amber-text");
      }
    }

    //! create comments
    const reviews = document.createElement("p");
    reviews.textContent = item.comment || item.text;
    starsUserNameContainer.appendChild(reviews);
    console.log(reviews);
  }

  //! MODAL
  displayModal(name, id) {
    const displayComments = this.displayComment;
    const bigCardsContainer = document.getElementById("big-cards");
    const bigModalContainer = document.createElement("div");
    bigModalContainer.classList.add("modal", "fade");
    bigModalContainer.setAttribute("id", "modalContactForm");
    bigModalContainer.setAttribute("tabindex", "-1");
    bigModalContainer.setAttribute("role", "dialog");
    bigModalContainer.setAttribute("aria-labelledby", "myModalLabel");
    bigModalContainer.setAttribute("aria-hidden", "true");

    //! append main div to the big card container
    bigCardsContainer.appendChild(bigModalContainer);

    //! init second div
    const secondDiv = document.createElement("div");
    secondDiv.classList.add("modal-dialog");
    secondDiv.setAttribute("role", "document");

    //! append secondDiv to main one
    bigModalContainer.appendChild(secondDiv);

    //! init the 3th div
    const thirdDiv = document.createElement("div");
    thirdDiv.classList.add("modal-content");

    //! append the 3th div to the second one
    secondDiv.appendChild(thirdDiv);

    //! init the 4th div
    const forthDiv = document.createElement("div");
    forthDiv.classList.add("modal-header", "text-center");

    //! append 4th div to the 3th one
    thirdDiv.appendChild(forthDiv);

    //! init title of the modal
    const modalTitle = document.createElement("h4");
    modalTitle.classList.add("modal-title", "w-100", "font-weight-bold");
    modalTitle.textContent = name;

    //! append modalTitle to the 4th div
    forthDiv.appendChild(modalTitle);

    //! init close button
    const closingBtn = document.createElement("button");
    closingBtn.setAttribute("type", "button");
    closingBtn.setAttribute("data-dismiss", "modal");
    closingBtn.setAttribute("aria-label", "Close");
    closingBtn.classList.add("close");

    //! init span inside the closing Btn
    const spanX = document.createElement("span");
    spanX.setAttribute("aria-hidden", "true");
    spanX.innerHTML = "&times;";

    //! append span x to the closing btn
    closingBtn.appendChild(spanX);

    //! append closing btn to the 4th div
    forthDiv.appendChild(closingBtn);

    //! modalBody
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "mx-3");

    //! append main enter name to 3th div
    thirdDiv.appendChild(modalBody);

    //! init second enter name
    const secondEnterName = document.createElement("div");
    secondEnterName.classList.add("md-form", "mb-5");

    //! append second enter name to the main enter name
    modalBody.appendChild(secondEnterName);

    //! init user font
    const userFont = document.createElement("i");
    userFont.classList.add("fas", "fa-user", "prefix", "grey-text");

    //! append user font to its container
    secondEnterName.appendChild(userFont);

    //! init user name input
    const userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("id", "form34");
    userNameInput.classList.add("form-control", "validate");

    //! append user name input to its container
    secondEnterName.appendChild(userNameInput);

    //! init user name label
    const userNameLabel = document.createElement("label");
    userNameLabel.setAttribute("data-error", "wrong");
    userNameLabel.setAttribute("data-success", "right");
    userNameLabel.setAttribute("for", "form34");
    userNameLabel.textContent = "Your Name";

    //! append user label name to its container
    secondEnterName.appendChild(userNameLabel);

    //! 5 stars rating
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("container", "text-center");

    //! append rating container to the 3th div
    modalBody.appendChild(ratingContainer);

    //! init rating span
    const ratingSpan = document.createElement("span");
    ratingSpan.setAttribute("id", "rateMe1");

    //! append rating pan to the rating container
    ratingContainer.appendChild(ratingSpan);

    $("#rateMe1").mdbRate();

    //! init form enter your message
    const mdForm = document.createElement("div");
    mdForm.classList.add("md-form");

    //! append mdform to the modal body
    modalBody.appendChild(mdForm);

    //! init pencil font
    const pencilFont = document.createElement("i");
    pencilFont.classList.add("fas", "fa-pencil", "prefix", "grey-text");

    //! append pencil font to the mdform
    mdForm.appendChild(pencilFont);

    //! init mdForm textarea
    const mdFormTextarea = document.createElement("textarea");
    mdFormTextarea.setAttribute("type", "text");
    mdFormTextarea.setAttribute("id", "form8");
    mdFormTextarea.setAttribute("rows", "4");
    mdFormTextarea.classList.add("md-textarea", "form-control");

    //! append mdformtextarea to the mdform
    mdForm.appendChild(mdFormTextarea);

    //! init mdform label
    const mdFormLabel = document.createElement("label");
    mdFormLabel.setAttribute("data-error", "wrong");
    mdFormLabel.setAttribute("data-success", "right");
    mdFormLabel.setAttribute("for", "form34");
    mdFormLabel.textContent = "Your Message";

    //! append mdform label to the modal body
    mdForm.appendChild(mdFormLabel);

    //! submit review button
    const submitReviewBtn = document.createElement("div");
    submitReviewBtn.classList.add(
      "modal-footer",
      "d-flex",
      "justify-content-center"
    
    );

    //! append submit review btn to the 3th div
    thirdDiv.appendChild(submitReviewBtn);

    //! submit button
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("btn", "btn-primary");
    submitBtn.textContent = "Send";

    //! append submit btn to submit review btn
    submitReviewBtn.appendChild(submitBtn);

    //! value of ratingStars
    function amberStar(){
      const ratingStars = document.querySelector('#rateMe1');
      console.log(ratingStars)
      const itemsRatingStars = ratingStars.querySelectorAll('.amber-text')
      console.log(itemsRatingStars)
      if(itemsRatingStars.length > 0){
        let selectedStars = 0
        for(let i=0; i<itemsRatingStars.length; i++){
          ++selectedStars        
        }
        return selectedStars
      }
     
    };

    //! add event listener to the submit btn
    submitBtn.addEventListener("click", function () {
      const nameWriteComment = userNameInput.value;
      const messageWriteComment = mdFormTextarea.value;
      const commentsList = document.querySelector('#comments' + id)
      displayComments(commentsList, {
        rating: amberStar(),
        comment: messageWriteComment,
        author_name: nameWriteComment
      });
      userNameInput.value = "";
      mdFormTextarea.value = "";
      $("#rateMe1").html("");
      $("#modalContactForm").close() //! to be fixed the closing function
      console.log(nameWriteComment, messageWriteComment);
    });
  }
}
