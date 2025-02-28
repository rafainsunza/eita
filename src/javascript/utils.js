const fetchImage = async (endpoint, targetElement, className) => {
    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                console.log('error getting imgae')
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.blob();
        })
        .then(imageBlob => {
            const imageObjectUrl = URL.createObjectURL(imageBlob);

            const imgElement = document.createElement("img");
            imgElement.src = imageObjectUrl;
            imgElement.alt = "";
            imgElement.classList.add(className);

            targetElement.appendChild(imgElement);

        })
        .catch(error => {
            console.error("Error fetching the image:", error);
        })

};

const scrollToSection = (topElement, sectionElement, backToTopClicked) => {
    let scrollTarget;

    backToTopClicked ?
        scrollTarget = topElement :
        scrollTarget = sectionElement;

    scrollTarget.scrollIntoView({ behavior: 'smooth' });

    // Safari seems to not handle scrollIntoView and/or scroll behavior correctly,
    // so to ensure correct scrolling I set the scroll behavior in safari to auto
    // for now this is not necessary as scrolling seems consistent but needs further testing
    // const browserIsSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // let scrollBehavior;
    // browserIsSafari ? scrollBehavior = 'auto' : scrollBehavior = 'smooth';
    // scrollTarget.scrollIntoView({ behavior: scrollBehavior });

}


export { fetchImage, scrollToSection }
