(function () {
    function initXenteButton() {
        const xenteButtons = document.querySelectorAll('xente-btn');
        xenteButtons.forEach(button => {
            const targetElementId = button.getAttribute('id');
            const accountRefId = button.getAttribute('accountRefId');
            const buttonText = button.getAttribute('text') || 'Pay Now';

            // Default to 'Pay Now' if buttonText is invalid
            const validButtonTexts = ['Pay Now', 'Buy Now', 'Donate', 'Subscribe'];
            const finalButtonText = validButtonTexts.includes(buttonText) ? buttonText : 'Pay Now';

            // Generate a GUID
            function generateGUID() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            // Create clientRefId by combining accountRefId and a generated GUID
            const clientRefId = `${accountRefId}-${generateGUID()}`;

            // Create form element
            const form = document.createElement('form');
            form.id = 'xente-pay-form';
            form.method = 'POST';
            form.action = `http://ec2-54-154-122-18.eu-west-1.compute.amazonaws.com?accountRefId=${accountRefId}&clientRefId=${clientRefId}`;
            //form.action = `https://localhost:44388/?accountRefId=${accountRefId}&clientRefId=${clientRefId}`;
            // Create submit button
            const submitButton = document.createElement('button');
            submitButton.id = 'xente-pay-btn';
            submitButton.type = 'submit';
            submitButton.textContent = finalButtonText;

            // Append button to the form
            form.appendChild(submitButton);

            // Replace the custom element with the form
            button.parentNode.replaceChild(form, button);
        });

        // Create and append style
        const style = document.createElement('style');
        style.textContent = `
            #xente-pay-btn {
                background-color: #f79524;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px;
                transition: background-color 0.3s;
            }

            #xente-pay-btn:hover {
                background-color: #000;
            }
        `;
        document.head.appendChild(style);
    }

    // Run the initialization when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initXenteButton);
    } else {
        initXenteButton();
    }
})();
