import React, {useState, useEffect} from 'react';
import CharReview from './CharReview.jsx';
import { Container, HorizontalList } from '../styled/SelectRating.styled.js';
import { FaStar } from 'react-icons/fa';


const NewReview = ({charArray, charChoice, setCharChoice}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // overall Rating
  const [starRating, setRating] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const stars = Array(5).fill(0);

  // recommendation
  const [recommend, setRecommend] = useState({ name: '', value: ''});
  const recommendOptions = [ { value: "yes", name: "true"}, { value: "no", name: "false"}]


  const handleRecClick = (e) => {
    const obj = {name: e.target.value, value: e.target.name };
    setRecommend(obj);
  }


  return (
    <div>
      <Container>
      <h4>Add New Review</h4>
      <form>
      <label>
        Username
        <input name="username" value={username} onChange={setUsername} required/>
      </label><br/>
      <label>
        Email
        <input name="email" type ="email" value={email} onChange={setEmail} required/>
      </label><br/>
      <label>Overall Rating
          <div>
            <HorizontalList>
            {stars.map((_, index) => {
              return (
                <li key={index}>
                  <FaStar
                  size={24}
                  color={(hovered || starRating) > index ? "orange" : "grey"}
                  onClick={() => setRating(index + 1)}
                  onMouseOver={() => setHovered(index + 1)}
                  onMouseLeave={() => setHovered(undefined)}
                  />
                  </li>
              )
            })}
            </HorizontalList>
         </div>
      </label> <br/>
        Do you recommend this product?
        {recommendOptions.map((valueObj, k) => (
          <label key={k}>{valueObj.value}
            <input type="radio"
            value={valueObj.value}
            name={valueObj.name}
            onChange={handleRecClick}
            checked={recommend.name === valueObj.value}/>
          </label>
        ))} <br/>

          Characteristics
          <br/>
          <CharReview charArray={charArray}
          charChoice={charChoice}
          setCharChoice={setCharChoice}/>
      </form>
      </Container>
    </div>
  )
}

export default NewReview;


// {charArray.map(obj => (
//   <label key={obj.id} style={{padding: '10px'}}>{obj.name}
//       {stars.map((_, index) => {
//         let ratingVal = index + 1;
//         // let stringy = JSON.stringify(obj.id);
//         return (
//         <label key={index}>
//           {ratingVal}
//           <input type="radio"
//             value={ratingVal}
//             name={charOptions[obj.name][index]}
//             onChange={(e) => handleCharClick(e, obj.id)}/>

//         </label>

//       )})
//     }<br/>
//   </label>
// ))}