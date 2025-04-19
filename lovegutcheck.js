document.addEventListener('DOMContentLoaded', function () {
    // Initialize global variables
    window.currentQuestion = 0;
    window.scores = { dynamo: 0, wreck: 0 };

    // Start quiz button
    document.getElementById('start-quiz').addEventListener('click', function () {
        window.currentQuestion = 0;
        window.scores = { dynamo: 0, wreck: 0 };
        var intro = document.getElementById('intro-container');
        var q0 = document.getElementById('q0');
        if (intro) intro.style.display = 'none';
        if (q0) q0.style.display = 'block';
    });

    // Add click listeners to all answer buttons
    document.querySelectorAll('.answer-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            // Update scores
            var dynamo = parseInt(this.getAttribute('data-dynamo'));
            var wreck = parseInt(this.getAttribute('data-wreck'));
            window.scores.dynamo += dynamo;
            window.scores.wreck += wreck;

            // Move to next question
            window.currentQuestion++;
            var currentQ = document.getElementById('q' + (window.currentQuestion - 1));
            var nextQ = document.getElementById('q' + window.currentQuestion);
            var scoreContainer = document.getElementById('score-container');
            var scoreText = document.getElementById('score-text');

            setTimeout(function () {
                if (currentQ) currentQ.style.display = 'none';

                if (window.currentQuestion < 10) {
                    // Show next question
                    if (nextQ) {
                        nextQ.style.display = 'block';
                    } else {
                        console.warn('Question ' + window.currentQuestion + ' not found, DOM might not be ready, skipping to score');
                        if (scoreContainer) scoreContainer.style.display = 'block';
                        if (scoreText) {
                            var datingScore = window.scores.dynamo >= window.scores.wreck ?
                                `Dating Dynamo! (${window.scores.dynamo}/30) You’re slaying the dating game… mostly.` :
                                `Total Wreck! (${window.scores.wreck}/30) Your love life’s a hot mess—time to level up!`;
                            scoreText.innerHTML = datingScore;
                        }
                    }
                } else {
                    // Show score page
                    if (scoreContainer) scoreContainer.style.display = 'block';
                    if (scoreText) {
                        var datingScore = window.scores.dynamo >= window.scores.wreck ?
                            `Dating Dynamo! (${window.scores.dynamo}/30) You’re slaying the dating game… mostly.` :
                            `Total Wreck! (${window.scores.wreck}/30) Your love life’s a hot mess—time to level up!`;
                        scoreText.innerHTML = datingScore;
                    }
                }
            }, 100);
        });
    });
});