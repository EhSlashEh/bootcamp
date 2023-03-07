// textarea code
const textarea = document.getElementById('editor');
const preview = document.getElementById('preview');

function updatePreview() {
    console.log('Textarea value changed to:', textarea.value);
    const html = marked.parse(textarea.value.replace(/\n/g, '<br>')); // new lines
    preview.innerHTML = html;
}

window.onload = function () {
    textarea.value = "<h1>This is a header</h1>\n<h2>This is the subheader</h2>\nCheck out [GitHub's Markdown Guide](https://guides.github.com/features/mastering-markdown/) for more information on formatting text in Markdown.\n\nThis is inline code:\n`function DoStuff() {...`\n\nHere is a list: <li>The list</li> <li>Is made</li><li>Here!</li>\n\n > This is a blockquote.\n\nHere is an image:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)'"

    updatePreview();
}

textarea.addEventListener('input', function () {
    updatePreview();
});