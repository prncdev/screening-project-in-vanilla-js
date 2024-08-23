const cardList = [
  { id: 1, price: 18, qty: 1, dbl: 2, isPopular: false, currency: 'USD', currencySymbol: '$' },
  { id: 2, price: 24, qty: 2, dbl: 4, isPopular: true, currency: 'USD', currencySymbol: '$' },
  { id: 3, price: 36, qty: 3, dbl: 6, isPopular: false, currency: 'USD', currencySymbol: '$' },
];

const root = document.getElementById('root');

const createPriceCard = function (card) {
  const { id, price, qty, dbl, isPopular, currency, currencySymbol } = card;
  const section = document.createElement('section');
  section.className = 'card card-small';
  section.dataset.id = id;

  const HTMLElement = `
    <aside class="info-offer bg-primary">
      <span>30%</span>
      <span>Off</span>
    </aside>

    <aside class="info-wrapper">
      <input type="radio" name="price" id="price-${id}" class="hide-input">
      <label for="price-${id}" class="radio-input"></label>

      <div class="info-price">
        <p class="info-price-title">Buy ${qty} Get ${dbl}</p>
        <strong>${currencySymbol}${price}.00 ${currency}</strong>
      </div>

      ${isPopular ? '<span class="most-popular text-primary">Most Popular</span>' : ''}
    </aside>`;

  section.insertAdjacentHTML('afterbegin', HTMLElement);

  // Store the initial HTML for restoring later
  section.dataset.previewHTML = section.innerHTML;

  // Add click event listener to each card
  section.addEventListener('click', function (event) {
    if(event.target.nodeName.toLowerCase() === 'label') {
      expandCard(section, card);
    }
  });

  return section;
};

const updatePrice = function(price) {
  const priceSpan = document.getElementById('get-price');
  priceSpan.innerHTML = `${price.currencySymbol}${price.price}.00`;
}


const expandCard = function (selectedCard, cardData) {
  // Collapse any previously expanded card
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('card-large', 'py-8', 'px-8', 'bg-primary-light', 'rounded-lg');
    card.classList.add('card-small');
    card.innerHTML = card.dataset.previewHTML;
  });

  // Expand the selected card
  selectedCard.classList.remove('card-small');
  selectedCard.classList.add('card-large', 'py-8', 'px-8', 'bg-primary-light', 'rounded-lg');

  const { price, qty, dbl, currency, currencySymbol } = cardData;

  const optionsHTML = `
    <div>
      <div>
        <input type="radio" name="price" id="price1" class="hide-input">
        <label for="price1" class="radio-input"></label>
      </div>
      <div class="px-8">

        <div>
          <p>Buy ${qty} Get ${dbl} <span class="bg-primary py-1 px-2 ml-3 text-xs rounded-xs">10% Off</span></p>
        </div>

        <div>
          <strong>${currencySymbol}${price}.00 ${currency}</strong>
          <small>
            <del>&dollar;10.00 USD</del>
          </small>
        </div>
      </div>
    </div>

    <section class="product-options">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Size</th>
            <th>Colour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><label for="size-1">#1</label></td>
            <td>
              <select id="size-1">
                <option selected value="empty">Size</option>
                <option value="sm">S</option>
                <option value="md">M</option>
                <option value="lg">L</option>
                <option value="xl">XL</option>
              </select>
            </td>
            <td>
              <select id="color-1">
                <option selected value="empty">Colour</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label for="size-2">#2</label></td>
            <td>
              <select id="size-2">
                <option selected value="empty">Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </td>
            <td>
              <select id="color-2">
                <option selected value="empty">Colour</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </section>`;

  selectedCard.innerHTML = optionsHTML;
  updatePrice({price, currencySymbol});
};

const CardNodes = cardList.map((card) => createPriceCard(card));

CardNodes.forEach(html => {
  root.insertBefore(html, root.querySelector('section.cta-wrapper'));
});


document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
  event.preventDefault();
  window.alert('Added to the cart successfully');
})