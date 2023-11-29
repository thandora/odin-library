const myLibrary = [];
let booksAdded = myLibrary.length;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  if (booksAdded === 0) {
    index = 0;
  } else {
    index = myLibrary.at(-1).index + 1;
  }

  this.index = index;
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

function createBookNode(book) {
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

  return article;
}

function addRemoveBookButton(bookNode, book) {
  const btn = createRemoveButton("btn-remove-book");
  bindDelete(btn, book, bookNode);
  bookNode.appendChild(btn);
}

function createRemoveButton(className) {
  const btn = document.createElement("button");
  btn.textContent = "Remove Book";
  btn.className = className;
  return btn;
}

function bindDelete(button, book, bookNode) {
  button.addEventListener("click", () => {
    bookshelf.removeChild(bookNode);
    const index = myLibrary.findIndex((b) => {
      return b === book;
    });

    myLibrary.splice(index, 1);
  });
}

function addNodeToShelf(bookNode) {
  if (bookNode) {
    bookshelf.appendChild(bookNode);
    return 1;
  }
  return 0;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  booksAdded++;
}

btnAddConfirm.addEventListener("click", () => {
  if (validateInputs(bookForm)) {
    let title = bookForm.elements["title"].value;
    let author = bookForm.elements["author"].value;
    let pages = bookForm.elements["pages"].value;
    let read = bookForm.elements["read"].checked;

    const book = new Book(title, author, pages, read);
    const bookNode = createBookNode(book);

    addBookToLibrary(book);
    addRemoveBookButton(bookNode);
    addNodeToShelf(bookNode);
  }
});

bookForm.addEventListener("submit", () => {
  bookForm.reset();
  formClose();
});

btnAdd.addEventListener("click", formOpen);
btnCancel.addEventListener("click", formClose);
