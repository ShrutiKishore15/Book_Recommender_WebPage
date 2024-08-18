document.getElementById('button1').addEventListener('click', function() {
    window.open("https://www.linkedin.com/in/shruti-kishore-ba474222a", "_blank");
});
document.getElementById('Recommend-Books-Page').addEventListener('click', function() {
    window.location.href = "recommend.html";
});
async function fetchBooks() {
    try {
        const response = await fetch('/api/books');
        const data = await response.json();
        const cardContainer = document.getElementById('card-container');

        data.book_name.forEach((bookName, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${data.image[index]}" alt="${bookName}">
                <h3>${bookName}</h3>
                <p>Author: ${data.author[index]}</p>
                <p>Votes: ${data.votes[index]}</p>
                <p>Rating: ${data.rating[index]}</p>
            `;

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Fetch books on page load
fetchBooks();
