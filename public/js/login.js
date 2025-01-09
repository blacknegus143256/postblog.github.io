form.addEventListener("submit" ,async (event)=>{
    event.preventDefault();
    const login = {
        username: username.value,
        password: password.value
    }
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if (data.status === "error") {
            document.getElementById("error").style.display = "block";
            document.getElementById("error").innerText = data.error;
            document.getElementById("success").style.display = "none";
        } else {
            document.getElementById("error").style.display = "none";
            document.getElementById("success").style.display = "block";
            document.getElementById("success").innerText = data.success;
            // Redirect after a successful login
            window.location.href = data.redirect;
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
    
})