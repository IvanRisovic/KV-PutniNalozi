import background from "../img/background1.jpg"

const Navig = () => {
  return (
    <>
       <div className="p-5 text-center bg-image" style={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100vW', height: '100vh'}}>
           <div className="d-flex justify-content-center align-items-center h-100">
               <div className="text-white">
                   <h1 className="mb-3">Putni nalozi</h1>
                   <a className="btn btn-outline-light btn-lg" href="./Nalozi" role='button'>Prikaži naloge</a>
               </div>
           </div>
       </div>
    </>  
    
  )
}

export default Navig