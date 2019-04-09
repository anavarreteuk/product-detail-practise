let state = {
  colourSelected: null,
  size: "",
  quantity: "",
  previousPrice: "",
  currentPrice: null
};

(function generateColours() {
  let arrayColours = data.styles
    .map(item => item.colour)
    .map(str => str.replace(/\s/g, ""));

  let colours = "";
  arrayColours.forEach(element => {
    colours += `<div>
            <input data-image=${element} type="radio" id=${element.toLowerCase()} name="color" value=${element} checked>
                <label for=${element}><span class="spans" id=${element.toLowerCase()}></span></label>
    </div>`;
    document.getElementsByClassName("color-choose")[0].innerHTML = colours;
  });
})();

(function changeImage() {
  let spanElement = document
    .getElementById("coloursDiv")
    .getElementsByClassName("spans");

  for (let i = 0; i < spanElement.length; i++) {
    spanElement[i].addEventListener(
      "click",
      function(event) {
        state = {
          ...state,
          colourSelected: event.target.id,
          quantity: "",
          previousPrice: "",
          currentPrice: "",
          size: ""
        };

        document.getElementById(
          "colorToShow"
        ).innerHTML = `Selected color: ${state.colourSelected.replace(/_/g, " ")}`;

        switch (event.target.id) {
          case "black":
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_Y0_X_EC_90";

            break;
          case "navy":
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_F0_X_EC_90";

            break;
          case "melba_blush":
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_W4_X_EC_90";

            break;
          case "dark_stone":
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_JF_X_EC_90";

            break;
          case "honey":
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_HN_X_EC_90";

            break;
          case "periwinkle":
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_SJ_X_EC_90";

            break;
          default:
            document.getElementById("mainPicture").src =
              "https://asset1.marksandspencer.com/is/image/mands/SD_01_T49_3422_Y0_X_EC_0";
        }

        document.getElementById("quantityToShow").innerHTML = ` Qty: ${
          state.quantity
        }`;

        document.getElementById("sizeToShow").innerHTML = ` Selected Size: ${
          state.size
        }`;
        if (!state.currentPrice) {
          let price = document.getElementsByClassName("product-price")[0];
          while (price.hasChildNodes()) {
            price.removeChild(price.firstChild);
          }
        }
        if (state.colourSelected) {
          let selectSize = document.getElementById("selectSize");
          while (selectSize.hasChildNodes()) {
            selectSize.removeChild(selectSize.firstChild);
          }
          var selectQuantity = document.getElementById("selectQuantity");

          while (selectQuantity.hasChildNodes()) {
            selectQuantity.removeChild(selectQuantity.firstChild);
          }
        }
        state.colourSelected ? size() : null;
      },
      false
    );
  }
})();

(function productDescription() {
  document.getElementById("sizeToShow").innerHTML = ` Selected Size: ${
    state.size
  }`;

  let productName = data.name;
  let newItem = document.createElement("h3");
  let textNode = document.createTextNode(productName);
  newItem.appendChild(textNode);

  let list = document.getElementsByClassName("product-description")[0];
  list.insertBefore(newItem, list.childNodes[0]);
  document.getElementsByClassName("product-text")[0].innerHTML =
    data.description;
})();
