import { annotate } from 'rough-notation';

const engineer = document.querySelector("#frontend-engineer");

if (engineer) {
    const annotation = annotate(engineer, {
        type: "highlight",
        color: "#A2E8FA",
        multiline: true,
    });
    annotation.show();
}


console.log('hello')
console.log('hello')
console.log('hello')
