let search = document.querySelector(".input");
let button = document.querySelector(".button");
let meanings = document.querySelector('.meaning p')
let example = document.querySelector('.example p')
let example_div = document.querySelector('.example')
let synonyms = document.querySelector('.synonyms p')
let synonyms_div = document.querySelector('.synonyms')
let header = document.querySelector('.header')
let show_content = document.querySelector('.content')
let audio_img = document.querySelector('.audio')

let get_input;
let audio;



async function API(get_input) {
    
    api_path = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${get_input}`)

    return get_api = await api_path.json()

}



async function get_word() {
    const api = await API(get_input)

    
    //search through the audio object if there is a sound for the word
    phonetics = api[0].phonetics

    for (let i = 0; i < phonetics.length; i++) {
        if (phonetics[i].audio ===''){
            
        }
            
        else {
            audio = new Audio(api[0].phonetics[i].audio)
            
        }
    }

    

    //get all the element for the API//


    let example_arr = api[0].meanings[0].definitions[0].example


    try {
        let synonyms_err = api[0].meanings[0].synonyms
        let definitions = api[0].meanings[0].definitions[0].definition
        let partOfSpeech = api[0].meanings[0].partOfSpeech[0]

        // Input word on the webpage //
        header.textContent = get_input
        meanings.textContent = definitions
        example.textContent = example_arr

        //loop through synonyms and get words//
        synonyms_err.forEach((element, index) => {

            if (index <= 5)
                synonyms.textContent = element + ", "
        });

        // display the Meaning , Example and Synonyms when search 
        show_content.classList.add("show-content")

    }
    catch (error) {
        header.style.width = 180 + "px"
        header.textContent = "No Definitions Found"
        console.log("No word found")
    }


    if (api[0].meanings[0].definitions[0].example !== undefined) {

        example_div.style.display = 'block'
    }
    else {
        example_div.style.display = 'none'
    }

    if (api[0].meanings[0].definitions[0].synonyms[0] == undefined) {

        synonyms_div.style.display = 'none'
    }
    else {
        synonyms_div.style.display = 'block'
    }

    return api

}


button.addEventListener("click", () => {
    get_input = search.value

    get_word()
   
})


window.addEventListener('keydown', (keyboard) => {
    get_input = search.value
    if (get_input) {
        if (keyboard.key === 'Enter') {

            get_word()
               
        }
    }

})

audio_img.addEventListener("click", () => {

    audio.play()
})

