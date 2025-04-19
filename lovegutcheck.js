document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded, attaching event listeners...');

    // Verify the start-quiz button exists
    var startButton = document.getElementById('start-quiz');
    if (startButton) {
        console.log('Start button found, attaching click listener...');
        startButton.addEventListener('click', function () {
            console.log('Start button clicked!');
            window.currentQuestion = 0;
            window.scores = { dynamo: 0, wreck: 0, assertive: 0, passive: 0, aggressive: 0, passiveAggressive: 0 };
            var intro = document.getElementById('intro-container');
            var q0 = document.getElementById('q0');
            if (intro) {
                console.log('Hiding intro container...');
                intro.style.display = 'none';
            } else {
                console.log('Intro container not found!');
            }
            if (q0) {
                console.log('Showing first question (q0)...');
                q0.style.display = 'block';
            } else {
                console.log('First question (q0) not found!');
            }
        });
    } else {
        console.log('Start button not found!');
    }

    // Add click listeners to all answer buttons
    document.querySelectorAll('.answer-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            console.log('Answer button clicked, question:', window.currentQuestion);
            // Update scores
            var dynamo = parseInt(this.getAttribute('data-dynamo'));
            var wreck = parseInt(this.getAttribute('data-wreck'));
            window.scores.dynamo += dynamo;
            window.scores.wreck += wreck;

            // Update communication style scores for questions 10 and up (q10-q19 in the full quiz)
            if (window.currentQuestion >= 10) {
                var assertive = parseInt(this.getAttribute('data-assertive') || 0);
                var passive = parseInt(this.getAttribute('data-passive') || 0);
                var aggressive = parseInt(this.getAttribute('data-aggressive') || 0);
                var passiveAggressive = parseInt(this.getAttribute('data-passiveAggressive') || 0);
                window.scores.assertive += assertive;
                window.scores.passive += passive;
                window.scores.aggressive += aggressive;
                window.scores.passiveAggressive += passiveAggressive;
            }

            // Move to next question
            window.currentQuestion++;
            var currentQ = document.getElementById('q' + (window.currentQuestion - 1));
            var nextQ = document.getElementById('q' + window.currentQuestion);
            var scoreContainer = document.getElementById('score-container');
            var scoreText = document.getElementById('score-text');

            setTimeout(function () {
                if (currentQ) {
                    console.log('Hiding current question:', window.currentQuestion - 1);
                    currentQ.style.display = 'none';
                }

                if (window.currentQuestion < 10) {
                    // Show next question
                    if (nextQ) {
                        console.log('Showing next question:', window.currentQuestion);
                        nextQ.style.display = 'block';
                    } else {
                        console.warn('Question ' + window.currentQuestion + ' not found, DOM might not be ready, skipping to score');
                        if (scoreContainer) {
                            console.log('Showing score container...');
                            scoreContainer.style.display = 'block';
                        }
                        if (scoreText) {
                            var datingScore = window.scores.dynamo >= window.scores.wreck ?
                                `Dating Dynamo! (${window.scores.dynamo}/30) You’re slaying the dating game… mostly.` :
                                `Total Wreck! (${window.scores.wreck}/30) Your love life’s a hot mess—time to level up!`;
                            var commScore = Math.max(window.scores.assertive, window.scores.passive, window.scores.aggressive, window.scores.passiveAggressive);
                            var commResult = '';
                            if (commScore === window.scores.assertive) commResult = 'Assertive: You communicate like a boss!';
                            else if (commScore === window.scores.passive) commResult = 'Passive: You’re dodging conflict like a pro.';
                            else if (commScore === window.scores.aggressive) commResult = 'Aggressive: Chill, you’re scaring people!';
                            else commResult = 'Passive-Aggressive: Subtle shade is your superpower.';
                            scoreText.innerHTML = `${datingScore}<br>${commResult}`;
                        }
                    }
                } else {
                    // Show score page
                    if (scoreContainer) {
                        console.log('Showing score container (end of quiz)...');
                        scoreContainer.style.display = 'block';
                    }
                    if (scoreText) {
                        var datingScore = window.scores.dynamo >= window.scores.wreck ?
                            `Dating Dynamo! (${window.scores.dynamo}/30) You’re slaying the dating game… mostly.` :
                            `Total Wreck! (${window.scores.wreck}/30) Your love life’s a hot mess—time to level up!`;
                        var commScore = Math.max(window.scores.assertive, window.scores.passive, window.scores.aggressive, window.scores.passiveAggressive);
                        var commResult = '';
                        if (commScore === window.scores.assertive) commResult = 'Assertive: You communicate like a boss!';
                        else if (commScore === window.scores.passive) commResult = 'Passive: You’re dodging conflict like a pro.';
                        else if (commScore === window.scores.aggressive) commResult = 'Aggressive: Chill, you’re scaring people!';
                        else commResult = 'Passive-Aggressive: Subtle shade is your superpower.';
                        scoreText.innerHTML = `${datingScore}<br>${commResult}`;
                    }
                }
            }, 100);
        });
    });
});
