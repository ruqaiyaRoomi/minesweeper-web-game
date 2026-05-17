document.addEventListener("DOMContentLoaded", () => {
    const leaderboardTableBody = document.getElementById('leaderboardBody');
    const levelSelector = document.getElementById('level');  // Select level dropdown
    const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Function to populate leaderboard based on selected level
    function populateLeaderboard(level) {
        // Filter scores based on selected level
        const filteredScores = scores.filter(score => score.level === level)
                                      .sort((a, b) => a.time - b.time); // Sort by time

        leaderboardTableBody.innerHTML = ''; // Clear table body

        // Fill leaderboard with top 10 scores for the selected level
        for (let i = 0; i < 10; i++) {
            const row = leaderboardTableBody.insertRow();
            if (filteredScores[i]) {
                row.insertCell(0).textContent = i + 1; // Rank
                row.insertCell(1).textContent = filteredScores[i].username; // Username
                row.insertCell(2).textContent = filteredScores[i].level; // Level
                row.insertCell(3).textContent = `${filteredScores[i].time}:00`; // Total Time
            } else {
                row.insertCell(0).textContent = i + 1;
                row.insertCell(1).textContent = "";
                row.insertCell(2).textContent = "";
                row.insertCell(3).textContent = "";
            }
        }
    }

    // Populate leaderboard when a level is selected
    levelSelector.addEventListener("change", () => {
        const selectedLevel = levelSelector.value;
        populateLeaderboard(selectedLevel);
    });

    // Populate leaderboard with the default selected level on page load
    populateLeaderboard(levelSelector.value);
});

// c
const loggedIn = localStorage.getItem('loggedIn') === 'true';
function signout(){
    
    if (!loggedIn) {
        alert("You are already logged out.");
        return; 
    }

    localStorage.setItem('loggedIn', 'false');
    alert("Signed out successfully");
}



