const btnInstall = document.getElementById('buttonInstall');

// Functionality to install PWA
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log("event" + event)
    event.preventDefault();

    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);

});

// Event handler on the `btnInstall` element
btnInstall.addEventListener('click', async () => {

    const promptInstall = window.deferredPrompt;

    if (!prompInstall) {
        return;
    }

    promptInstall.prompt();

    window.deferredPrompt = null;

    btnInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {

    console.log('App installed!')

    window.deferredPrompt = null;

});