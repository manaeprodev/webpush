function checkBrowser() {
    return (('serviceWorker' in navigator) && ('PushManager' in window));
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('OK');
            return registration;
        })
        .catch(function(err) {
            console.error('Unable', err)
        });
}

function askPermission() {
    return new Promise(function(resolve, reject) {
        Notification.requestPermission().then(function (result) {
            if(result === 'denied') {
                reject("Notifs bloquées")
            }

            if (result === 'default') {
                reject('On regarde plus tard')
            }

            resolve();
        })
    })
}

function accepteNotif() {
    return navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(__ApplicationServerKey)
            };

            return registration.pushManager.subscribe(subscribeOptions);

        }).then(function(pushSubscription) {
            console.log('Mon URL : ', JSON.stringify(pushSubscription))

            return sendSubscriptionToBackEnd(pushSubscription);

        }).catch(function(err) {
            console.error('Impossible de s\'enregistrer.',err)
        })
}

function sendSubscriptionToBackEnd(subscription) {
    return fetch('/api/save-subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Bad status code from server.');
            }
            return response.json();
        })
        .then(function(responseData) {
            if (responseData.status !== 'success') {
                throw new Error('Bad response from server.');
            }
        })
        .catch(function(err) {
            console.error('Error during fetch:', err);
        });
}


/**
 * Conversion de la clef VAPID pour la subscription
 * @param base64String
 * @returns {Uint8Array}
 */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
