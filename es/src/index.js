/** 动态导入 */
async function  dynamicImportFn() {
  const path = './hello.' + 'js';
  if(path.includes('he')) {
    let { hi, bye } = await import(path);
    hi();
    bye();
  }
}
async function main() {
  await dynamicImportFn();
}

main();