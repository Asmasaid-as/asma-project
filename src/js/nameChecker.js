function validateName(name) {

    let names = [
        "John",
        "Jeff",
        "Naruto",
    ]

    if(names.includes(name)) {
        alert("Welcome to the App")
    }
}

export { validateName }