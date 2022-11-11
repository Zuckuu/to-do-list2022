todoMain();

function todoMain() {
  let inputElem, inputElem2, button, selectElem;

  getElements();
  addListeners();

  function getElements() {
    inputElem = document.getElementsByTagName("input")[0];
    inputElem2 = document.getElementsByTagName("input")[1];
    button = document.getElementById("addBtn");
    selectElem = document.getElementById("categoryFilter");
  }

  function addListeners() {
    button.addEventListener("click", addEntry, false);
    selectElem.addEventListener("change", filterEntries, false);
  }

  function addEntry(event) {
    let inputValue = inputElem.value;
    inputElem.value = "";

    let inputValue2 = inputElem2.value;
    inputElem2.value = "";

    let table = document.getElementById("todoTable");

    let trElem = document.createElement("tr");
    table.appendChild(trElem);

    //checkbox cell
    let checkboxElem = document.createElement("input");
    checkboxElem.type = "checkbox";
    checkboxElem.addEventListener("click", done, false);
    let tdElem1 = document.createElement("td");
    tdElem1.appendChild(checkboxElem);
    trElem.appendChild(tdElem1);

    //Assignments cell
    let tdElem2 = document.createElement("td");
    tdElem2.innerText = inputValue;
    trElem.appendChild(tdElem2);

    //Category cell
    let tdElem3 = document.createElement("td");
    tdElem3.innerText = inputValue2;
    trElem.appendChild(tdElem3);

    //Detele cell
    let spanElem = document.createElement("i");
    spanElem.innerText = "";
    spanElem.className = "fa-solid fa-trash-can";
    spanElem.addEventListener("click", deleteItem, false);
    let tdElem4 = document.createElement("td");
    tdElem4.appendChild(spanElem);
    trElem.appendChild(tdElem4);

    function deleteItem() {
      trElem.remove();
    }

    function done() {
      trElem.classList.toggle("strike");
    }
  }
  function filterEntries() {
    let rows = document.getElementsByTagName("tr");

    Array.from(rows).forEach((row, index) => {
      if (index == 0) {
        return;
      }
      let category = row.getElementsByTagName("td")[2].innerText;
      if (category == selectElem.value) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
}
