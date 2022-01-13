import opn from 'opn';
import fs from 'fs';

if (process.argv[2] === 'var') {
  const vars = JSON.parse(fs.readFileSync(process.cwd() + '/vars.json'));
  vars[process.argv[3]] = process.argv[4];
  fs.writeFileSync(process.cwd() + '/vars.json', JSON.stringify(vars, null, 2));
} else if (process.argv[2] === 'get') {
  const vars = JSON.parse(fs.readFileSync(process.cwd() + '/vars.json'));
  Object.entries(vars).forEach(([key, value]) => {
    console.log(`"${key}" = "${value}"`);
  });
} else if (process.argv[2] === 'delete') {
  const vars = JSON.parse(fs.readFileSync(process.cwd() + '/vars.json'));
  delete vars[process.argv[3]];
  fs.writeFileSync(process.cwd() + '/vars.json', JSON.stringify(vars, null, 2));
} else {
  let link = process.argv[2];
  const vars = JSON.parse(fs.readFileSync(process.cwd() + '/vars.json'));
  if (vars[link]) {
    opn(vars[link]);
  } else {
    link = link.replace('https://', '').replace('http://', '');
    if (link.split('.').length === 1) link = `https://www.${link}.com`;
    else if (link.split('.').length === 2) link = `https://www.${link}`;
    else if (link.split('.').length === 3) link = `https://${link}`;
    opn(link);
  }
}
