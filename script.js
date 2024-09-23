document.getElementById("booking-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let departureDate = document.getElementById("departure-date").value;
    let returnDate = document.getElementById("return-date").value || 'One-way';
    let passengers = document.getElementById("passengers").value;

    alert(`Flight booked!\n\nFrom: ${from}\nTo: ${to}\nDeparture: ${departureDate}\nReturn: ${returnDate}\nPassengers: ${passengers}`);
});
