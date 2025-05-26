const fetchImage = (endpoint, targetElement, className) => {
    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                console.log('error getting image');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
        })
        .then(imageBlob => {
            return new Promise((resolve, reject) => {
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                const imgElement = document.createElement("img");
                imgElement.src = imageObjectUrl;
                imgElement.alt = "";
                imgElement.classList.add(className);

                // Wait for image to fully load before resolving
                imgElement.onload = () => resolve(imgElement);
                imgElement.onerror = () => reject(new Error('Image failed to load'));

                targetElement.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error("Error fetching the image:", error);
        });
};



export { fetchImage }
