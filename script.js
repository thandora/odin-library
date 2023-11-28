const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

const dialog = document.querySelector("dialog");
const btnAdd = document.querySelector(".btn-add-book");
const btnCancel = document.querySelector(".btn-cancel");

function formClose() {
  dialog.close();
}

function formOpen() {
  dialog.showModal();
}

btnAdd.addEventListener("click", formOpen);
btnCancel.addEventListener("click", formClose);
