//Selectors
const app = document.querySelector("#app");
const textInput = document.querySelector("#textInput");
//const checkAll = document.querySelector("#checkAll")
const addBtn = document.querySelector("#addBtn");
const listGroup = document.querySelector("#listGroup");
const doneCount = document.querySelector("#doneCount");
const totalCount = document.querySelector("#totalCount");
const listTempLate = document.querySelector("#listTempLate")

//Function

const updateCounter = () => {
  totalCount.innerText = countListTotal();
  doneCount.innerText = countDoneListTotal();
};

const countListTotal = () => {
  return document.querySelectorAll(".list ").length;
};

const countDoneListTotal = () => {
  return document.querySelectorAll(".list .list-checkbox:checked").length;
};

const createList = (text) => {
  const list = listTempLate.content.cloneNode(true)
  const listText = list.querySelector(".list-text");
  const listDelBtn = list.querySelector(".list-del-btn");
  const listEditBtn = list.querySelector(".list-edit-btn");
  const listCheckBox = list.querySelector(".list-checkbox");
  
  listText.innerText = text;

  // listDelBtn.addEventListener("click", deleteList);
  // listCheckBox.addEventListener("change", checkList);
  // listEditBtn.addEventListener("click", editList);

  // listEditBtn.addEventListener("click", () => {
  //   const input = document.createElement("input");
  //   input.className = "border border-zinc-700 px-2 focus-visible:outline-none ";
  //   input.value = listText.innerText;
  //   listText.after(input);
  //   input.focus();
  //   listText.classList.toggle("hidden");
  //   input.addEventListener("blur", () => {
  //     listText.innerText = input.value;
  //     input.remove();
  //     listText.classList.toggle("hidden");
  //   });
  // });

  // listDelBtn.addEventListener("click", () => {
  //   console.log("del list");
  //   list.remove();
  //   // if(confirm("Are U sure to delete")){
  //   //     list.remove()
  //   // }
  //   confirm("Are U sure to delete") && list.remove();
  //   //totalCount.innerText =  parseInt(totalCount.innerText) - 1
  //   updateCounter();
  // });

  // listCheckBox.addEventListener("click", () => {
  //   console.log("u check");
  //   listText.classList.toggle("line-through");
  //   updateCounter();
  // });

  return list;
};

//Handler

// const handleCheckAll = () => {
//   checkAll.removeEventListener("click",handleCheckAll)
//   console.log("U click all");
// }


const addList = () => {
  console.log("add list fun");

  //add to UI
  listGroup.append(createList(textInput.value));
  updateCounter();

  //totalCount.innerText =  parseInt(totalCount.innerText) + 1

  //clear
  textInput.value = null;
};

const deleteList = (event) => {
  const list = event.target.closest(".list");
  if (confirm("Are U sure to Delete")) {
    list.remove();
    updateCounter();
  }
 
  console.log(list);
  //console.log(event.target);
  //console.log(event.target.parentElement.parentElement.parentElement);

  //console.log("U delete");
};

const checkList = (event) => {
  const listText = event.target.nextElementSibling;
  listText.classList.toggle("line-through");
  updateCounter();
  //console.dir(event.target);
};

const editList = (event) => {
  console.log("U edit");
  const list = event.target.closest(".list");
  const listText = list.querySelector(".list-text");
  const input = document.createElement("input");
  input.className = "border border-zinc-700 px-2 focus-visible:outline-none ";
  input.value = listText.innerText;
  listText.after(input);
  input.focus()

  listText.classList.toggle("hidden");

  input.addEventListener("blur",updateList );
};

const updateList = (event) => {
  console.log("U update");
  const currentValue = event.target.value;
  const list = event.target.closest(".list");
  const listText = list.querySelector(".list-text");

  listText.innerText = currentValue

  event.target.remove()

  listText.classList.toggle("hidden")
  console.log(event.target);
  // () => {
  //   listText.innerText = input.value;
  //   input.remove();
  //   listText.classList.toggle("hidden");
  // }
}

const listGroupHandler = (event) => {
  console.log(event.target);
  if(event.target.classList.contains("list-del-btn")){
    // console.log("U del list");
    deleteList(event)

  }else if(event.target.classList.contains("list-edit-btn")){
    editList(event)
  }
  
}
// Listener

addBtn.addEventListener("click", addList);
textInput.addEventListener(
  "keyup",
  (event) => event.key === "Enter" && addList()
);

listGroup.addEventListener("click",listGroupHandler)
//checkAll.addEventListener("click",handleCheckAll)