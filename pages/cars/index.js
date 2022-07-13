export default function CarsList ({manufacturers}) {
    return(
    <div>
        <h1>Cars List</h1>
        <ul>
            {manufacturers.map( manufacturer => {
                console.log();
                return(
                    <li>
                        <a 
                        href={"http://localhost:3000/cars/"+manufacturer.key}
                        >{manufacturer.name}</a>
                    </li>
                )
            })}
        </ul>    
    </div>)
}

// export async function getServerSideProps() {

//     const req = await fetch(`http://localhost:3000/cars.json`);
//     const data = await req.json();
//     return {
//       props : {
//         cars: data
//       }
//     }
// }

export async function getStaticProps({params}) {
    const req = await fetch(`http://localhost:3000/cars.json`);
    const data = await req.json();
    return {
      props : {
        manufacturers: data
      }
    }
}