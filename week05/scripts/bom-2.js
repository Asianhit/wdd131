// 1. Fixed variable names to stay consistent
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// 2. Load initial items from LocalStorage (with matching key)
let chaptersArray = getChapterList() || [];

// 3. Render initial chapters on page load (fixed lowercase 'chaptersArray')
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// 4. Main add chapter listener
button.addEventListener("click", function () {
    if (input.value.trim() !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = '';
        input.focus();
    }
});

// 5. Function to display a list item and set up its delete button
function displayList(item) {
    let li = document.createElement('li');
    let deletebutton = document.createElement('button');
    
    li.textContent = item; 
    deletebutton.textContent = '❌';
    deletebutton.classList.add('delete'); 
    
    li.append(deletebutton);
    list.append(li);

    deletebutton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent); 
        input.focus(); 
    });
}

// 6. LocalStorage Helper Functions (consistent key name: 'myFavBOM')
function setChapterList() {
    localStorage.setItem('myFavBOM', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOM'));
}

// 7. Delete chapter function (single definition, updates local storage)
function deleteChapter(chapterText) {
    // Remove the trailing '❌' character from the textContent
    const cleanChapter = chapterText.slice(0, chapterText.length - 1);
    
    // Filter out the deleted chapter from our array
    chaptersArray = chaptersArray.filter(item => item !== cleanChapter);
    
    // Save the updated array back to localStorage
    setChapterList();
}