document.addEventListener('DOMContentLoaded', (event) => {
    const commentForms = document.querySelectorAll('.comment-form');
    const commentsSections = document.querySelectorAll('.comments-section');

    const loadComments = (recipeId) => {
        const comments = JSON.parse(localStorage.getItem(recipeId + '-comments')) || [];
        const commentsSection = document.querySelector(`.comments-section[data-recipe-id="${recipeId}"]`);
        commentsSection.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p><strong>Rating:</strong> ${comment.rating}</p>
                <p>${comment.text}</p>
            `;
            commentsSection.appendChild(commentDiv);
        });
    };

    commentForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const recipeId = form.getAttribute('data-recipe-id');
            const rating = form.querySelector('select[name="rating"]').value;
            const commentText = form.querySelector('textarea[name="comment"]').value;
            const comments = JSON.parse(localStorage.getItem(recipeId + '-comments')) || [];
            comments.push({ rating, text: commentText });
            localStorage.setItem(recipeId + '-comments', JSON.stringify(comments));
            loadComments(recipeId);
            form.reset();
        });
    });

    commentsSections.forEach(section => {
        const recipeId = section.getAttribute('data-recipe-id');
        loadComments(recipeId);
    });
});
