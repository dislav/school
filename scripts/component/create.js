const fs = require('fs');
const path = require('path');
const colors = require('colors');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.fromKebabToCamel = function() {
    return this.replace(/-([a-z0-9])/g, function (g) { return g[1].toUpperCase(); })
};

const args = process.argv;
const componentName = args[2];

const progressLog = text => console.log(`[ ${colors.blue.bold('PROGRESS')} ] ${text}`);
const pathFileExt = (path, ext) => `${path}.${ext}`;

try {
    if (!componentName) throw new Error('Введите название компонента');

    const components = fs.readdirSync(path.join('src', 'components'));
    if (components.findIndex(component => component === componentName) !== -1) throw new Error('Компонент уже существует');

    const componentAlias = componentName.fromKebabToCamel().capitalize();
    const folderPath = path.join('src', 'components', componentName);
    const filePath = path.join(folderPath, componentName);

    const componentsPathScss = path.join('src', 'app', 'scss', 'components.scss');
    const importViewScss = `@import '../../components/${componentName}/${componentName}';\n`;

    let componentsScss = fs.readFileSync(componentsPathScss, { encoding: 'utf-8' });
    componentsScss += importViewScss;

    fs.writeFile(componentsPathScss, componentsScss, err => {
        if (err) throw new Error(err.message);
        progressLog('Создание импортов SCSS');

        fs.mkdir(folderPath, {}, err => {
            if (err) throw new Error(err.message);
            progressLog('Создание директории компонента');
    
            const componentTemplate = fs.readFileSync(path.join('scripts', 'component', 'component.tstpl')).toString();
    
            const tsPath = pathFileExt(filePath, 'ts');
            fs.writeFile(tsPath, eval('`' + componentTemplate + '`'), err => {
                if (err) throw new Error(err.message);
                progressLog(`Генерация ${componentName}.ts`);
    
                const pugPath = pathFileExt(filePath, 'pug');
                fs.writeFile(pugPath, `mixin ${componentName}(props)\n    .${componentName}&attributes(attributes)\n`, err => {
                    if (err) throw new Error(err.message);
                    progressLog(`Генерация ${componentName}.pug`);
    
                    const scssPath = pathFileExt(filePath, 'scss');
                    fs.writeFile(scssPath, `.${componentName} {\n    $root: &;\n}`, err => {
                        if (err) throw new Error(err.message);
                        progressLog(`Генерация ${componentName}.scss`);
                        
                        console.log(`[ ${colors.green.bold('SUCCESS')} ] Компонент ${componentName} создан`);
                    });
                });
            });
        });
    });
} catch (e) {
    console.log(`[ ${colors.red.bold('ERROR')} ] ${e.message}`);
} finally {}