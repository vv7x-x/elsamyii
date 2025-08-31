document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.querySelector('header#main-header');
    const footerPlaceholder = document.querySelector('footer.main-footer');

    const fetchHeader = fetch('_header.html').then(res => res.text());
    const fetchFooter = fetch('_footer.html').then(res => res.text());

    Promise.all([fetchHeader, fetchFooter])
        .then(([headerHtml, footerHtml]) => {
            if (headerPlaceholder) headerPlaceholder.innerHTML = headerHtml;
            if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;
            
            if (typeof initializeComponents === 'function') {
                initializeComponents();
            }
        })
        .catch(error => {
            console.error('Error loading layout components:', error);
        });
});
