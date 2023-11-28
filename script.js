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

const bookForm = document.querySelector("form");
const dialog = document.querySelector("dialog");

const btnAdd = document.querySelector(".btn-add-book");
const btnAddConfirm = document.querySelector("#btn-add-confirm");
const btnCancel = document.querySelector(".btn-cancel");

// Helper functions
function formOpen() {
  dialog.showModal();
}

function formClose() {
  dialog.close();
}

function validateInputs(form) {
  // Validates all input from `form` that has the `required` attribute.
  // Returns a `true` if all valid, `false` otherwise.

  // This is not best practice; implement server-side validation for
  // more serious projects.

  // Convert nodelist to array to allow .every() method
  const requiredFields = Array.from(form.querySelectorAll("input[required]"));

  return requiredFields.every((x) => {
    return x.checkValidity();
  });
}

btnAddConfirm.addEventListener("click", () => {
  if (validateInputs(bookForm)) {
    let title = bookForm.elements["title"].value;
    let author = bookForm.elements["author"].value;
    let pages = bookForm.elements["pages"].value;
    let read = bookForm.elements["read"].checked;

    console.log(title, author, pages, read);
  }
});

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

btnAdd.addEventListener("click", formOpen);
btnCancel.addEventListener("click", formClose);
