import { createElement, average } from "./utils.js";
export default class Restaurants {
  constructor() {
    this.markers = [];
    this.restaurants = [];
  }

  // Clear Markers
  clearMarkers() {
    for (marker of this.markers) {
      marker.setMap(null);
    }
  }

  // Create Small Card
  createSmallCard({ name, address, url, phone, rating, lat, long, id, photo }) {
    const smallCardsContainer = document.getElementById("small-cards");
    const bigCardsContainer = document.getElementById("big-cards");

    //! Create Small Card
    photo =
      photo ||
      "https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img (5).jpg";
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
            "background-image: url(" +
            photo +
            "); background-size: cover; background-position: center",
        },
        {
          name: "id",
          value: "small" + id,
        },
      ],
    });
    smallCardsContainer.appendChild(smallCard);

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

    const cardTitle = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "card-title",
        },
      ],
    });

    const titleName = createElement({ tag: "h2" });

    titleName.textContent = name;

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

    if (typeof rating === "object") {
      ratingAverage = average(rating, rating.length);
    } else {
      ratingAverage = rating;
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

    smallCard.addEventListener("click", () => {
      smallCardsContainer.classList.add("d-none");
      bigCardsContainer.classList.remove("d-none");
      this.createBigCard({ name, address, url, phone, rating, lat, long, id });
    });
  }

  // Create Big Card
  createBigCard({ name, address, rating, lat, long, id, types }) {
    let request = {
      placeId: id,
      fields: [
        "name",
        "rating",
        "reviews",
        "opening_hours",
        "types",
        "formatted_address",
        "formatted_phone_number",
        "website",
      ],
    };

    service.getDetails(request, callback);

    let displayComments = this.displayComment;

    let displayModals = this.displayModal.bind(this);

    function callback(place, status) {
      let restaurant = {
        name: name,
        rating: rating,
        lat: lat,
        long: long,
        id: id,
        types: types,
        address: address,
      };
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        restaurant = {
          name: place.name,
          rating: place.reviews,
          lat: lat,
          long: long,
          id: id,
          types: place.types,
          address: place.formatted_address,
          phone: place.formatted_phone_number,
          url: place.website,
        };
        console.log(place);
      }

      const smallCardsContainer = document.getElementById("small-cards");

      const bigCardsContainer = document.getElementById("big-cards");

      const bigCard = createElement({
        tag: "div",
        attrs: [
          {
            name: "id",
            value: "big" + id,
          },
          {
            name: "class",
            value: "card booking-card mt-5",
          },
        ],
      });

      bigCardsContainer.appendChild(bigCard);

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

      const image = createElement({
        tag: "img",
        attrs: [
          {
            name: "class",
            value: "card-img-top",
          },
          {
            name: "src",
            value: `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${long}&fov=90&heading=235&pitch=10&key=AIzaSyCwvAwHq_QnW9G7nmLRFIJkXRSPSRgvPt8`,
          },
          {
            name: "alt",
            value: "card image cap",
          },
        ],
      });

      const anchorCardBig = createElement({
        tag: "a",
        attrs: [
          {
            name: "href",
            value: "#!",
          },
        ],
      });

      const maskAnchor = createElement({
        tag: "div",
        attrs: [
          {
            name: "class",
            value: "mask rgba-white-slight",
          },
        ],
      });

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

      const anchorTitle = document.createElement("a");
      anchorTitle.textContent = name;

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

      const restoType = createElement({
        tag: "p",
        attrs: [{ name: "class", value: "mb-2" }],
      });

      restoType.textContent = place.types;

      let ratingAverage;

      if (typeof rating === "object") {
        ratingAverage = average(rating, rating.length);
      } else {
        ratingAverage = rating;
      }

      for (let i = 0; i < Math.ceil(ratingAverage); i++) {
        const starListItem = document.createElement("li");
        starListItem.classList.add("list-inline-item", "mr-0");
        const starListItemStar = document.createElement("i");
        starListItemStar.classList.add("fas", "fa-star", "amber-text");
        bigCard.appendChild(imageCard);
        starListItem.appendChild(starListItemStar);
        starList.appendChild(starListItem);
        cardContent.appendChild(starList);
        cardContent.appendChild(restoType);
        cardTitleBig.appendChild(anchorTitle);
        cardContent.appendChild(cardTitleBig);
        bigCard.appendChild(cardContent);
        imageCard.appendChild(image);
        anchorCardBig.appendChild(maskAnchor);
        imageCard.appendChild(anchorCardBig);
      }

      //! text

      const cardAddress = document.createElement("p");
      cardAddress.classList.add("card-text");
      cardAddress.textContent = place.formatted_address;

      const cardPhone = document.createElement("p");
      cardPhone.classList.add("card-text");
      cardPhone.textContent = place.formatted_phone_number;

      const cardUrl = document.createElement("a");
      cardUrl.classList.add("card-text");
      cardUrl.setAttribute("href", place.website);
      cardUrl.setAttribute("target", "_blank");
      cardUrl.textContent = place.website;

      const ligne = document.createElement("hr");
      ligne.classList.add("my-4");

      const scheduleText = document.createElement("p");
      scheduleText.classList.add("lead");

      const strongText = document.createElement("strong");
      strongText.textContent = "Opening Hours";

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

      place.opening_hours.weekday_text.forEach((item) => {
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
            value: "comments" + id,
          },
        ],
      });

      bigCard.appendChild(ratingsCommentsContainer);

      //! calling display rating function
      restaurant.rating.forEach((item) => {
        displayComments("comments" + id, item);
      });

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

      bigCardsContainer.appendChild(modalTargetContainer);

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
        displayModals(name, id);
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

      bigCard.appendChild(goBack);

      cardContent.appendChild(cardAddress);
      cardContent.appendChild(cardPhone);
      cardContent.appendChild(cardUrl);
      cardContent.appendChild(ligne);

      cardContent.appendChild(strongText);
      cardContent.appendChild(hourList);

      //!  goBAck event listener for showing the small Card
      goBack.addEventListener("click", () => {
        bigCardsContainer.classList.add("d-none");
        smallCardsContainer.classList.remove("d-none");
        bigCardsContainer.innerHTML = "";
      });
    }
  }

  // Add Form
  addForm(lat, long) {
    //! create a unique ID
    let id = "add-restaurant-" + Date.now(); //! Add a unique ID to the form using Date.now()

    //! Create Form
    //! Add MDB bootstrap forms to the info window using javascript
    const addForm = createElement({
      tag: "form",
      attrs: [
        {
          name: "id",
          value: "id",
        },
        {
          name: "action",
          value: "post",
        },
      ],
    });

    //! Restaurant Name Input
    const restoDivName = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "md-form",
        },
      ],
    });

    const restoName = createElement({
      tag: "input",
      attrs: [
        {
          name: "type",
          value: "text",
        },
        {
          name: "id",
          value: "inputMDEx",
        },
        {
          name: "class",
          value: "form-control restaurant-name",
        },
      ],
    });

    const restoNameHolder = createElement({
      tag: "label",
      attrs: [
        {
          name: "for",
          value: "inputMDEx",
        },
      ],
    });

    restoNameHolder.textContent = "Restaurant Name";

    //! Append Restaurant Name
    restoDivName.appendChild(restoName);
    restoDivName.appendChild(restoNameHolder);

    //! Restaurant Address Input
    const restoDivAddress = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "md-form",
        },
      ],
    });

    const restoAddress = createElement({
      tag: "input",
      attrs: [
        {
          name: "type",
          value: "text",
        },
        {
          name: "id",
          value: "inputMDEx",
        },
        {
          name: "class",
          value: "form-control restaurant-address",
        },
      ],
    });

    const restoAddressHolder = createElement({
      tag: "label",
      attrs: [
        {
          name: "for",
          value: "inputMDEx",
        },
      ],
    });

    restoAddressHolder.textContent = "Address";

    //! Append Restaurant Address
    restoDivAddress.appendChild(restoAddress);
    restoDivAddress.appendChild(restoAddressHolder);

    const restoDivWebsite = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "md-form",
        },
      ],
    });

    //! Restaurant Website Input
    const restoWebsite = createElement({
      tag: "input",
      attrs: [
        {
          name: "type",
          value: "text",
        },
        {
          name: "id",
          value: "inputMDEx",
        },
        {
          name: "class",
          value: "form-control restaurant-website",
        },
      ],
    });

    const restoWebsiteHolder = createElement({
      tag: "label",
      attrs: [
        {
          name: "for",
          value: "inputMDEx",
        },
      ],
    });

    restoWebsiteHolder.textContent = "Restaurant Website";

    //! Append Restaurant Website
    restoDivWebsite.appendChild(restoWebsite);
    restoDivWebsite.appendChild(restoWebsiteHolder);

    //! Restaurant Telephone Input
    const restoDivTelephone = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "md-form",
        },
      ],
    });

    const restoTelephone = createElement({
      tag: "input",
      attrs: [
        {
          name: "type",
          value: "text",
        },
        {
          name: "id",
          value: "inputMDEx",
        },
        {
          name: "class",
          value: "form-control restaurant-telephone",
        },
      ],
    });

    const restoTelephoneHolder = createElement({
      tag: "label",
      attrs: [
        {
          name: "for",
          value: "inputMDEx",
        },
      ],
    });

    restoTelephoneHolder.textContent = "Restaurant Telephone";

    //! Append Restaurant Telephone
    restoDivTelephone.appendChild(restoTelephone);
    restoDivTelephone.appendChild(restoTelephoneHolder);

    //! Restaurant Rating
    const restoRatingDiv = createElement({
      tag: "div",
      attrs: [
        {
          name: "class",
          value: "add-restaurant-rating",
        },
      ],
    });

    const restoRating = createElement({
      tag: "select",
      attrs: [
        {
          name: "class",
          value: "mdb-select md-form colorful-select dropdown-primary",
        },
      ],
    });

    let optOne = document.createElement("option");
    optOne.setAttribute("value", "1");
    optOne.textContent = "One";

    let optTwo = document.createElement("option");
    optTwo.setAttribute("value", "2");
    optTwo.textContent = "Two";

    let optThree = document.createElement("option");
    optThree.setAttribute("value", "3");
    optThree.textContent = "Three";

    let optFour = document.createElement("option");
    optFour.setAttribute("value", "4");
    optFour.textContent = "Four";

    let optFive = document.createElement("option");
    optFive.setAttribute("value", "5");
    optFive.textContent = "Five";

    let colorBlue = document.createElement("label");
    colorBlue.classList.add("mdb-main-label");
    colorBlue.textContent = "Rating: ";

    //! Add Button
    const btn = createElement({
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

    btn.textContent = "Add Restaurant";

    //! Append Ratings
    restoRatingDiv.appendChild(colorBlue);
    restoRating.appendChild(optOne);
    restoRating.appendChild(optTwo);
    restoRating.appendChild(optThree);
    restoRating.appendChild(optFour);
    restoRating.appendChild(optFive);
    restoRatingDiv.appendChild(restoRating);

    //! Append All Divs to Form
    addForm.appendChild(restoDivName);
    addForm.appendChild(restoDivAddress);
    addForm.appendChild(restoDivWebsite);
    addForm.appendChild(restoDivTelephone);
    addForm.appendChild(restoRatingDiv);
    addForm.appendChild(btn);

    //! Add an event listener to the button that extracts the data from the form
    btn.addEventListener("click", () => {
      const restaurantName = restoName.value;
      const restaurantAddress = restoAddress.value;
      const restaurantUrl = restoWebsite.value;
      const restaurantTelephone = restoTelephone.value;
      const restaurantRating = restoRating.value;
      const restaurantId = Date.now();
      console.log(restaurantId);

      this.createSmallCard({
        name: restaurantName,
        address: restaurantAddress,
        url: restaurantUrl,
        phone: restaurantTelephone,
        rating: restaurantRating,
        lat: lat,
        long: long,
        id: restaurantId,
      });
    });
    return addForm;
  }

  // display ratings and comments
  displayComment(id, item) {
    console.log(item);

    //! getting the ULrestaurantId
    const commentsContainer = document.getElementById(id);

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
    commentsContainer.appendChild(ratingsCommentsList);

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
    for (i = 0; i < stars; i++) {
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

  // MODAL
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

    //! add event listener to the submit btn
    submitBtn.addEventListener("click", function () {
      const nameWriteComment = userNameInput.value;
      const messageWriteComment = mdFormTextarea.value;
      displayComments("comments" + id, {
        rating: 1,
        comment: messageWriteComment,
      });
      userNameInput.value = "";
      mdFormTextarea.value = "";
      console.log(nameWriteComment, messageWriteComment);
    });
  }
}
