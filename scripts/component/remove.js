const fs = require('fs');
const path = require('path');
const colors = require('colors');
const rimraf = require('rimraf');

const args = process.argv;
const componentName = args[2];

const progressLog = text => console.log(`[ ${colors.blue.bold('PROGRESS')} ] ${text}`);

try {
    if (!componentName) throw new Error('Введите название компонента');

    const components = fs.readdirSync(path.join('src', 'components'));
    if (components.findIndex(component => component === componentName) === -1) throw new Error('Компонент не существует');

    const folderPath = path.join('src', 'components', componentName);

    const componentsPathScss = path.join('src', 'app', 'scss', 'components.scss');
    const importViewScss = `@import '../../components/${componentName}/${componentName}';\n`;

    const componentsScss = fs.readFileSync(componentsPathScss, { encoding: 'utf-8' });

    fs.writeFile(componentsPathScss, componentsScss.replace(importViewScss, ''), err => {
        if (err) throw new Error(err.message);
        progressLog('Удаление импортов SCSS');

        rimraf(folderPath, err => {
            if (err) throw new Error(err.message);
            console.log(`[ ${colors.green.bold('SUCCESS')} ] Компонент ${componentName} удален`);
        });
    });
} catch (e) {
    console.log(`[ ${colors.red.bold('ERROR')} ] ${e.message}`);
} finally {}