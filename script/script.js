


async function volunteer() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let avail = document.getElementById('availability');
    let why = document.getElementById('why');

    let name_value = name.value.trim();
    let email_value = email.value.trim();
    let phone_value = phone.value.trim();   
    let avail_value = avail.value.trim();
    let why_value = why.value.trim();

    if (!name_value) return alert("Enter a valid name!");
    if (!email_value) return alert("Enter a valid email!");
    if (!phone_value || phone_value.length < 10) return alert("Enter a valid Phone Number!");
    if (!avail_value) return alert("Enter Your Availability!");

    let data = {
        name: name_value,
        email: email_value,
        phone: phone_value,
        availability: avail_value,
        why: why_value
    };

    try {
        let res = await fetch("http://localhost:5000/api/volunteer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result = await res.json();

        if (res.ok) {
            // Clear fields
            name.value = "";
            email.value = "";
            phone.value = "";
            avail.value = "";
            why.value = "";

            alert("Volunteer data saved!");
        } else {
            alert(result.message || "Something went wrong");
        }
    } catch (err) {
        console.error(err);
        alert("Error: Could not connect to server");
    }
}












window.onload = async function () {
    try {
        let res = await fetch("http://localhost:5000/api/donors");
        let donors = await res.json();

        if (Array.isArray(donors)) {
            donors.forEach(donor => {
                addDonorToUI(donor.id, donor.name, donor.amount);
                user = donor.id + 1; // keep counter in sync
            });
        }
    } catch (err) {
        console.error("Error loading donors:", err);
    }
};


function addDonorToUI(id, name, amount) {
    let divlist = document.createElement("div");
    divlist.classList.add("List");

    let h4 = document.createElement("h4");
    h4.innerText = `${id}. ${name} donated ₹${amount}`;

    divlist.appendChild(h4);
    document.getElementById("donate-list").appendChild(divlist);
}


async function donater() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let amount = document.getElementById("amount");

    let name_value = name.value.trim();
    let email_value = email.value.trim();
    let amount_value = amount.value.trim();

    if (!name_value) return alert("Enter a valid name!");
    if (!email_value) return alert("Enter a valid email!");
    if (!amount_value || amount_value <= 0) return alert("Enter a valid amount!");

    let data = {
        name: name_value,
        email: email_value,
        amount: amount_value
    };

    try {
        let res = await fetch("http://localhost:5000/api/donate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result = await res.json();

        if (res.ok) {
            addDonorToUI(user, name_value, amount_value);
            user++;

            name.value = "";
            email.value = "";
            amount.value = "";

            alert("Donation saved!");
        } else {
            alert(result.message || "Something went wrong");
        }
    } catch (err) {
        console.error(err);
        alert("Error: Could not connect to server");
    }
}
