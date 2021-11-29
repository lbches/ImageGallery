import React,{useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages]=useState([]);
  const [isLoading,setIsLoading]= useState(true);
  const [term, setTerm]= useState('');

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
        .then(res=>res.json())
        .then(data=>{
          setImages(data.hits);
          setIsLoading(false);
        })
        .catch(err=>console.log(err));
  },[term]);

  
  return (
    <div className="App">
      <header className="px-6 py-4 bg-gray-700 align-middle justify-center">
        <div className="text-6xl font-bold text-blue-500 text-center mb-2">Image Gallery with Pixabay api </div>
     </header>
     <hr />
     <ImageSearch searchText={(text)=>setTerm(text)} />
     <main className="container mx-auto">
       {/* checking if image is found */}
       {!isLoading && images.length ===0 && <h1 className="text-6xl text-center mx-auto mt-32">NO image Found</h1>}
       {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
       :<div className="grid grid-cols-3 gab-4">
          {images.map(image=>(
             <ImageCard key={image.id} image={image} />
          ))}
     </div>}
       
     </main>
     <hr />
      <footer className="px-6 py-4 bg-gray-700 align-middle justify-center">
         <div className="text-xl text-center py-4  text-blue-500 mb-2">made with love by <a href="https://twitter.com/checoslbches" target="_blank"><span className="text-green-500 text-4xl" >Mehammed Teshome</span></a></div>
      </footer>
    </div>
  );
}

export default App;
