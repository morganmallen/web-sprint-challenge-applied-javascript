import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  const {headline, authorPhoto, authorName} = article;

  console.log('article: ', article);

  const card = document.createElement('div');
  card.classList.add('card');
  card.addEventListener('click', () => console.log(headline));

  const headlineElement = document.createElement('div');
  headlineElement.classList.add('headline');
  headlineElement.textContent = headline;

  const author = document.createElement('div');
  author.classList.add('author');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');

  const img = document.createElement('img');
  img.src = authorPhoto;

  const name = document.createElement('span');
  name.textContent='By ' +authorName;

  card.appendChild(headlineElement);
  card.appendChild(author);
  author.appendChild(imgContainer);
  author.appendChild(name);
  imgContainer.appendChild(img);
  console.log(authorName)
  return card;
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
const element = document.querySelector(selector)


  axios.get(`http://localhost:5001/api/articles`)
  .then((res) => {
    let articles = res.data.articles;
    let articleData = Object.values(articles);
    let flatArray = articleData.flat();

    flatArray.forEach(data => {
      let card = Card(data)
       element.appendChild(card);
    }) 
   
  })
  .catch(err => console.error(err))
}


export { Card, cardAppender }
