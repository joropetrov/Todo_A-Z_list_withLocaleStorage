function solve() {

    let lettersObject = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, 
        l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, 
        u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
    };

    let lettersObjLenght = Object.keys(lettersObject).length;
    
    createLettersList();
    clearTextButtonListener();
    checkBoxListener();

    document.querySelector('button').addEventListener('click', insertNameInTable);
   
    function checkBoxListener() {
        
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

    function createLettersList() {

        let olElement = document.querySelector('ol');

        for (let index = 0; index < lettersObjLenght; index++) {

            const localStorageInfo = window.localStorage;
            let checkLetter = Object.keys(lettersObject)[index];
            let checkedInput = "";
            let spanStyle = "text-decoration: none";
            let spanInnerText = "";
            let hidden = "hidden";

            if (localStorageInfo[`${checkLetter}`] !== undefined) {

                if (localStorageInfo[`${checkLetter}`].includes("+check+")) {

                    spanStyle = "text-decoration:line-through";
                    checkedInput = 'checked';
                    spanInnerText = localStorageInfo[`${checkLetter}`].replace("+check+", "");
                } else {

                    spanInnerText = localStorageInfo[`${checkLetter}`];
                }
                hidden = "";
            }

            const listHtml = document.createElement('div');
            listHtml.innerHTML = `
            <li id="${checkLetter}">
                <input id="${checkLetter}" type="checkbox" ${checkedInput}></p>
                <span style="${spanStyle}">${spanInnerText}</span>
              </li>
              <p ${hidden} id="${checkLetter}" class="thin-red-border">Clear Text</p>`;

            olElement.append(listHtml);
        }
    }
    
    function clearTextButtonListener() {
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