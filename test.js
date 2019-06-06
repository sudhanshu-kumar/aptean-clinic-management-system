const input1 = 3;
const input2 = ["00113", "0050", "101001", "32300", "0"];
let output = [];

for (let i = 0; i < input2.length; i++) {
  if (parseInt(input2[i]) > 101000 || parseInt(input2[i]) < 0) {
    output.push("invalid key");
  } else if (parseInt(input2[i]) === 0) {
    output.push("-1");
  } else {
    //console.log(input2[i]);
    const strNum = input2[i].split("");
    let sum = 0;
    strNum.forEach(element => {
      sum += parseInt(element);
    });
    let num = parseInt(input2[i], 10) + 1;
    //console.log(strNum);
    //console.log(num);
    const outputLength1 = output.length;
    for (let j = num; j < 101000; j++) {
      let numCheck = j.toString().split("");
      //console.log(numCheck);
      let sum1 = 0;
      numCheck.forEach(ele => {
        sum1 += parseInt(ele);
      });
      //console.log(sum1);
      if (sum1 === sum) {
        if (numCheck.length === strNum.length) output.push(numCheck.join(""));
        else {
          while (numCheck.length !== strNum.length) {
            numCheck.unshift(0);
          }
          output.push(numCheck.join(""));
        }
        break;
      }
    }
    const outputLength2 = output.length;
    if (outputLength2 === outputLength1) {
      output.push("-1");
    }
  }
}
console.log(output);
