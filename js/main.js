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
    const sortByDateBtn = document.getElementById('sort-by-btn');
    allData = allData.slice(0, dataLimit);
    cardContainer.innerHTML = '';
    // Sort by date
    sortByDateBtn.addEventListener('click', function(){
        allData.sort((data1, data2) => {
            return new Date(data2.published_in) - new Date(data1.published_in);
        });
        chileAppend(allData, cardContainer);
    });
    // create and appendChild
    chileAppend(allData, cardContainer);
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
    const featureListContainer = document.getElementById('modal-feature-list-container');
    const integrationListContainer = document.getElementById('integration-list-container');
    const modalClassImg = document.getElementById('modal-class-img');
    const accuracy = document.getElementById('accuracy');
    const accuracyContainer = document.getElementById('accuracy-container');
    const modalRightHeading = document.getElementById('right-side-heading');
    const modalRightDescription = document.getElementById('modal-right-side-description');
    modalLeftDescription.innerText = data.description ? data.description : "No data found";
    // Pricing box with validation
    pricingBox1.innerText = data.pricing && data.pricing[0] && data.pricing[0].price !== '0' && data.pricing[0].price !== "No cost" ? data.pricing[0].price + "\n" + data.pricing[0].plan : "Free Of Cost/Basic";
    pricingBox2.innerText = data.pricing && data.pricing[1] && data.pricing[1].price !== '0' && data.pricing[1].price !== "No cost" ? data.pricing[1].price + "\n" + data.pricing[1].plan : "Free Of Cost/Basic";
    pricingBox3.innerText = data.pricing && data.pricing[2] && data.pricing[2].price !== '0' && data.pricing[2].price !== "No cost" ? data.pricing[2].price + "\n" + data.pricing[2].plan : "Free Of Cost/Basic";
    featureListContainer.innerHTML = ' ';
    // Adding feature list item in modal 
    for (const key in data.features) {
        const featureList = document.createElement('li');
        featureList.innerText = data.features[key].feature_name ? data.features[key].feature_name : 'No details found';
        featureListContainer.appendChild(featureList);
    };
    // Adding integration list 
    integrationListContainer.innerHTML = ' ';
    data.integrations ? data.integrations.forEach(element => {
        const integrationList = document.createElement('li');
        integrationList.innerText = element ? element : 'No data found';
        integrationListContainer.appendChild(integrationList);
    }) : integrationListContainer.innerHTML = `<li> No data found</li>`;
    modalClassImg.setAttribute("src", data.image_link[0])
    // Adding accuricy
    if (data.accuracy && data.accuracy.score) {
        accuracy.innerText = data.accuracy.score * 100;
        accuracyContainer.style.display = 'block';
    }
    else {
        accuracyContainer.style.display = 'none';
    }
    console.log();
    modalRightHeading.innerText = data.input_output_examples && data.input_output_examples[0].input ? data.input_output_examples[0].input : 'Can you give any example?';
    modalRightDescription.innerText = data.input_output_examples && data.input_output_examples[0].output ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!';
};
loadModalData();
