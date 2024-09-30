// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginMenu = document.getElementById('loginMenu');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const ticketsList = document.getElementById('ticketsList');
    const bookingForm = document.getElementById("booking-form");

    let loggedInUser = localStorage.getItem('loggedInUser');
    const userTickets = JSON.parse(localStorage.getItem('userTickets')) || {};

    function updateLoginMenu() {
        if (loggedInUser) {
            loginMenu.innerHTML = `<a href="#" id="logout" class="animated-link">Logout (${loggedInUser})</a>`;
            displayUserTickets();
        } else {
            loginMenu.innerHTML = `<a href="#" id="openLogin" class="animated-link">Login</a>`;
            ticketsList.innerHTML = `<p>Please log in to see your tickets.</p>`;
        }
    }

    function displayUserTickets() {
        ticketsList.innerHTML = ''; // Clear existing tickets

        if (userTickets[loggedInUser]) {
            userTickets[loggedInUser].forEach(ticket => {
                const ticketDiv = document.createElement('div');
                ticketDiv.classList.add('ticket');
                ticketDiv.innerHTML = `
                    <div class="ticket-header">Flight Details</div>
                    <div class="ticket-details">
                        <p><strong>From:</strong> ${ticket.from}</p>
                        <p><strong>To:</strong> ${ticket.to}</p>
                        <p><strong>Departure:</strong> ${ticket.departure}</p>
                        <p><strong>Return:</strong> ${ticket.return}</p>
                        <p><strong>Passengers:</strong> ${ticket.passengers}</p>
                    </div>
                `;
                ticketsList.appendChild(ticketDiv);
            });
        } else {
            ticketsList.innerHTML = `<p>No tickets booked.</p>`;
        }
    }

    // Flight booking functionality
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let from = document.getElementById("from").value;
        let to = document.getElementById("to").value;
        let departureDate = document.getElementById("departure-date").value;
        let returnDate = document.getElementById("return-date").value || 'One-way';
        let passengers = document.getElementById("passengers").value;

        // Create a ticket object
        const newTicket = {
            from,
            to,
            departure: departureDate,
            return: returnDate,
            passengers
        };

        // Store ticket in localStorage under the user's name
        if (!userTickets[loggedInUser]) {
            userTickets[loggedInUser] = [];
        }
        userTickets[loggedInUser].push(newTicket);
        localStorage.setItem('userTickets', JSON.stringify(userTickets));

        alert(`Flight booked!\n\nFrom: ${from}\nTo: ${to}\nDeparture: ${departureDate}\nReturn: ${returnDate}\nPassengers: ${passengers}`);

        // Display the updated tickets
        displayUserTickets();
    });

    // Open Login Modal
    loginMenu.addEventListener('click', (e) => {
        if (e.target.id === 'openLogin') {
            e.preventDefault();
            loginModal.style.display = 'flex';
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
        } else if (e.target.id === 'logout') {
            // Logout functionality
            localStorage.removeItem('loggedInUser');
            loggedInUser = null;
            updateLoginMenu();
        }
    });

    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('show');
        setTimeout(() => {
            loginModal.style.display = 'none';
        }, 300);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic authentication check (you can replace this with real authentication logic)
        if (username && password) {
            localStorage.setItem('loggedInUser', username);
            loggedInUser = username;
            updateLoginMenu();
            closeModal.click();
        }
    });

    window.onclick = function(event) {
        if (event.target === loginModal) {
            closeModal.click();
        }
    };

    updateLoginMenu(); // Initial call to set up the login menu
});
