// Fetching all data 
const loadData = async(dataLimit) =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
};

// Displaying All data by card 
const displayData = (allData, dataLimit) =>{
    const cardContainer = document.getElementById('card-container');
    allData = allData.slice(0, dataLimit);
    cardContainer.innerHTML ='';
    allData.forEach(data => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'mx-auto', 'mb-5' , 'border-1');
        console.log(data);
        // Showing data in card 
        cardDiv.innerHTML = `
                <figure><img src="${data.image}"/></figure>
                <div class="card-body">
                  <h2 class="card-title font-bold">Features</h2>
                  <ol id="feature-ol">
                  <li>1. ${data.features[0] ? data.features[0] : 'No more details'}</li>
                  <li>2. ${data.features[1] ? data.features[1] : 'No more details'}</li>
                  <li>3. ${data.features[2] ? data.features[2] : 'No more details'}</li>
                  <li>4. ${data.features[3] ? data.features[3] : 'No more details'}</li>
                  </ol>
                  <hr class="border-1 border-black">
                  <h2 class="font-bold text-xl">${data.name}</h2>
                  <div class="flex justify-between items-center">
                    <p>${data.published_in}</p>
                    <i class="fa-solid fa-arrow-right text-[#EB5757] bg-[#f6d5d5] rounded-full p-4"></i>
                  </div>
                </div>
        `;
        cardContainer.appendChild(cardDiv);
        // const featureListContainer = document.getElementById('feature-ol');
        // const featureList = document.createElement('li');
        //     featureList.innerText = data.features;
        //     featureListContainer.appendChild(featureList);
        // // data.features.forEach(feature => {
            
        // // });
    });
};
loadData(6);
// See more and less button 
const seeMoreButton = document.getElementById('see-more-btn');
const seeLessButton = document.getElementById('see-less-btn');
const seeMoreButtonClick = () =>{
    loadData();
    seeMoreButton.style.display = 'none';
    seeLessButton.classList.remove('hidden');
};
const seeLessButtonClick = () =>{
    loadData(6);
    seeMoreButton.style.display = 'block';
    seeLessButton.classList.add('hidden');
};

