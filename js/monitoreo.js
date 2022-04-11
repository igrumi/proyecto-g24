(function() {
    var addressField = document.getElementById('shipping-street-address'),
        countrySelect = document.getElementById('shipping-country'),
        AF_API_KEY = 'ADDRESSFINDER_DEMO_KEY',
        COUNTRY_NAME_NZ = 'New Zealand',
        COUNTRY_NAME_AU = 'Australia',
        widgets = {
            AU: null,
            NZ: null}
   var stateMappings = {
    "Auckland Region" : "2289",
    "Bay of Plenty Region" : "2290",
    "Canterbury Region" : "2291",
    "Gisborne Region" : "2292",
    "Hawke's Bay Region" : "2293",
    "Manawatu-Wanganui Region" : "2294",
    "Marlborough Region" : "2295",
    "Nelson Region" : "2296",
    "Northland Region" : "2297",
    "Otago Region" : "2298",
    "Southland Region" : "2299",
    "Taranaki Region" : "2300",
    "Tasman Region" : "2288",
    "Waikato Region" : "2301",
    "Wellington Region" : "2302",
    "West Coast Region" : "2303"
  };
    /*
    * Determines which addresses are displayed to your user.
    * When either AU or NZ is selected we only display addresses from that country.

    * It is assumed that the country selector is a select element.
    * If you are using checkboxes or radio buttons, you will need to modify this code
    */
    function countryChangeHandler() {
        var countryName = countrySelect.options[countrySelect.selectedIndex].text;
        switch (countryName) {
            case COUNTRY_NAME_NZ:
                widgets.NZ.enable();
                widgets.AU.disable();
                break;
            case COUNTRY_NAME_AU:
                widgets.AU.enable();
                widgets.NZ.disable();
                break;
            default:
                widgets.NZ.disable();
                widgets.AU.disable();
        }
    }

    /*
     * Performs the following functions:
     * 1. initialises the AddressFinder widget for AU and NZ
     * 2. defines the event handler behaviour for when an address is selected
     * 3. Runs countryChangeHandler to set the inital country
     * 3. Setup of event listener for country changing
     */
    function initAddressFinder() {
        widgets['NZ'] = new AddressFinder.Widget(
            addressField,
            AF_API_KEY,
            'NZ', {
                "address_params": {
                    "post_box": "0",
                    "delivered": "1"
                },
                "empty_content": "No addresses were found. Please enter your address manually."
            }
        );

        widgets['AU'] = new AddressFinder.Widget(
            addressField,
            AF_API_KEY,
            'AU', {
                "address_params": {
                    "au_paf": "1",
                    "post_box": "0"
                },
                "empty_content": "No addresses were found. Please enter your address manually."
            }
        );


        widgets['NZ'].on('address:select', function(fullAddress, metaData) {
            var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);
         var combinedAddressLine1And2 = !metaData.address_line_2 ? 
            metaData.address_line_1 : 
            metaData.address_line_1 + ', ' + metaData.address_line_2;

          // You will need to update these ids to match those in your form
          document.getElementById('shipping-street-address').value = combinedAddressLine1And2;
            document.getElementById('shipping-street-address-2').value = metaData.selected_suburb;
            document.getElementById('shipping-city').value = metaData.selected_city;
           document.getElementById('shipping-postcode').value = metaData.postcode;
           document.getElementById('shipping-state').value = stateMappings[metaData.region];

        });

        widgets['AU'].on('address:select', function(fullAddress, metaData) {
            // TODO - You will need to update these ids to match those in your form
            document.getElementById('shipping-street-address').value = metaData.address_line_1;
            document.getElementById('shipping-street-address-2').value = metaData.address_line_2;
            document.getElementById('shipping-city').value = metaData.locality_name;
            document.getElementById('shipping-state').value = metaData.state_territory;
            document.getElementById('shipping-postcode').value = metaData.postcode;

        });




        countryChangeHandler()
        countrySelect.addEventListener('change', countryChangeHandler);
    }

    function downloadAddressFinder() {
        var script = document.createElement('script');
        script.src = 'https://api.addressfinder.io/assets/v3/widget.js';
        script.async = true;
        script.onload = initAddressFinder;
        document.body.appendChild(script);
    };

    document.addEventListener('DOMContentLoaded', downloadAddressFinder);
})();

;;