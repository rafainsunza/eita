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

export { fetchImage }
