document.getElementById('button1').addEventListener('click', function () {
    window.open("https://www.linkedin.com/in/shruti-kishore-ba474222a", "_blank");
});

const form = document.getElementById('Book-Search-Form');
form.addEventListener('submit', async function (event) {
    // Prevent the form from actually submitting and refreshing the page
    event.preventDefault();
    const nameInputValue = document.getElementById('nameInput').value;

    try {
        const response = await fetch('/get-books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                nameInput: nameInputValue
            })
        });

        const data = await response.json();
        const books=data.recommendations;
        // Clear previous results
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        // Create a card for each book
        books.forEach(book => {
            // Create card elements
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <img src="${book.image}" alt="${book.book_name} cover">
            <h3>${book.book_name}</h3>
            <p>Author: "By ${book.author}"</p>
            `;
            resultsDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}
);