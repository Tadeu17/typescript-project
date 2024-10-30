function sec1add(n1: number, n2: number, showResult: boolean, phrase: string) {
  enum Role {
    ADMIN = 'ADMIN',
    READ_ONLY = -1,
    AUTHOR,
    FOUR,
    FIVE,
    SIX
  }
  const person = {
    name: "Tadeu",
    age: 34,
    hobbies: ["basketball", "taekwondo"],
    role: Role.ADMIN,
    secondRole: Role.READ_ONLY,
    thirdRole: Role.AUTHOR,
    fourthRole: Role.FOUR,
    fifthRole: Role.FIVE
  };
  console.log(`Person is ${person}`);
  console.log(n1,n2,showResult,phrase)
}

let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
let resultPhrase = "Result is: ";

sec1add(number1, number2, printResult, resultPhrase);
