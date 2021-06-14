// console.log('hello')
showNotes();

// Added notes would be save in local storgae

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    // At this point we take the text box by its id and also get items which is fill in the text box since notes is its ID
    let addTitle = document.getElementById('addTitle');

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');

    // Then we make a statment is if the notes is empty or not

    if (notes == null) {

        // notesObj is a new variable in which we will save the notes which is filled by the user in local storage

        notesObj = [];
    }
    else {

        notesObj = JSON.parse(notes);
    }

    // At this point we push the value of text box in the notesObj and then we make text.value null because after filling the text box became empty.
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();

});

// Now we will define the function by whenever we add a note it will add a card with the notes display in it.
function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {

        // hrml += means html = html+anything 
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
        ;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = ` <h8> No notes are present ! , click on "add note"</h8>`;

    }
}

// Function to Delete a node 
function deleteNote(index) {

    // console.log("I'm deleting", index)
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}
// This part is for search option where we can search any thing from notes by typing some keywords from that particular note.
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let searchVal = search.value.toLowerCase();
    // console.log('Input fired!' , searchVal)

    // The input of search boc is save in noteCard variable.
    let noteCard = document.getElementsByClassName('noteCard');

    // This forEach loop will look at every note to give the output note which is been searched.

    Array.from(noteCard).forEach(function (element) {

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(searchVal)) {

            // Style display property is used to hide and show the content of HTML DOM by accessing the DOM element using JavaScript/jQuery. To hide an element, set the style display property to “none”. ... To show an element, set the style display property to “block”.  

            element.style.display = 'block';

        }
        else {
            element.style.display = 'none';

        }

    })

});

