import {createClient} from 'contentful';
import ReceipeCard from '../components/ReceipeCard';

export async function getStaticProps(){
  const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_KEY
  });

  const res = await client.getEntries({content_type:'receipe'});
  return {
    props:{
      recipes:res.items
    }
  }
}

export default function Recipes({recipes}) {
  console.log({recipes});
  return (
    <div className="recipe-list">
      {recipes.map((receipe=>{
        return <ReceipeCard key={receipe.sys.id}  recipe={receipe}/>
      }))}

      <style jsx>{`
        .recipe-list{
          display:grid;
          grid-template-columns:1fr 1fr;
          grid-gap:20px 60px; 
        }
  `}</style>
    </div>
  )
}