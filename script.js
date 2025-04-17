const numbers = document.getElementsByClassName("number");
const output = document.querySelector("h1");
const operations = document.getElementsByClassName("operation");
let outputString = "";
let isAnswered = false;

function isValidInfix(expr) {
  console.log(expr);
  const regex = /^[\d+\-*/%().\s]+$/;
  return regex.test(expr);
}
function cleanExpression(expr) {
  let mulCode = `\u00F7`;
  let divCode = `\u00D7`;
  let mulRegex = new RegExp(mulCode, "g");
  let divRegex = new RegExp(divCode, "g");
  expr = expr.normalize().replace(divRegex, "/").replace(mulRegex, "*");
  return expr;
}

Array.from(numbers).forEach((btn) => {
  btn.addEventListener("click", () => {
    let number = btn.innerHTML;
    if (number === "=") {
      try {
        if (output.innerHTML.includes("power")) {
          let evaluatedValArr = output.textContent
            .split(" power ")
            .map((expr) => {
              if (isValidInfix(expr)) {
                return eval(expr);
              } else {
                return "invalid";
              }
            });
          if (evaluatedValArr.includes("invalid")) {
            output.innerHTML = "Invalid Input";
          } else {
            outputString = Math.pow(evaluatedValArr[0], evaluatedValArr[1]);
            output.innerHTML = outputString;
            isAnswered = true;
          }
        } else {
          if (isValidInfix(outputString)) {
            outputString = eval(outputString);
            output.innerHTML = outputString;
            isAnswered = true;
          } else {
            output.innerHTML = "Invalid Input";
          }
        }
      } catch (error) {
        output.innerHTML = "Invalid Input";
      }
    } else {
      if (output.innerHTML === "0") output.innerHTML = "";
      if (isAnswered) {
        output.innerHTML = "0";
        outputString = "";
        isAnswered = false;
        output.innerHTML += number;
        outputString += number;
      } else {
        output.innerHTML += number;
        outputString += number;
      }
    }
  });
});
Array.from(operations).forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("operator")) {
      if (isAnswered) isAnswered = false;
      if (btn.classList.contains("div")) {
        outputString += "/";
      } else if (btn.classList.contains("mul")) {
        outputString += "*";
      } else {
        outputString += btn.innerHTML;
      }
      output.innerHTML += btn.innerHTML;
    } else if (btn.innerHTML === "C") {
      let str = output.innerHTML;
      if (str.slice(-6) === "</sup>") {
        output.innerHTML = str.split(`<sup> power </sup>`).join("");
      } else {
        output.innerHTML = str.slice(0, str.length - 1);
      }
      if (output.innerHTML.length === 0) output.innerHTML = "0";
    } else if (btn.innerHTML === "Del") {
      output.innerHTML = "0";
      outputString = "";
    } else if (btn.innerHTML === "Exp") {
      if (isAnswered) isAnswered = false;
      output.innerHTML += `<sup> power </sup>`;
    }
  });
});
