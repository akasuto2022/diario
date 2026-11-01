// Se ejecuta después de "npx cap add android": pone los iconos y los permisos de las notificaciones.
const fs = require('fs');
const path = require('path');

const res = path.join('android', 'app', 'src', 'main', 'res');
fs.cpSync(path.join('recursos', 'res'), res, { recursive: true, force: true });

const manifiesto = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
let xml = fs.readFileSync(manifiesto, 'utf8');
const permisos = [
  'android.permission.POST_NOTIFICATIONS',
  'android.permission.SCHEDULE_EXACT_ALARM',
  'android.permission.USE_EXACT_ALARM',
  'android.permission.VIBRATE',
  'android.permission.RECEIVE_BOOT_COMPLETED',
  'android.permission.WAKE_LOCK',
];
for (const p of permisos) {
  if (!xml.includes(p)) xml = xml.replace('<application', `<uses-permission android:name="${p}" />\n    <application`);
}
fs.writeFileSync(manifiesto, xml);
console.log('Iconos y permisos listos.');
