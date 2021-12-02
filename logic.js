function submit(){
    var name = document.getElementById("name").value
    var validName = true
    if(name == null){
        alert("Please Enter a name!")
        validName = false
    }
    if(name.length > 255){
        alert("You are only allowed to enter a name with maximum 255 characters length")
        validName = false
    }
    var regex = /^[A-Za-z\s]+$/
    if(!regex.test(name)){
        alert("You are only allowed to enter space and english characters")
        validName = false
    }
    if(validName == true){
        prediction(name)
    }
}

function prediction(name){
    fetch('https://api.genderize.io/?name=' + name)
    .then(Response => Response.json())
    .catch(error => console.error("network error"))
    .then(data =>
        {
            var gender = data["gender"]
            var probability = data["probability"]
            if(gender == null){
                gender = "Sorry! I don't know"
                probability = "-"
            }
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

function clearRecord(){
    var name = document.getElementById("name").value
    localStorage.removeItem(name)
    document.getElementById("SavedAnswer").innerHTML = "not Saved"
    document.getElementById("clear").style.visibility = 'hidden'
    document.getElementById("saved").style.borderColor = 'red'
}

function save(){
    const choices = document.querySelectorAll('input[name="maleFemale"]')
    let choice
    for (const option of choices) {
        if(option.checked){
            choice = option.value
        } 
    }
    var name = document.getElementById("name").value
    if(choice == null){
        alert("Please choose between male or female!")
    }
    localStorage.setItem(name, choice)
    document.getElementById("SavedAnswer").innerHTML = localStorage.getItem(name)
    document.getElementById("clear").style.visibility = 'visible'
    document.getElementById("saved").style.borderColor = 'green'
}

