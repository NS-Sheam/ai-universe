// Fetching all data 
const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
};

// Displaying All data by card 
const displayData = (allData, dataLimit) => {
    const cardContainer = document.getElementById('card-container');
    allData = allData.slice(0, dataLimit);
    cardContainer.innerHTML = '';
    allData.forEach(data => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'mx-auto', 'mb-5', 'border-1');
        // console.log(data);
        // Showing data in card 
        cardDiv.innerHTML = `
            <div class="card-body">
                <figure><img class="w-full" src="${data.image}"/></figure>
                  <h2 class="card-title font-bold">Features</h2>
                  <ul id="feature-ol"></ul>
                  <hr class="border-1 border-black">
                  <h2 class="font-bold text-xl">${data.name}</h2>
                  <div class="flex justify-between items-center">
                    <p>${data.published_in}</p>
                    <label for="my-modal-5"><i onclick="loadModalData('${data.id}')" class="fa-solid fa-arrow-right text-[#EB5757] bg-[#f6d5d5] rounded-full p-4"></i></label>
                  </div>
            </div>
        `;

        // console.log(data.features);

        cardContainer.appendChild(cardDiv);
        toggleSpinner(false);

    });

};
loadData(6);
// See more and less button 
const seeMoreButton = document.getElementById('see-more-btn');
const seeLessButton = document.getElementById('see-less-btn');
const seeMoreButtonClick = () => {
    toggleSpinner(true);
    loadData();
    seeMoreButton.style.display = 'none';
    seeLessButton.classList.remove('hidden');
};
const seeLessButtonClick = () => {
    toggleSpinner(true);
    loadData(6);
    seeMoreButton.style.display = 'block';
    seeLessButton.classList.add('hidden');
};
// Spinner function 
const toggleSpinner = isLoading => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading === true) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// Fetching single card details 
const loadModalData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalData(data.data);
};
const displayModalData = (data) => {
    const modalLeftDescription = document.getElementById('modal-left-description');
    const pricingBox1 = document.getElementById('pricing-box-1');
    const pricingBox2 = document.getElementById('pricing-box-2');
    const pricingBox3 = document.getElementById('pricing-box-3');
    const featureListContainer = document.getElementById('feature-list-container');
    const integrationListContainer = document.getElementById('integration-list-container');
    const modalClassImg = document.getElementById('modal-class-img');
    console.log(data);
    modalLeftDescription.innerText = data.description ? data.description : "No data found";
    // Pricing box with validation
    pricingBox1.innerText = data.pricing && data.pricing[0] && data.pricing[0].price !== '0' && data.pricing[0].price !== "No cost" ? data.pricing[0].price + "\n" + data.pricing[0].plan : "Free Of Cost/Basic";
    pricingBox2.innerText = data.pricing &&  data.pricing[1] && data.pricing[1].price !== '0' && data.pricing[1].price !== "No cost" ? data.pricing[1].price + "\n" + data.pricing[1].plan : "Free Of Cost/Basic";
    pricingBox3.innerText = data.pricing && data.pricing[2] && data.pricing[2].price !== '0' && data.pricing[2].price !== "No cost" ? data.pricing[2].price + "\n" + data.pricing[2].plan : "Free Of Cost/Basic";
    featureListContainer.innerHTML = ' ';
    // Adding feature list item in modal 
    for (const key in data.features) {
        const featureList = document.createElement('li');
        featureList.innerText = data.features[key].feature_name ? data.features[key].feature_name : 'No details found';
        featureListContainer.appendChild(featureList);
    };
    integrationListContainer.innerHTML = ' ';
    data.integrations ? data.integrations.forEach(element => {
        const integrationList = document.createElement('li');
        integrationList.innerText = element ? element : 'No data found';
        integrationListContainer.appendChild(integrationList);
    }) : integrationListContainer.innerHTML = `<li> No data found</li>`;
};
loadModalData();


// {/* <li>1. ${data.features[0] ? data.features[0] : 'No more details'}</li>
// <li>2. ${data.features[1] ? data.features[1] : 'No more details'}</li>
// <li>3. ${data.features[2] ? data.features[2] : 'No more details'}</li>
// <li>4. ${data.features[3] ? data.features[3] : 'No more details'}</li> */}

//   function addFeature (features) {
//     const featureContainer = document.getElementById('feature-ol');
//     features.forEach(data => {
//         const featureList = document.createElement('li');
//         featureList.innerText = data;
//         console.log(data);
//     });
// }addFeature(data.features)