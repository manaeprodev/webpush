addEventListener('push', () => {
    const titre = event.data.titre;
    const notif = event.data.notif;

    console.log(titre)
    console.log(notif)

    self.registration.showNotification(titre, {
        body: notif,
        icon: 'https://cdn.pixabay.com/photo/2016/03/31/14/37/checklist-1295316_960_720.png',
        vibrate: [100, 50, 100],
    });
});

addEventListener('activate', () => {
    self.registration.showNotification('Worker info', {
        body: 'Worker activated',
        icon: 'https://cdn.pixabay.com/photo/2016/03/31/14/37/checklist-1295316_960_720.png',
        vibrate: [100, 50, 100],
    });
});