const form = document.querySelector("form");
const result = document.querySelector(".result");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    getWordInfo(form.elements[0].value)
})

const getWordInfo = async (word) => {

    try {
        result.innerHTML = "Fetching Data...."

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    const data = await response.json();

    console.log(data);

    result.innerHTML = 
    `<h2><strong>Word:</strong> ${data[0].word}</h2>

    <p><strong>Part of Speech:</strong> ${data[0].meanings[0].partOfSpeech}</p>

    <p><strong>Definition:</strong> ${data[0].meanings[0].definitions[0].definition === undefined ? "Not Found" : data[0].meanings[0].definitions[0].definition}</p>
    <p><strong>Synonyms:</strong></p>
    `;

    if(data[0].meanings[0].synonyms.length === 0) {
        result.innerHTML += `<p>Not Found <p>`
    } else {
        for(let i = 0; i < data[0].meanings[0].synonyms.length; i++){
            result.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>` 
        }
    }

    result.innerHTML += `<div><a href ="${data[0].sourceUrls}" target="-blank">Read More </a> </div>`;

} 
catch (error) {
      result.innerHTML = "<p>Sorry, Word not found</p>"  
}

}