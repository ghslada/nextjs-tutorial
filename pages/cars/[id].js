import { useRouter } from "next/router"

import Head from "next/head"

export default function CarItem ({ car }) {
    
    const router = useRouter()
    const { id } = router.query
    
    return (
    <div>
        {/* <Head>
            <title>{car.name}</title>
        </Head> */}
        <h1>{car.name}</h1>
        <img style={{'max-width': '500px'}} src={car.imageURL}/>
    </div>
    )
}

export async function getServerSideProps({params}) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();
    return {
      props : {
        car: data
      }
    }
}

// export async function getStaticProps({params}) {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     const data = await req.json();
//     return {
//       props : {
//         car: data
//       }
//     }
// }

// export async function getStaticPaths() {

//     const req = await fetch('http://localhost:3000/cars.json');
//     const data = await req.json();

//     const paths = data.map(car => {
//         return { params: { id: car } }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }