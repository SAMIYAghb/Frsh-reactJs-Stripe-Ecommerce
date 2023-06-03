import React ,{useState ,useEffect}from 'react'
import styles from './Categories.module.css';
import Slider from "react-slick";
import axios from 'axios';


const Categories = () => {
  const [allCategories, setAllCategories] = useState([])

  async function getCategories() {

    let{data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')

    // console.log(data.data);
    setAllCategories(data.data)
  }
 
  useEffect(() => {
    getCategories();   
  }, [])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:4,
    slidesToScroll: 1
  };
  return (
    
    <Slider {...settings}>
      {allCategories.map(category=>
        <div key={category?._id} className="category py-3">
          
          <img src={category?.image} alt="" className="w-100 fluid " height={300}/>
          <h3 className='h6 mt-2'>{category?.name}</h3>
        </div>
      )}
    </Slider>
  );
}
  


export default Categories