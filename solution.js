function solve() {

    let lettersObject = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, 
        l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, 
        u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
    };

    let lettersObjLenght = Object.keys(lettersObject).length;
    
    createLettersList();
    clearText();
    checkedCheckBoxes();

    document.querySelector('button').addEventListener('click', insertNameInTable);
   
    function checkedCheckBoxes() {
        
        let checkBoxes = document.querySelectorAll('li input');

        for (let b = 0; b < lettersObjLenght; b++) {
            let checkBoxEl = checkBoxes[b];

            checkBoxEl.addEventListener('change', checkBoxWork);
        }
    }

    function checkBoxWork(){

        let currentLi = window.event.currentTarget.parentElement;
        let checkbox = window.event.currentTarget;
        let spanEl = currentLi.querySelector('span');

        if (checkbox.checked) {
            let localStorageValue = window.localStorage.getItem(checkbox.id);
            if (currentLi.innerText !== "" && !localStorageValue.includes('+check+')) {
                localStorageValue += '+check+';
                window.localStorage.setItem(checkbox.id, localStorageValue);
            }
            spanEl.style="text-decoration:line-through";

        } else{
            if (currentLi.innerText !== ""){
                localStorageValue = window.localStorage.getItem(checkbox.id);
                localStorageValue = localStorageValue.replace('+check+', '');
                window.localStorage.setItem(checkbox.id, localStorageValue);
            }
                 spanEl.style="text-decoration: none";
        }
    }

    function createLettersList(){

        let olElement = document.querySelector('ol');

        for (let index = 0; index < lettersObjLenght; index++) {

            let localStorageInfo  = window.localStorage; 

            let checkLetter = Object.keys(lettersObject)[index];
            let liElement = document.createElement('li');
            let input = document.createElement('input');
            let p = document.createElement('p');
            p.hidden = true;
            let span = document.createElement('span');
            input.id = `${checkLetter}`;
            input.type="checkbox";
            liElement.id=`${checkLetter}`;
            liElement.append(input);

            if (localStorageInfo[`${checkLetter}`] !== undefined) {
               
                if (localStorageInfo[`${checkLetter}`].includes("+check+")) {
                   
                       span.style="text-decoration:line-through";
                       input.checked = "true";
                       span.innerText = localStorageInfo[`${checkLetter}`].replace("+check+", "");
                } else{
                    span.innerText = localStorageInfo[`${checkLetter}`];
                }
                p.hidden = false;
              }

            liElement.append(span);
            p.id = `${checkLetter}`;
            p.classList="thin-red-border";
            p.innerText = "Clear Text";
            olElement.appendChild(liElement);
            olElement.appendChild(p);
        }
    }
    
    function clearText() {
        for (let a = 0; a < lettersObjLenght; a++) {

            let currentLiEl = document.querySelector(`li[id="${Object.keys(lettersObject)[a]}"]`);

            document.querySelector(`p[id="${Object.keys(lettersObject)[a]}"]`).addEventListener('click', () => {
                currentLiEl.querySelector('span').innerText = '';
                currentLiEl.querySelector('span').style="text-decoration: none";
                currentLiEl.querySelector('input').checked = false;
                window.localStorage.removeItem(Object.keys(lettersObject)[a]);
                document.querySelector(`p[id="${currentLiEl.id}"]`).hidden = true;
            });

        }
    }

    function insertNameInTable(){
       
        let insertData = document.getElementsByTagName('input')[0].value;
        
        if (insertData !== undefined && insertData !== "") {

            let correctLiEl = document.getElementById(`${insertData[0]}`);

            if (correctLiEl.querySelector('span').innerText !== '') {
                correctLiEl.querySelector('span').innerText += `, ${insertData}`;
            } else{
                correctLiEl.querySelector('span').innerText += insertData;
            }
            document.querySelector(`p[id="${insertData[0]}"]`).hidden = false;
            
            document.querySelector(`input[id="${insertData[0]}"]`).checked ? 
            window.localStorage.setItem(insertData[0], correctLiEl.querySelector('span').innerText + '+check+'):
            window.localStorage.setItem(insertData[0], correctLiEl.querySelector('span').innerText);
        }
            
        document.getElementsByTagName('input')[0].value ='';
    }
}