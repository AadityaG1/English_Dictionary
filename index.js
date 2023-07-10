const inputE1 = document.getElementById("input");
const infotextE1 = document.getElementById("info-text")
const meaningcontainer = document.getElementById("meaning-container");
const titleE1 = document.getElementById("title");
const meaningE1 = document.getElementById("meaning");
const audioE1 = document.getElementById("audio");

async function fetchAPI(word){
    try{
        infotextE1.style.display = "block";
        meaningcontainer.style.display = "none";
        infotextE1.innerText = `Searching the meaning of "${word}"`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json());

        if(result.title)
        {
            titleE1.innerText = word;
            meaningE1.innerText = "N/A";
            audioE1.style.display = "none";
        }
        else{
            audioE1.style.display = "inline-center";
            titleE1.innerText = word;
            meaningE1.innerText = result[0].meanings[0].definitions[0].definition;
            
            // let meanings = `
            // `;
            // result[0].meanings.forEach((meaning) => {
            // meanings += `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}\n`;
            // });
            // meaningE1.innerText = meanings;
            
            audioE1.src = result[0].phonetics[0].audio;
        }
        infotextE1.style.display = "none";
        meaningcontainer.style.display = "block";

    } 
    catch(error){
        console.log(error);
        infotextE1.innerText = "An error occured";
    }
}

inputE1.addEventListener("keyup", (e)=>{
    if(e.target.value && e.key === "Enter")
    {
        fetchAPI(e.target.value);
    }
})