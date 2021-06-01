import {createClient} from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const getStaticPaths = async()=>{
  const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_KEY
  });

  const res = await client.getEntries({content_type:'receipe'});

  const paths = res && res.items.map(item=>{
    return {
      params:{slug:item.fields.slug}
    }
  });
  return {
      paths,
      fallback:false
  }
}

export async function getStaticProps({params}){
    const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_ACCESS_KEY
  });
  const {items} = await client.getEntries({content_type:'receipe',
    'fields.slug':params.slug
  });
  return {
    props:{
      recipe:items[0]
    }
  }
}

export default function RecipeDetails({recipe}) {
  console.log({recipe})
  const {featuredImage,title,cookingTime,ingredients,method}=recipe.fields

  return (
    <div>
      <Image src={`https:${featuredImage.fields.file.url}`} 
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />
      <h2>{title}</h2>
      <div>
        <p>Takes about {cookingTime} mins to cook</p>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map(ing=><li key={ing} >{ing}</li>)}
        </ul>
      </div>
    
   <div className="method">
     <h3>Method:</h3>
     <div>{documentToReactComponents(method)}</div>
   </div>
    </div>
  )
}