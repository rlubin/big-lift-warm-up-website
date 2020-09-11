"use strict"

const input = document.getElementById("weight");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { 
        handleButton();
    }
})

function resetInput() {
    document.getElementById("weight").style.backgroundColor = "#ffffff";
}

function handleButton() {
    const weight = document.getElementById("weight").value;
    if(weight === "") {
        document.getElementById("weight").style.backgroundColor = "#ff0000";
        return;
    }
    const sets = document.getElementById("sets").value;
    document.getElementById("weight").value = "";
    const roundedWeight = Math.round(weight / 5) * 5;
    calcScheme(roundedWeight, calcPercents(sets));
}

function calcPercents(sets) {
    const percents = [0];
    const diff = (50 / sets).toFixed(3);
    for(let i = 0; i < sets; i++) {
        percents.push(50 + (diff * i));
    }
    const roundedPercents = percents.map(x => Math.round(x));
    return roundedPercents;
}

function calcScheme(weight, percents) {
    const reps = [15, 10, 8, 6, 4, 2];
    const scheme = [];
    const pl = percents.length;
    for(let i = 0; i < pl; i++) {
        scheme.push(calcWeightAndReps(weight, percents[i], reps[i]));
    }
    scheme.push(calcWeightAndReps(weight, 100, "X"));
    displayTable(scheme);
}

function calcWeightAndReps(weight, percent, reps) {
    let curWt = (percent == 0 ? 45 : Math.round((weight * (percent / 100)) / 5) * 5);
    return {percent: percent, weight: curWt, weightPerSide: (curWt - 45) / 2, reps: reps};
}

function displayTable(scheme) {
    document.getElementById("tableHead").innerHTML = "";
    document.getElementById("tableBody").innerHTML = "";
    const headers = ["Percent", "Weight", "Weight/side", "Reps"];
    const head = document.createElement("tr");
    const hl = headers.length;
    for(let i = 0; i < hl; i++) {
        const headCol = document.createElement("th");
        headCol.textContent = headers[i];
        head.append(headCol);
    }
    document.getElementById("tableHead").appendChild(head);
    const body = document.getElementById("tableBody");
    const sl = scheme.length;
    for (let i = 0; i < sl; i++) {
        const row = document.createElement("tr");
        Object.values(scheme[i]).forEach(val => {
            const rowCol = document.createElement("td");
            rowCol.textContent = val;
            row.appendChild(rowCol);
        });
        body.appendChild(row);
    }

}