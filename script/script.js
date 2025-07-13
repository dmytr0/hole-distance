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

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('val1').value = '';
    document.getElementById('val2').value = '';
    document.getElementById('distance').innerHTML = '';
    document.getElementById('holeSize').innerHTML = '';
});
