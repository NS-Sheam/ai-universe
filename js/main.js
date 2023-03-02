const loadData = async() =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools);
};
const displayData = allData =>{
    const cardContainer = document.getElementById('card-container');
    allData.forEach(data => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'mx-auto', 'mb-5' , 'border-1');
        console.log(data);
        cardDiv.innerHTML = `
                <figure><img src="${data.image}"/></figure>
                <div class="card-body">
                  <h2 class="card-title font-bold">Features</h2>
                  <p>${data.features}</p>
                  <hr class="border-1 border-black">
                  <h2 class="font-bold text-xl">${data.name}</h2>
                  <div class="flex justify-between items-center">
                    <p>${data.published_in}</p>
                    <i class="fa-solid fa-arrow-right text-[#EB5757] bg-[#f6d5d5] rounded-full p-4"></i>
                  </div>
                </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};
loadData();