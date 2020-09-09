"use strict"

function handleButton() {
    const weight = document.getElementById("weight").value;
    document.getElementById("weight").value = "";
    calcScheme(weight);
}

function calcScheme(weight) {
    const percents = [0, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1];
    const reps = [15, 10, 8, 6, 4, 2, 8, 8, 8];
    const scheme = [];
    for(let i = 0; i < percents.length; i++) {
        scheme.push(calcWeightAndReps(weight, percents[i], reps[i]));
    }
    printTable(scheme);
}

function calcWeightAndReps(weight, percent, reps) {
    let curWt = (percent == 0 ? 45 : Math.round((weight * percent) / 5) * 5);
    return {percent: percent * 100, weight: curWt, weightPerSide: (curWt - 45) / 2, reps: reps};
}

function printTable(scheme) {
    document.getElementById("tableHead").innerHTML = "";
    document.getElementById("tableBody").innerHTML = "";
    console.log(scheme);
    const headers = ["Percent", "Weight", "Weight/side", "Reps"];
    const head = document.createElement("tr");
    for(let i = 0; i < headers.length; i++) {
        const headCol = document.createElement("th");
        headCol.textContent = headers[i];
        head.append(headCol);
    }
    document.getElementById("tableHead").appendChild(head);
    const body = document.getElementById("tableBody");
    for (let i = 0; i < scheme.length; i++) {
        const row = document.createElement("tr");
        Object.values(scheme[i]).forEach(val => {
            const rowCol = document.createElement("td");
            rowCol.textContent = val;
            row.appendChild(rowCol);
        });
        body.appendChild(row);
    }

}