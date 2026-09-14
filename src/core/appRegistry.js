const apps = new Map();

export function registerApp(app) {
  apps.set(app.id, app);
}

export function getApp(id) {
  return apps.get(id);
}
