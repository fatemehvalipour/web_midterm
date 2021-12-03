// function that is called when user clicks on submit button - if entered name is valid, the name would be sent to url
function submit(){
    // get name from textbox
    var name = document.getElementById("name").value
    var validName = true
    // check if the box is empty or not 
    if(name == null){
        alert("Please Enter a name!")
        validName = false
    }
    // check if the text is loger than 255 characters or not 
    if(name.length > 255){
        alert("You are only allowed to enter a name with maximum 255 characters length")
        validName = false
    }
    //check if text contains english characters and numbers or not
    var regex = /^[A-Za-z\s]+$/
    if(!regex.test(name)){
        alert("You are only allowed to enter space and english characters")
        validName = false
    }
    // if name is valid, the request will be sent to the given server
    if(validName == true){
        prediction(name)
    }
}

// sends request and shows response in prediction section 
function prediction(name){
    // fetch the request 
    fetch('https://api.genderize.io/?name=' + name)
    .then(Response => Response.json())
    .catch(error => 
        {
            document.getElementById("gender").innerHTML = "Network Error"
            document.getElementById("probability").innerHTML = "Network Error"
        })
    .then(data =>
        {
            // set variables from the response
            var gender = data["gender"]
            var probability = data["probability"]
            if(gender == null){
                gender = "Sorry! I don't know"
                probability = "-"
            }
            // put the variables in right place of the box
            document.getElementById("gender").innerHTML = gender
            document.getElementById("probability").innerHTML = probability
            // if we have the name in localStorage
            if(localStorage.getItem(name) != null){
                document.getElementById("SavedAnswer").innerHTML = localStorage.getItem(name)
                document.getElementById("clear").style.visibility = 'visible'
                document.getElementById("saved").style.borderColor = 'green'

            } else{ // if we don't have the name in localStorage
                document.getElementById("SavedAnswer").innerHTML = "not Saved"
                document.getElementById("clear").style.visibility = 'hidden'
                document.getElementById("saved").style.borderColor = 'red'

            }
        })
}

// called when user clicks on clear button 
function clearRecord(){
    // removes name in localStorage and changes the text to "not saved" and the box becomes red
    var name = document.getElementById("name").value
    localStorage.removeItem(name)
    document.getElementById("SavedAnswer").innerHTML = "not Saved"
    document.getElementById("clear").style.visibility = 'hidden'
    document.getElementById("saved").style.borderColor = 'red'
}

// called when user clicks on save button
function save(){
    // retrievs user choice between radioButton options
    const choices = document.querySelectorAll('input[name="maleFemale"]')
    let choice
    for (const option of choices) {
        if(option.checked){
            choice = option.value
        } 
    }
    // retrieve name from text box and checks if radioButton is null or not 
    var name = document.getElementById("name").value
    if(choice == null){
        alert("Please choose between male or female!")
    }
    // saves name into localStorage and changes the design of the box
    localStorage.setItem(name, choice)
    document.getElementById("SavedAnswer").innerHTML = localStorage.getItem(name)
    document.getElementById("clear").style.visibility = 'visible'
    document.getElementById("saved").style.borderColor = 'green'
}

