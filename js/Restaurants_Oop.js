import { createElement, average } from "./utils.js";

export default class Restaurants {
  constructor() {
    this.restaurants = [];
  }

  // Add Form
  addForm(lat, long, id) {
    //! create a unique ID

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
      
      this.createSmallCard({
        name: restaurantName,
        address: restaurantAddress,
        url: restaurantUrl,
        phone: restaurantTelephone,
        rating: restaurantRating,
        lat: lat,
        long: long,
        id: id
      });
    });
    return addForm;
  }

  add(item){
	this.restaurants.push(item)  
  }

  remove(item){
	  this.restaurants = this.restaurants.filter(x => x.id === item.x)
  }

  removeAll(){
	  this.restaurants = []
  }
}
