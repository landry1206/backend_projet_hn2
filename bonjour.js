const bonjour = require('bonjour')();

// Découvrir tous les services HTTP
bonjour.find({ type: 'http' }, service => {
    console.log('Service trouvé:', service.addresses[3]);
});
