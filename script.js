// script.js

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const satisfaction = document.querySelector('input[name="satisfaction"]:checked');
    const comments = document.getElementById('comments').value;

    if (!satisfaction) {
        alert('Please select your satisfaction level.');
        return;
    }

    const feedback = {
        satisfaction: satisfaction.value,
        comments: comments
    };

    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
    
    // Reset the form
    event.target.reset();
});
