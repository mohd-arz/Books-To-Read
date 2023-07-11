let myLibarary=(JSON.parse(localStorage.getItem('localArr'))==null) ? []:(JSON.parse(localStorage.getItem('localArr'))); 


//Getting necessary ELEMENTS.
const bookName=document.querySelector('#book-name');
const authorName=document.querySelector('#author-name');
const bookPages=document.querySelector('#book-pages');
const addBookBtn=document.querySelector('.add-btn');
const displayContainer=document.querySelector('.display-container');

const preview=document.querySelector('.preview');

function Book(title,author,pages){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=false;
}

// I wasn't working at the end like I intended.
// Book.prototype.readStatusToggle=function(){
//     this.read=true ? this.read==false : true;
// }


addBookBtn.addEventListener('click',()=>{
    if(bookName.value!="" && bookPages.value !="" && authorName.value!=""){
        addBookToLibarary()
    }else{
        if(bookName.value==''){
            bookName.classList.add('invalid')
        }
        if(authorName.value==''){
            authorName.classList.add('invalid')
        }
        if(bookPages.value==''){
            bookPages.classList.add('invalid')
        }
    }
});


//Adding Book into the Libarary Function...
function addBookToLibarary(){

    myLibarary.push(new Book(`${bookName.value}`,`${authorName.value}`, `${bookPages.value}`));

    clearingInput();  //For Clearing the input fields
    let lastAddedIndex=myLibarary.length-1; //Getting the last index
    displayfn(lastAddedIndex);  //Calling Displaying fn for each Book.

    localStorage.setItem('localArr',JSON.stringify(myLibarary)); //Updating localStorage//

    if(myLibarary.length!=0){
        preview.style.cssText="display:none";
    displayContainer.style.cssText="overflow-y: scroll ;"
    }

}

//For clearing up the INPUT Field...
function clearingInput(){
    bookName.value='';
    authorName.value='';
    bookPages.value='';
}

//Displaying Content
function displayfn(index){

    // Creating necessary ELEMENTS for Display Purpose.
    let bookItem=document.createElement('div');
    let bookInfoContainer=document.createElement('div');
    let bookButtonContainer=document.createElement('div');
    let bookTitle=document.createElement('p');
    let bookAuthor=document.createElement('p');
    let bookPages=document.createElement('p');
    let removeBtn=document.createElement('button')
    let readStatusBtn=document.createElement('button')


    //Setting the text for the Button.
    removeBtn.textContent="Remove";

    //Setting data- for removing purpose.
    bookItem.dataset.bookDetail=`${myLibarary[index].title}`

    //Displaying the Content into the ELEMENT.
    bookTitle.textContent=`TITLE : ${myLibarary[index].title} `;
    bookAuthor.textContent=`AUTHOR : ${myLibarary[index].author}`
    bookPages.textContent=`PAGES : ${myLibarary[index].pages}`


    //Appending it to BookItem
    // bookItem.append(bookTitle);
    // bookItem.append(bookAuthor);
    // bookItem.append(bookPages);

    bookInfoContainer.append(bookTitle);
    bookInfoContainer.append(bookAuthor);
    bookInfoContainer.append(bookPages);


    // bookItem.append(removeBtn);
    // bookItem.append(readStatusBtn);

    bookButtonContainer.append(readStatusBtn);
    bookButtonContainer.append(removeBtn);


    bookInfoContainer.classList.add('bookInfoContainer');
    bookButtonContainer.classList.add('bookButtonContainer');
    bookItem.append(bookInfoContainer);
    bookItem.append(bookButtonContainer);

    //Appending the BookItem into displayContainer
    displayContainer.appendChild(bookItem);
    bookItem.classList.add('bookItem');

    //For removing an Item
    removeBtn.addEventListener('click',()=>{
        removeBook(bookItem); 
    })

    //For ReadStatus of an Item
    readStatusBtn.addEventListener(('click'),()=>{
       readStatus(readStatusBtn,bookItem,index)
    })

    readStatusUpdate(readStatusBtn,bookItem,index);
}

//removing Function
function removeBook(bookItem){

    let removing=bookItem.dataset.bookDetail;
        //Getting each book from library and removing the corresponding one
        myLibarary.forEach((book)=>{
            if(book.title==removing){
                myLibarary.splice(myLibarary.indexOf(book),1)
                return;
            }
        })
        localStorage.setItem('localArr',JSON.stringify(myLibarary)); //Updating localStorage//
    
    //Removing the corresponding ELEMENT from DOM 
    displayContainer.removeChild(bookItem);

    if(myLibarary.length==0){
        preview.style.cssText="display:block";
        displayContainer.style.cssText="overflow: visible ;"
    }
}

//readStatus fn to toggle .read property.
function readStatus(readStatusBtn,bookItem,index){
    while(myLibarary[index]==undefined){
        index--;
    }
    myLibarary[index].read=true ? myLibarary[index].read==false : true;
    readStatusUpdate(readStatusBtn,bookItem,index);
    localStorage.setItem(('localArr'),JSON.stringify(myLibarary));  //Updating localStorage//
}


//readStatus Updation....
function readStatusUpdate(readStatusBtn,bookItem,index){
    if(myLibarary[index].read==true){
        bookItem.classList.add('readIndicate');
        readStatusBtn.textContent="Not Read"
    }else{
    bookItem.classList.remove('readIndicate');
    readStatusBtn.textContent="Read"
    }
}

//Displaying the content in the localStorage while loaded..
function localStorageDisp(){
    if(localStorage.length!=0){
        for(let i=0;i<myLibarary.length;i++){
            displayfn(i); //for displaying one by one
        }
    } 
}

localStorageDisp(); 

if(myLibarary.length!=0){
    preview.style.cssText="display:none";
    displayContainer.style.cssText="overflow-y: scroll ;"
}
