function postQuote(){
    const form=document.getElementById("postForm")
    const author=document.getElementById("author").value
    const quote=document.getElementById("quote").value
    
    
    form.addEventListener("submit",(event) =>{
        event.preventDefault()
        fetch("http://localhost:3000/quotes",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                author:author,
                quote:quote
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            alert("Quote has been added successfully")
        })
    })
}

const postButton =document.getElementById("postButton")
postButton.addEventListener("click",postQuote)

function getQuotes(){
  fetch("http://localhost:3000/quotes")
  .then(resp =>resp.json())
  .then(data=>displayQuotes(data))
}



function displayQuotes(quotes){

    const container=document.getElementById("quotesContainer")
   quotes.forEach(quote =>{
        const card =document.createElement("div")
        card.innerHTML=` 
         <h2>${quote.quote}</h2>
         <button id="view_${quote.id}">View Quote</button>
         <button id="update_${quote.id}">Update Quote</button>
         <button id="delete_${quote.id}">Delete Quote</button>
        `
        container.appendChild(card)

        let id=quote.id
        //view button on the quote
       document.getElementById(`view_${quote.id}`).addEventListener ("click",()=>getOneQuote(id))

       //update button on the quote

       const updateButton=document.getElementById(`update_${quote.id}`)

       updateButton.addEventListener("click",()=>{
        //show update form when update quote button is clicked
        updateForm.style.display="block"
            //Get updateButton from the update form and attach event listener

            const updateFormButton=document.getElementById("updateButton")

            updateFormButton.addEventListener("click",()=>updateQuote(id))

           
            


       })
            //Delete button to bea able to delete a quote
            const deleteButton=document.getElementById(`delete_${quote.id}`)

            deleteButton.addEventListener("click",()=>deleteQuote(id))
    })  

}

getQuotes()

function getOneQuote(id){
    fetch(`http://localhost:3000/quotes/${id}`)
    .then(resp =>resp.json())
    .then(data =>{
        const container=document.getElementById("oneQuoteContainer")

        container.innerHTML=`
        <h1>${data.quote}</h1>
        <h4>${data.author}</h4>
        `
    })
}

const updateForm=document.getElementById("updateData")
updateForm.style.display="none"

function updateQuote(id){
    updateForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        const updatedAuthor=document.getElementById("updateAuthor").value
        const updatedQuote=document.getElementById("updateQuote").value


        fetch(`http://localhost:3000/quotes/${id}`,{

        //if the method is changed toPATCH and the body to have only one key
        //it will work as patch is used to update only one key of an object
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                quote:updatedQuote,
                author:updatedAuthor
            })
        })
        .then(response =>response.json())
        .then(data=>console.log(data))

    } )
}

function deleteQuote(id){
    fetch(`http://localhost:3000/quotes/${id}`,{
        method:"DELETE"
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
}