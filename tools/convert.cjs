const fs = require("fs");
const path = require("path");
const HtmlToJSX = require("htmltojsx");

const root = path.resolve(__dirname, "..");
const lines = fs.readFileSync(path.join(root, "index.html"), "utf8").split(/\r?\n/);

const sections = [
  ["SiteHeader", 19, 63],
  ["Hero", 67, 132],
  ["Lineage", 134, 235],
  ["Ownership", 237, 311],
  ["Spend", 313, 340],
  ["Router", 342, 406],
  ["Setup", 408, 450],
  ["Ask", 452, 484],
  ["Permissions", 486, 508],
  ["SiteFooter", 512, 555],
];

const outDir = path.join(root, "components");
fs.mkdirSync(outDir, { recursive: true });

for (const [name, start, end] of sections) {
  let html = lines.slice(start - 1, end).join("\n");
  html = html.replace(/style="([^"]*)"/g, 'data-css="$1"');

  let jsx = new HtmlToJSX({ createClass: false }).convert(html);
  jsx = jsx.replace(/data-css="--([\w-]+):\s*([\d.]+)"/g, (_, key, value) => {
    const num = value.startsWith(".") ? `0${value}` : value;
    return `style={vars({ "--${key}": ${num} })}`;
  });

  const body = jsx
    .split("\n")
    .map((line) => (line.trim() ? `      ${line}` : ""))
    .join("\n");

  const imports = jsx.includes("vars(") ? 'import { vars } from "@/lib/css";\n\n' : "";

  const file = `${imports}export default function ${name}() {
  return (
    <>
${body}
    </>
  );
}
`;

  fs.writeFileSync(path.join(outDir, `${name}.tsx`), file);
  console.log(`${name}.tsx  ${body.split("\n").length} lines`);
}
