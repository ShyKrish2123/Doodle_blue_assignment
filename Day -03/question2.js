const students =[{ name:"ARUN", marks: 85},{ name: "RAM" , marks:90}, {name: "KIRAN", marks : 92}];
const student = students.find(s => s.name === "KIRAN");
console.log(student ? student.marks : "Not Found");