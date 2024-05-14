const billInput: HTMLInputElement | null = document.getElementById("bill-amount") as HTMLInputElement;
const peopleInput: HTMLInputElement | null = document.getElementById("people-count") as HTMLInputElement;
const customInput: HTMLInputElement | null = document.querySelector(".custom-perc-input") as HTMLInputElement;
const btn_5perc: HTMLElement | null = document.querySelector(".btn_5perc");
const btn_10perc: HTMLElement | null = document.querySelector(".btn_10perc");
const btn_15perc: HTMLElement | null = document.querySelector(".btn_15perc");
const btn_25perc: HTMLElement | null = document.querySelector(".btn_25perc");
const btn_50perc: HTMLElement | null = document.querySelector(".btn_50perc");
const btnReset: HTMLElement | null = document.querySelector(".reset-button");
const showTip: HTMLElement | null = document.querySelector(".show-tip");
const showTotal: HTMLElement | null = document.querySelector(".show-total");
const showWarning: HTMLElement | null = document.querySelector("label span");

let billAmount: number, numPeople: number, customPercent: number, tipTotal: number, tipPerson: number, totalPerson: number;

function resetButton(): void {
    if (billInput) billInput.value = "";
    if (peopleInput) peopleInput.value = "";
    if (peopleInput) peopleInput.classList.remove("empty");
    if (customInput) customInput.value = "";
    if (percentBtns) {
        percentBtns.forEach(function (btn) {
            if (btn) btn.classList.remove("click");
        });
    }
    if (showTip) showTip.textContent = "$0.00";
    if (showTotal) showTotal.textContent = "$0.00";
    if (showWarning) showWarning.classList.remove("empty");
}

if (billInput) {
    billInput.addEventListener("change", function () {
        billAmount = Number(billInput.value);
        numPeople = Number(peopleInput.value);

        if (billAmount !== 0 && btnReset) {
            btnReset.removeAttribute("disabled");
        }

        if (numPeople === 0 && showWarning && peopleInput) {
            showWarning.classList.add("empty");
            peopleInput.classList.add("empty");
        }
    });
}

if (peopleInput) {
    peopleInput.addEventListener("change", function () {
        numPeople = Number(peopleInput.value);
        if (numPeople !== 0 && showWarning && peopleInput) {
            showWarning.classList.remove("empty");
            peopleInput.classList.remove("empty");
        } else if (numPeople === 0 && showWarning && peopleInput) {
            showWarning.classList.add("empty");
            peopleInput.classList.add("empty");
        }
    });
}

const percentBtns: (HTMLElement | null)[] = [btn_5perc, btn_10perc, btn_15perc, btn_25perc, btn_50perc, customInput];
let percent: number = 0;

if (percentBtns) {
    percentBtns.forEach(function (btn) {
        if (btn) {
            btn.addEventListener("pointerdown", function (e) {
                if (btn) btn.classList.add("click");
                if (percentBtns) {
                    percentBtns.forEach(function (btnInner) {
                        if (btnInner !== btn && btnInner) btnInner.classList.remove("click");
                    });
                }
                if (btn && btn.id !== "custom") percent = Number(btn.innerHTML);
            });
        }
    });
}

if (btnReset) {
    btnReset.addEventListener("click", resetButton);
}

document.querySelectorAll("input").forEach(function (input) {
    if (input) {
        input.addEventListener("change", function () {
            billAmount = Number(billInput?.value);
            numPeople = Number(peopleInput?.value);
            customPercent = Number(customInput?.value);

            if (customPercent > 100) {
                alert("percentage cannot be greater than 100!");
                resetButton();
            }

            if (percent === 0) percent = customPercent;

            if (billAmount !== 0 && numPeople !== 0 && percent !== 0) {
                tipTotal = billAmount * (percent / 100);
                tipPerson = tipTotal / numPeople;
                totalPerson = (billAmount + tipTotal) / numPeople;

                if (showTip) showTip.textContent = "$" + tipPerson.toFixed(2);
                if (showTotal) showTotal.textContent = "$" + totalPerson.toFixed(2);
            }
        });
    }
});
