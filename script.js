todoMain();

function todoMain() {
  const DEFAULT_OPTION = "Choose the category";

  let inputElem,
    inputElem2,
    button,
    selectElem,
    todoList = [];

  getElements();
  addListeners();
  load();
  renderRows();

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

    renderRow(inputValue, inputValue2);

    todoList.push(inputValue);

    save();

    updateSelectOptions();
  }

  function filterEntries() {
    let selection = selectElem.value;

    if (selection == DEFAULT_OPTION) {
      let rows = document.getElementsByTagName("tr");

      Array.from(rows).forEach((row, index) => {
        row.style.display = "";
      });
    } else {
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

  function updateSelectOptions() {
    let options = [];

    let rows = document.getElementsByTagName("tr");

    Array.from(rows).forEach((row, index) => {
      if (index == 0) {
        return;
      }

      let category = row.getElementsByTagName("td")[2].innerText;

      options.push(category);
    });

    let optionSet = new Set(options);

    selectElem.innerHTML = "";

    let newOptionElem = document.createElement("option");
    newOptionElem.value = DEFAULT_OPTION;
    newOptionElem.innerText = DEFAULT_OPTION;
    selectElem.appendChild(newOptionElem);

    for (let option of optionSet) {
      let newOptionElem = document.createElement("option");
      newOptionElem.value = option;
      newOptionElem.innerText = option;
      selectElem.appendChild(newOptionElem);
    }
  }

  function save() {
    let stringified = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringified);
  }

  function load() {
    let retrieved = localStorage.getItem("todoList");
    todoList = JSON.parse(retrieved)
    if (todoList == null) {
      todoList = [];
    }
  }

  function renderRows() {
    todoList.forEach((todo) => {
      renderRow(todo, null);
    });
  }

  function renderRow(inputValue, inputValue2) {
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
      updateSelectOptions();
    }

    function done() {
      trElem.classList.toggle("strike");
    }
  }
}
