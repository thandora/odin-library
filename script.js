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
const bookshelf = document.querySelector(".bookshelf>.books");
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

function createBookElement(book) {
  const article = document.createElement("article");
  article.className = "book";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "author";
  author.textContent = book.author;

  const pages = document.createElement("p");
  pages.class = "pages";
  let pageCount = book.pages ? book.pages : "N/A";
  pages.textContent = `Pages: ${pageCount}`;

  const read = document.createElement("input");
  read.setAttribute("type", "checkbox");
  read.checked = book.read;

  const pageRead = document.createElement("p");
  pageRead.textContent = "Have Read: ";
  pageRead.appendChild(read);

  // Assemble
  article.appendChild(title);
  article.appendChild(author);
  article.appendChild(pages);
  article.appendChild(pageRead);
  bookshelf.appendChild(article);
}

btnAddConfirm.addEventListener("click", () => {
  if (validateInputs(bookForm)) {
    let title = bookForm.elements["title"].value;
    let author = bookForm.elements["author"].value;
    let pages = bookForm.elements["pages"].value;
    let read = bookForm.elements["read"].checked;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    createBookElement(book);
    bookForm.reset();
    formClose();
  }
});

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

btnAdd.addEventListener("click", formOpen);
btnCancel.addEventListener("click", formClose);
