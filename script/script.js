function calculate() {
    var val1 = document.getElementById('val1').value;
    var val2 = document.getElementById('val2').value;

    if(val1 === '' || val2 === ''){
        document.getElementById('distance').innerHTML = '';
        document.getElementById('holeSize').innerHTML = '';
        return;
    }

    try {
        var a = Math.abs(parseFloat(val1));
        var b = Math.abs(parseFloat(val2));

        if(isNaN(a) || isNaN(b)) {
            document.getElementById('distance').innerHTML = '';
            document.getElementById('holeSize').innerHTML = '';
            return;
        }

        var mn = Math.min(a, b);
        var mx = Math.max(a, b);
        var holeSize = (mx - mn) / 2;
        var distance = holeSize + mn;

        document.getElementById('distance').innerHTML = 'Відстань між центрами: ' + distance;
        document.getElementById('holeSize').innerHTML = 'Діаметр отвору: ' + holeSize;
    } catch(err) {
        document.getElementById('distance').innerHTML = '';
        document.getElementById('holeSize').innerHTML = '';
    }
}

document.getElementById('val1').addEventListener('input', calculate);
document.getElementById('val2').addEventListener('input', calculate);

document.getElementById('reset').addEventListener('click', resetForm);

function resetForm() {
    document.getElementById('val1').value = '';
    document.getElementById('val2').value = '';
    document.getElementById('distance').innerHTML = '';
    document.getElementById('holeSize').innerHTML = '';
}

// Load saved results from localStorage
function loadResults() {
    return JSON.parse(localStorage.getItem('holeResults') || '[]');
}

// Save results to localStorage
function saveResults(results) {
    localStorage.setItem('holeResults', JSON.stringify(results));
}

// Render table with saved results
function renderTable() {
    const results = loadResults();
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = '';
    
    if (results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Немає збережених результатів</td></tr>';
        return;
    }
    
    // Reverse to show newest first
    const reversedResults = [...results].reverse();
    
    reversedResults.forEach((result, reversedIndex) => {
        const originalIndex = results.length - 1 - reversedIndex;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.dateTime}</td>
            <td>${result.val1}</td>
            <td>${result.val2}</td>
            <td>${result.distance}</td>
            <td>${result.holeSize}</td>
            <td><button class="delete-btn" data-index="${originalIndex}">🗑️</button></td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteResult(index);
        });
    });
}

// Delete a result
function deleteResult(index) {
    const results = loadResults();
    results.splice(index, 1);
    saveResults(results);
    renderTable();
}

// Save button handler
document.getElementById('save').addEventListener('click', function() {
    const val1 = document.getElementById('val1').value;
    const val2 = document.getElementById('val2').value;
    const distanceText = document.getElementById('distance').innerHTML;
    const holeSizeText = document.getElementById('holeSize').innerHTML;
    
    // Check if values are entered and calculated
    if (!val1 || !val2 || !distanceText || !holeSizeText) {
        alert('Будь ласка, введіть обидва значення для розрахунку перед збереженням.');
        return;
    }
    
    // Extract numeric values from display text
    const distance = distanceText.replace('Відстань між центрами: ', '');
    const holeSize = holeSizeText.replace('Діаметр отвору: ', '');
    
    // Create result object
    const now = new Date();
    const dateTime = now.toLocaleString('uk-UA', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const result = {
        dateTime: dateTime,
        val1: val1,
        val2: val2,
        distance: distance,
        holeSize: holeSize
    };
    
    // Load existing results and add new one
    const results = loadResults();
    results.push(result);
    saveResults(results);
    
    // Clear the form
    resetForm();
    
    // Update table
    renderTable();
});

// Initial table render on page load
renderTable();
