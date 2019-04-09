function size() {
  let arrayStyles = data.styles.filter(
    element =>
      element.colour.toLowerCase() === state.colourSelected.toLowerCase()
  );
  let stylesDetail = arrayStyles.map(element => element.skus);
  for (let index = 0; index < stylesDetail.length; index++) {
    var element = stylesDetail[index];
  }

  let result = Object.values(element)
    .filter(key => key.size)
    .map(item => item.size);

  let select = document.getElementById("selectSize");

  let disabled = document.createElement("option");
  disabled.innerHTML = "Select";
  disabled.setAttribute("disabled", "");
  disabled.setAttribute("selected", "");
  select.insertBefore(disabled, select.firstChild);

  for (i = 0; i < result.length; i++) {
    let opt = document.createElement("option");
    opt.value = result[i].Size;
    opt.innerHTML = result[i].Size;
    select.appendChild(opt);
  }
}

(function getSizeValue() {
  let selectedSize = document.getElementById("selectSize");

  selectedSize.addEventListener("change", e => {
    state = { ...state, quantity: "", size: e.target.value };

    document.getElementById("quantityToShow").innerHTML = ` Quantity: ${
      state.quantity
    }`;

    document.getElementById("sizeToShow").innerHTML = ` Selected Size: ${
      state.size
    }`;
    getQuantity();
    getPrice();
  });
})();

function getQuantity() {
  let arrayStyles = data.styles.filter(
    element =>
      element.colour.toLowerCase() === state.colourSelected.toLowerCase()
  );

  let arrayQuantity = arrayStyles.map(element => element.skus);
  for (let index = 0; index < arrayQuantity.length; index++) {
    var element = arrayQuantity[index];
  }

  let sizeChoosen = Object.values(element).filter(key => key.size);

  let reduced = sizeChoosen.reduce(function(filtered, option) {
    if (option) {
      var someNewValue = {
        size: option.size.Size,
        maximumPurchaseQuantity: option.maximumPurchaseQuantity
      };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);
  let value = reduced
    .filter(item => item.size == state.size)
    .map(i => i.maximumPurchaseQuantity)[0];

  state = { ...state, quantity: value };

  let select = document.getElementById("selectQuantity");

  while (select.hasChildNodes()) {
    select.removeChild(select.firstChild);
  }
  createSelectQuantity(value);
}

function createSelectQuantity(value) {
  let select = document.getElementById("selectQuantity");

  let result = [];

  for (var i = 1; i <= value; i++) {
    result.push(i);
  }
  let disabled = document.createElement("option");
  disabled.innerHTML = "Select";
  disabled.setAttribute("disabled", "");
  disabled.setAttribute("selected", "");
  select.insertBefore(disabled, select.firstChild);

  for (i = 0; i < result.length; i++) {
    let opt = document.createElement("option");
    opt.value = result[i];
    opt.innerHTML = result[i];
    select.appendChild(opt);
  }
}
(function getQuantityValue() {
  let selectQuantity = document.getElementById("selectQuantity");

  selectQuantity.addEventListener("change", e => {
    state = { ...state, quantity: e.target.value };
    document.getElementById("quantityToShow").innerHTML = ` Quantity: ${
      state.quantity
    }`;
  });
})();

function getPrice() {
  let arrayStyles = data.styles.filter(
    element => element.colour.toLowerCase() === state.colourSelected
  );
  let coulourSizes = arrayStyles.map(element => element.skus);
  for (let index = 0; index < coulourSizes.length; index++) {
    var element = coulourSizes[index];
  }
  let colourSize = Object.values(element).filter(key => key.size);

  let reduced = colourSize.reduce(function(filtered, option) {
    if (option) {
      let someNewValue = {
        size: option.size.Size,
        currentPrice: option.price.currentPrice,
        previousPrice: option.price.previousPrice
      };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);
  reduced
    .filter(item => item.size == state.size)
    .map(
      i =>
        (state = {
          ...state,
          currentPrice: i.currentPrice,
          previousPrice: i.previousPrice
        })
    );
  showPrice();
}

function showPrice() {
  document.getElementsByClassName(
    "product-price"
  )[0].innerHTML = `<h2 id="main-price">£${
    state.currentPrice
  }</h2><h5 id="save-price"> save £${state.previousPrice -
    state.currentPrice}</h5><h5 id="was-price"> was ${
    state.previousPrice
  }</h5>`;
}
